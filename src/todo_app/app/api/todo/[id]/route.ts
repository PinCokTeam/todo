import axios from "axios";

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const response = await axios.delete(`http://core:8000/todo/${id}`);
    return Response.json({ message: "success" });
  } catch (error) {}
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const requestBody = await request.json();
    const response = await axios.patch(
      `http://core:8000/todo/${id}`,
      requestBody
    );
    return Response.json(response.data);
  } catch (error) {}
}
