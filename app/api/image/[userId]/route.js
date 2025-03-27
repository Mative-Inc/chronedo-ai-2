import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Image from "@/models/Images";


// GET: Fetch images for a specific user
export async function GET(request, { params }) {
    const { userId } = await params; // Extract userId from the dynamic route

    try {
        await connectDB();

        const userImages = await Image.findOne({ userId: userId });

        if (!userImages) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        userImages.images.reverse();

        return NextResponse.json(userImages); 
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
