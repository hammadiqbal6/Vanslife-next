import { errorResponse, json } from "@/lib/api";
import { registerUser } from "@/lib/store";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return json(
        { error: "firstName, lastName, email, and password are required" },
        400
      );
    }

    if (String(password).length < 5) {
      return json({ error: "Password must be at least 5 characters" }, 400);
    }

    const result = registerUser({ firstName, lastName, email, password });
    return json(result, 201);
  } catch (error) {
    return errorResponse(error, error.status || 500);
  }
};
