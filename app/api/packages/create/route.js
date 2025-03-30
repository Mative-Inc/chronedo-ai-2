import connectDB from "@/lib/mongodb";
import Package from "@/models/package";
import { NextResponse } from "next/server";
import User from './../../../../models/User';

export async function POST(request) {
    try {
        await connectDB();

        const { UserId, name, price, images } = await request.json();
        console.log(UserId, name, price);

        
        if (!UserId || !name || !price, !images) {
            return NextResponse.json(
                { error: "Missing required fields: userId, name, or price" },
                { status: 400 }
            );
        }

        const pack=await Package.findOne({ UserId: UserId }).sort({ createdAt: -1 }).limit(1);
        console.log("old", pack);
        console.log("new", images);

        if (pack) {
            pack.name = name;
            pack.images += images;
            await pack.save();
            return NextResponse.json(pack, { status: 201 });
        }

        
        const newPackage = new Package({
            UserId: UserId,
            name,
            images,
            price,
        });

        await newPackage.save();

        // Return the created package
        return NextResponse.json(newPackage, { status: 201 });
    } catch (error) {
        console.error("Error creating package:", error);
        return NextResponse.json(
            { error: "Failed to create package" },
            { status: 500 }
        );
    }
}