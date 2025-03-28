import connectDB from "@/lib/mongodb";
import Package from "@/models/package";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { userId, count } = await request.json();
    console.log(userId, count);

    // Validate the input
    if (!userId || count === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: userId or count" },
        { status: 400 }
      );
    }

    console.log(await Package.findOne({ UserId: userId }));

   

    

    // Find the user's package and update the count
    const latestPackage = await Package.findOne({ UserId: userId })
    .sort({ createdAt: -1 }); // Find the latest document

    if (!latestPackage) {
      return NextResponse.json(
        { error: "Package not found for the user" },
        { status: 404 }
      );
    }

    const updatedPackage = await Package.findByIdAndUpdate(
        latestPackage._id,
        { $inc: { images: count } },
        { new: true }
    );



    if (!updatedPackage) {
      return NextResponse.json(
        { error: "Package not found for the user" },
        { status: 404 }
      );
    }

    // Return the updated package
    return NextResponse.json(updatedPackage, { status: 200 });
  } catch (error) {
    console.error("Error updating package:", error);
    return NextResponse.json(
      { error: "Failed to update package" },
      { status: 500 }
    );
  }
}