import Api from "@/utils";

export const GET = async (request, { params }) => {
  try {
    const token = request.headers.get("accessToken");
    const response = await Api.get(`/user/van/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
