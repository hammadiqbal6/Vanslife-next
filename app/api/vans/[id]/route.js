import Api from "@/utils";

export const GET = async (request, { params }) => {
  try {
    const response = await Api.get(`/vans/${params.id}`);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
