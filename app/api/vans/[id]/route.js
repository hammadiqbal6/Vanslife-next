import { errorResponse, getAccessToken, json } from "@/lib/api";
import { deleteVan, findUserByToken, getVanById, updateVan } from "@/lib/store";

export const GET = async (_request, { params }) => {
  try {
    const van = getVanById(params.id);
    if (!van) {
      return json({ error: "Van not found" }, 404);
    }
    return json(van);
  } catch (error) {
    return errorResponse(error);
  }
};

export const PUT = async (request, { params }) => {
  try {
    const token = getAccessToken(request);
    const user = findUserByToken(token);
    if (!user) {
      return json({ error: "Unauthorized" }, 401);
    }

    const body = await request.json();
    const van = updateVan(params.id, body, user.id);
    if (!van) {
      return json({ error: "Van not found" }, 404);
    }
    return json({ status: "Success", van });
  } catch (error) {
    return errorResponse(error, error.status || 500);
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const token = getAccessToken(request);
    const user = findUserByToken(token);
    if (!user) {
      return json({ error: "Unauthorized" }, 401);
    }

    const deleted = deleteVan(params.id, user.id);
    if (!deleted) {
      return json({ error: "Van not found" }, 404);
    }
    return json({ status: "Success" });
  } catch (error) {
    return errorResponse(error, error.status || 500);
  }
};
