import { errorResponse, getAccessToken, json } from "@/lib/api";
import { findUserByToken, getVanById } from "@/lib/store";

export const GET = async (request, { params }) => {
  try {
    const token = getAccessToken(request);
    const user = findUserByToken(token);
    if (!user) {
      return json({ error: "Unauthorized" }, 401);
    }

    const van = getVanById(params.id);
    if (!van) {
      return json({ error: "Van not found" }, 404);
    }

    if (String(van.userId) !== String(user.id)) {
      return json({ error: "Forbidden" }, 403);
    }

    return json(van);
  } catch (error) {
    return errorResponse(error);
  }
};
