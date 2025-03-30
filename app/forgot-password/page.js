"use client";
import {
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import MainLayout from "@/layouts/mainLayout";
import Notification from "@/components/Notification";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("OTP sent to your email!");
        
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("OTP sending error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <MainLayout>
      <div className="flex w-full flex-col items-center justify-center px-4 pb-10 pt-[150px]">
        <div className="flex flex-col items-center gap-4 border-2 border-[#0093E8] bg-[#0D0B13] rounded-3xl p-10 max-w-[600px] md:w-[700px] mx-auto">
          <Image src="/Chronedo_AI.png" alt="logo" width={100} height={100} />

          {success && (
            <Notification
              isOpen={true}
              onClose={() => setSuccess(false)}
              title="Success"
              message={success}
              type="success"
              link={`/verify-otp?email=${email}`}
            />
          )}

          {error && (
            <Notification
              isOpen={true} 
              onClose={() => setError(false)} 
              title="Error" 
              message={error} 
              type="error" 
            />
          )}

          <div className="flex flex-col items-center justify-center gap-6 w-full mx-auto">
            {/* Email Input */}
            <div className="w-full flex items-center gap-3 border-2 border-gray-700 rounded-xl p-3 bg-transparent">
              <EnvelopeIcon className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onKeyDown={handleKeyDown}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#21ABFD] to-[#0055DE] text-white font-semibold cursor-pointer hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>

          <div className="flex items-center justify-center w-full">
            <p className="text-white text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#0093E8] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;