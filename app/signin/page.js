"use client";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MainLayout from "@/layouts/mainLayout";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { signIn, useSession } from "next-auth/react";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";
import Image from "next/image";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, login } = useUser();
  const { data: session } = useSession();
  const [success, setSuccess] = useState("");


  const handleGoogleLogin = () => {
    toast.info('Logging in with Google...', { duration: 2000 });
    setLoading(true);
    signIn("google", { callbackUrl: "/" }); // Redirect to /dashboard
  };

  const handleAppleLogin = () => {
    toast.info('Logging in with Apple...', { duration: 2000 });
    setLoading(true);
    signIn("apple", { callbackUrl: "/" }); // Redirect to /dashboard
  };

  // useEffect(() => {
  //   if (session) {
  //     console.log("Session data:", session);
  //     // Store the token in localStorage
  //     localStorage.setItem("token", session.customToken);
  //   }
  // }, [session]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("loading", loading);

      const res = await axios.post("/api/auth/login", formData);
      console.log(res.data);

      if (res.data.success) {
        const { token } = res.data;
        setSuccess("Login successful!");
        login(token);
        setFormData({ email: "", password: "" });
        localStorage.setItem("type", "user");
        setError("");
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);

      if (error.response) {
        
        if (error.response.status === 404) {
          setError("User not found. Please check your email.");
        } else if (error.response.status === 401) {
          setError("Invalid password. Please try again.");
        } else {
          setError(
            error.response.data.message || "An unexpected error occurred"
          );
        }
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred");
      }
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
          <Image src="/Chronedo_AI.png" alt="logo" width={230} height={100} />

          {success && (
            <Notification
              isOpen={true}
              onClose={() => setSuccess("")}
              title="Success"
              message={success}
              link="/dashboard"
              type="success"
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

          {error && (
            <div className="w-full p-3 bg-red-500 text-white text-center rounded-lg">
              {error}
            </div>
          )}

<div
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex items-center text-normal cursor-pointer hover:bg-gray-700 transition-all border-2 border-gray-700 rounded-xl p-2 gap-2 disabled:cursor-not-allowed disabled:bg-gray-700"
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="w-5 h-5 text-gray-500"
              />
              <p className="text-white">Continue with Google</p>
            </div>

          {/* Or continue with */}
          <div className="flex items-center w-full gap-2">
            <div className="flex-1 h-[1px] bg-gray-700"></div>
            <p className="text-gray-500 text-sm whitespace-nowrap">
              Or continue with
            </p>
            <div className="flex-1 h-[1px] bg-gray-700"></div>
          </div>

          {/* Email and Password */}
          <div className="flex flex-col items-center justify-center gap-6 w-full  mx-auto">
            {/* Email Input */}
            <div className="w-full flex items-center gap-3 border-2 border-gray-700 rounded-xl p-3 bg-transparent">
              <EnvelopeIcon className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="w-full flex items-center gap-3 border-2 border-gray-700 rounded-xl p-3 bg-transparent">
              <LockClosedIcon className="w-5 h-5 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />

              {/* <EyeIcon className="w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> */}
              {!showPassword ? (
                <EyeSlashIcon
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeIcon
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            <div className="flex items-center justify-end w-full">
              <Link
                href="/forgot-password"
                className="text-[#0093E8] hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#21ABFD] to-[#0055DE] text-white font-semibold cursor-pointer hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Sign In"}
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

export default SignIn;
