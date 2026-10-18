import { errorResponse, getAccessToken, json } from "@/lib/api";
import { findUserByToken, getHostProfile } from "@/lib/store";

export const GET = async (request, { params }) => {
  try {
    const token = getAccessToken(request);
    const authUser = findUserByToken(token);
    if (!authUser) {
      return json({ error: "Unauthorized" }, 401);
    }

    if (String(authUser.id) !== String(params.id)) {
      return json({ error: "Forbidden" }, 403);
    }

    const profile = getHostProfile(params.id);
    if (!profile) {
      return json({ error: "User not found" }, 404);
    }

    return json(profile);
  } catch (error) {
    return errorResponse(error);
  }
};
