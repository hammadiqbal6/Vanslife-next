export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function errorResponse(error, fallbackStatus = 500) {
  const status = error?.status || fallbackStatus;
  const message =
    typeof error === "string"
      ? error
      : error?.message || "Something went wrong";
  return json({ error: message }, status);
}

export function getAccessToken(request) {
  return (
    request.headers.get("accessToken") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    null
  );
}
