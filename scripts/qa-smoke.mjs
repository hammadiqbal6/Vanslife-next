import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const root = process.cwd();

function ensureDir(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

const dirs = [
  process.env.SCREENSHOT_DIR,
  path.join(root, "docs", "screenshots"),
  "/opt/cursor/artifacts/screenshots",
]
  .filter(Boolean)
  .filter((dir, index, all) => all.indexOf(dir) === index)
  .filter((dir) => ensureDir(dir));

if (!dirs.length) {
  const fallback = path.join(root, "test-results", "screenshots");
  ensureDir(fallback);
  dirs.push(fallback);
}

async function shot(page, name) {
  for (const d of dirs) {
    await page.screenshot({
      path: path.join(d, name),
      fullPage: false,
    });
  }
}

const results = [];
function log(step, ok, detail = "") {
  results.push({ step, ok, detail });
  console.log(
    `${ok ? "PASS" : "FAIL"}: ${step}${detail ? " — " + detail : ""}`
  );
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
});
const page = await context.newPage();

async function loginAsDemoHost() {
  const csrfResponse = await context.request.get(`${BASE}/api/auth/csrf`);
  const { csrfToken } = await csrfResponse.json();
  await context.request.post(`${BASE}/api/auth/callback/credentials`, {
    form: {
      csrfToken,
      email: "bob@example.com",
      password: "password123",
      redirect: "false",
      json: "true",
    },
  });
  const sessionResponse = await context.request.get(`${BASE}/api/auth/session`);
  const session = await sessionResponse.json();
  return Boolean(session?.user);
}

try {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const brand = await page.getByText("#VanLife").first().isVisible();
  log("home brand", brand);
  await shot(page, "home.png");

  await page.goto(BASE + "/vans", { waitUntil: "networkidle" });
  const vanLinks = await page.locator('a[href^="/vans/"]').count();
  log("vans list", vanLinks >= 6, `count=${vanLinks}`);
  await page.getByRole("button", { name: "simple" }).click();
  await page.waitForTimeout(400);
  const filtered = await page.locator('a[href^="/vans/"]').count();
  log(
    "filter simple",
    filtered > 0 && filtered < vanLinks,
    `count=${filtered}`
  );
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.waitForTimeout(400);
  await shot(page, "vans.png");

  await page.goto(BASE + "/vans/1", { waitUntil: "networkidle" });
  log(
    "van detail",
    await page.getByRole("heading", { name: "Modest Explorer" }).isVisible()
  );

  await page.goto(BASE + "/about", { waitUntil: "networkidle" });
  log("about", await page.getByText("Don't squeeze").isVisible());

  await page.goto(BASE + "/host", { waitUntil: "networkidle" });
  log("host redirect when logged out", page.url().includes("/login"));

  const loggedIn = await loginAsDemoHost();
  log("login session", loggedIn);
  await page.goto(BASE + "/host", { waitUntil: "networkidle" });
  log("login to host", page.url().includes("/host"));
  await page.waitForTimeout(800);
  const hostVans = await page.locator('a[href^="/host/van/"]').count();
  log("host vans visible", hostVans >= 3, `count=${hostVans}`);
  await shot(page, "host.png");

  await page.getByRole("button", { name: "Add a van" }).click();
  await page.fill("#name", "Trail Blazer");
  await page.fill("#price", "75");
  await page.selectOption("#type", "simple");
  await page.fill(
    "#description",
    "A sturdy trail van ready for weekend escapes and mountain roads."
  );
  await page.getByRole("button", { name: "Create van" }).click();
  await page.waitForTimeout(1000);
  const afterCreate = await page.getByText("Trail Blazer").count();
  log("create van", afterCreate > 0);

  await page
    .getByRole("link", { name: /Trail Blazer/ })
    .first()
    .click();
  await page.waitForURL(/\/host\/van\//);
  await page.getByRole("button", { name: "Edit van" }).click();
  await page.fill("#name", "Trail Blazer Plus");
  await page.getByRole("button", { name: "Save changes" }).click();
  await page.waitForTimeout(800);
  log(
    "edit van",
    await page.getByRole("heading", { name: "Trail Blazer Plus" }).isVisible()
  );

  await page.getByRole("button", { name: "Logout" }).click();
  await page.waitForTimeout(800);
  await page.goto(BASE + "/host", { waitUntil: "networkidle" });
  log("logout protects host", page.url().includes("/login"));

  const mobile = await context.newPage({
    viewport: { width: 390, height: 844 },
  });
  await mobile.goto(BASE + "/", { waitUntil: "networkidle" });
  await shot(mobile, "home-mobile.png");
  log("mobile home screenshot", true);
  await mobile.close();
} catch (err) {
  console.error("QA crashed:", err);
  results.push({ step: "crash", ok: false, detail: String(err) });
  await shot(page, "qa-failure.png").catch(() => {});
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log(JSON.stringify({ failed: failed.length, results }, null, 2));
process.exit(failed.length ? 1 : 0);
