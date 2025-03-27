import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const { orderId } = await request.json();

    // Poll the LightX API for the result
    const response = await axios.post(
      "https://api.lightxeditor.com/external/api/v1/order-status",
      { orderId },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_LIGHTX_API_KEY,
        },
      }
    );

    const data = response.data;
    console.log("Polling response:", data);

    if (data.statusCode === 2000) {
      return NextResponse.json(data.body, { status: 200 });
    } else {
      throw new Error("Failed to fetch result.");
    }
  } catch (error) {
    console.error("Error polling for result:", error);
    return NextResponse.json(
      { message: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}