import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { seedUsers, seedVans } from "./seed";

/**
 * In-memory store for the demo. Resets on server restart.
 * Good enough for local/portfolio demos without an external DB.
 */

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const hash = createHash("sha256").update(`${salt}:${password}`).digest("hex");
  return { salt, hash };
}

function verifyPassword(password, salt, hash) {
  const { hash: next } = hashPassword(password, salt);
  try {
    return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(next, "hex"));
  } catch {
    return false;
  }
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    name: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
  };
}

function createInitialState() {
  const users = seedUsers.map((user) => {
    const { salt, hash } = hashPassword(user.password);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.toLowerCase(),
      passwordSalt: salt,
      passwordHash: hash,
      tokens: new Set(),
    };
  });

  const vans = seedVans.map((van) => ({ ...van }));

  return {
    users,
    vans,
    nextUserId: Math.max(...users.map((u) => u.id)) + 1,
    nextVanId: Math.max(...vans.map((v) => v.id)) + 1,
  };
}

const globalKey = "__vanlife_store__";

function getState() {
  if (!global[globalKey]) {
    global[globalKey] = createInitialState();
  }
  return global[globalKey];
}

export function listVans() {
  return getState().vans.map((van) => ({ ...van }));
}

export function getVanById(id) {
  const van = getState().vans.find((item) => String(item.id) === String(id));
  return van ? { ...van } : null;
}

export function getVansByUserId(userId) {
  return getState()
    .vans.filter((van) => String(van.userId) === String(userId))
    .map((van) => ({ ...van }));
}

export function createVan(data) {
  const state = getState();
  const van = {
    id: state.nextVanId++,
    name: data.name,
    price: Number(data.price),
    description: data.description,
    image: data.image || "/images/vans/modest-explorer.png",
    type: data.type,
    userId: Number(data.userId),
  };
  state.vans.push(van);
  return { ...van };
}

export function updateVan(id, data, userId) {
  const state = getState();
  const index = state.vans.findIndex((van) => String(van.id) === String(id));
  if (index === -1) return null;
  if (String(state.vans[index].userId) !== String(userId)) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  state.vans[index] = {
    ...state.vans[index],
    name: data.name ?? state.vans[index].name,
    price:
      data.price !== undefined ? Number(data.price) : state.vans[index].price,
    description: data.description ?? state.vans[index].description,
    image: data.image ?? state.vans[index].image,
    type: data.type ?? state.vans[index].type,
  };
  return { ...state.vans[index] };
}

export function deleteVan(id, userId) {
  const state = getState();
  const index = state.vans.findIndex((van) => String(van.id) === String(id));
  if (index === -1) return false;
  if (String(state.vans[index].userId) !== String(userId)) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  state.vans.splice(index, 1);
  return true;
}

export function findUserByEmail(email) {
  return (
    getState().users.find(
      (user) => user.email === String(email).toLowerCase()
    ) || null
  );
}

export function findUserById(id) {
  return (
    getState().users.find((user) => String(user.id) === String(id)) || null
  );
}

export function findUserByToken(token) {
  if (!token) return null;
  return getState().users.find((user) => user.tokens.has(token)) || null;
}

export function authenticate(email, password) {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (!verifyPassword(password, user.passwordSalt, user.passwordHash)) {
    return null;
  }
  const token = randomBytes(24).toString("hex");
  user.tokens.add(token);
  return { user: publicUser(user), token };
}

export function registerUser({ firstName, lastName, email, password }) {
  const normalized = String(email).toLowerCase().trim();
  if (findUserByEmail(normalized)) {
    const err = new Error("Email already exists");
    err.status = 400;
    throw err;
  }
  const { salt, hash } = hashPassword(password);
  const state = getState();
  const user = {
    id: state.nextUserId++,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: normalized,
    passwordSalt: salt,
    passwordHash: hash,
    tokens: new Set(),
  };
  state.users.push(user);
  const token = randomBytes(24).toString("hex");
  user.tokens.add(token);
  return { user: publicUser(user), token };
}

export function logoutToken(token) {
  const user = findUserByToken(token);
  if (user) user.tokens.delete(token);
  return Boolean(user);
}

export function getHostProfile(userId) {
  const user = findUserById(userId);
  if (!user) return null;
  return {
    ...publicUser(user),
    vans: getVansByUserId(userId),
  };
}
