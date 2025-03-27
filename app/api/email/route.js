import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Email from "@/models/emailStore";


export async function POST(request) {
    const { mail } = await request.json(); 

    try {
        // Connect to the database
        await connectDB();

        const emailRes = new Email({ email: mail });
        const res = await emailRes.save();

        return NextResponse.json(res); 
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}