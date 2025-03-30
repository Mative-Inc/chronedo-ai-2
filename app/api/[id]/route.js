// api/auth/[id]/route.js
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";


connectDB();

// GET request handler
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return the user
    return NextResponse.json(
      { user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 }
    );
  }
}