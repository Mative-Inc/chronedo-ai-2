import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import Image from "@/models/Images";


export async function POST(request) {
    const { userId, imageUrl } = await request.json(); // Parse the request body

    try {
        // Connect to the database
        await connectDB();

        // Find the user's image document
        const res = await Image.findOne({ userId: userId });

        if (!res) {
            // If no document exists, create a new one
            const newImage = new Image({
                userId: userId,
                images: [imageUrl],
            });
            await newImage.save();
            return NextResponse.json(newImage);
        }

        // If the document exists, push the new image URL
        res.images.push(imageUrl);
        await res.save();

        return NextResponse.json(res); // Return the updated document
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}