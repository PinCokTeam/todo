import axios from "axios";

export async function GET(request: Request) {
  try {
    const response = await axios.get("http://core:8000/todo");
    // Handle the response data here
    return Response.json(response.data);
  } catch (error) {
    // Handle any errors here
    console.error(error);
  }
}

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const response = await axios.post("http://core:8000/todo", requestBody);
    return Response.json({ message: "success" });
  } catch (error) {
    console.error(error);
  }
}
