import { errorResponse, json } from "@/lib/api";
import { createVan, findUserByToken, listVans } from "@/lib/store";
import { getAccessToken } from "@/lib/api";

export const GET = async () => {
  try {
    return json(listVans());
  } catch (error) {
    return errorResponse(error);
  }
};

export const POST = async (request) => {
  try {
    const token = getAccessToken(request);
    const user = findUserByToken(token);
    if (!user) {
      return json({ error: "Unauthorized" }, 401);
    }

    const body = await request.json();
    const { name, price, description, type, image } = body;

    if (!name || !price || !description || !type) {
      return json(
        { error: "name, price, description, and type are required" },
        400
      );
    }

    const van = createVan({
      name,
      price,
      description,
      type,
      image,
      userId: user.id,
    });

    return json({ status: "Success", van }, 201);
  } catch (error) {
    return errorResponse(error);
  }
};
