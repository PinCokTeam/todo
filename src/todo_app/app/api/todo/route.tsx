import axios from "axios";

export async function GET(request: Request) {
  try {
    const response = await axios.get("http://core:8000/todo");
    // Handle the response data here
    console.log(response.data);
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
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  return Response.json({ message: "success" });
}
