import Api from "@/utils";

export const GET = async (request, { params }) => {
  try {
    // console.log(request.headers.get("accessToken"), params);
    const token = request.headers.get("accessToken");
    const response = await Api.get(`/user/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
