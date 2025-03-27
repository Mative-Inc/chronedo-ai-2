// app/api/send-otp/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Otp from '@/models/Otp';
import connectDB from '@/lib/mongodb';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Basic email validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email' },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in database
    await connectDB();
    await Otp.create({
      email,
      otp
    });

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}\nThis code expires in 10 minutes.`,
      html: `
        <div>
          <h2>OTP Verification</h2>
          <p>Your verification code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `
    });

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully'
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}