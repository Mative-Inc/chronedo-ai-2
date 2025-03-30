import { NextResponse } from "next/server";
import Package from "@/models/package";
import connectDB from "@/lib/mongodb";

export async function GET(request, { params }) {
    try {
        // Connect to the database
        await connectDB();

        // Extract userId from the URL parameters
        const { userId } = await params;

        // Validate userId
        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Fetch packages for the user
        const latestPackage = await Package.findOne({ UserId: userId })
            .sort({ createdAt: -1 }) 
            .limit(1);

        // Return the packages
        return NextResponse.json(latestPackage, { status: 200 });
    } catch (error) {
        console.error("Error fetching packages:", error);
        return NextResponse.json(
            { error: "Failed to fetch packages" },
            { status: 500 }
        );
    }
}