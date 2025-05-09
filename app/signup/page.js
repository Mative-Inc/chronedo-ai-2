"use client";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MainLayout from "@/layouts/mainLayout";
import axios from "axios";
import { signIn } from "next-auth/react";
import Notification from "@/components/Notification";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import OTPVerification from "@/components/otp/VerifyOtp";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const { login } = useUser();
  const [showVerificationModal, setVerificationModal] = useState(false);

  const handleSignupWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  // Fire Google Analytics event
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "visited_register_page", {
        event_category: "User",
        event_label: "Visited Register Page",
        value: 1,
      });
    }
  }, []);

  

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    // Add more password validation rules if needed
    if (!/[A-Z]/.test(formData.password)) {
      setError("Password must contain at least one uppercase letter.");
      return false;
    }

    if (!/[0-9]/.test(formData.password)) {
      setError("Password must contain at least one number.");
      return false;
    }

    return true;
  };

  // const handleSignUp = async () => {
  //   if (!validateForm()) return;
  //   setError(null);
  //   setSuccess("");

  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const res = await axios.post("/api/auth/register", JSON.stringify(formData), {
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     if (res.status === 201) {
  //       const loginRes = await axios.post("/api/auth/login", JSON.stringify({
  //         email: formData.email,
  //         password: formData.password,
  //       }));

  //       if (loginRes.status === 200) {
  //         const { token } = loginRes.data;
  //         login(token);
  //       }

  //       setSuccess("Account created successfully! Redirecting...");
        
  //     }
  //   } catch (error) {
  //     console.error("Error signing up:", error);
  //     setError(error.response?.data?.message || "An error occurred. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setError(null);
    setSuccess("");

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/send-otp", {
        email: formData.email
      });
      setVerificationModal(true);

      if (response.status === 200) {
        setSuccess("OTP sent to your email!");
        setVerificationModal(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center px-4 pb-10 pt-[150px]">
        <div className="flex flex-col items-center gap-4 border-2 border-[#0093E8] bg-[#0D0B13] rounded-3xl p-10  max-w-[600px] md:w-[700px] mx-auto">
          <Image src="/Chronedo_AI.png" alt="logo" width={230} height={100} />

          {
            showVerificationModal && (
              <OTPVerification formData={formData} />
            )
          }

          

          {/* Error Notification */}
          {error && (
            <Notification
              isOpen={true}
              onClose={() => setError(null)}
              title="Error"
              message={error}
              type="error"
            />
          )}

          {/* Social Login Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <div
              onClick={handleSignupWithGoogle}
              className="flex items-center text-normal cursor-pointer hover:bg-gray-700 transition-all border-2 border-gray-700 rounded-xl p-2 gap-2"
            >
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-gray-500" />
              <p className="text-white">Continue with Google</p>
            </div>

            {/* <div
              onClick={handleAppleLogin}
              className="flex items-center text-normal cursor-pointer hover:bg-gray-700 transition-all border-2 border-gray-700 rounded-xl p-2 gap-2"
            >
              <FontAwesomeIcon icon={faApple} className="w-5 h-5 text-gray-500" />
              <p className="text-white">Continue with Apple</p>
            </div> */}
          </div>

          {/* Divider */}
          <div className="flex items-center w-full gap-2">
            <div className="flex-1 h-[1px] bg-gray-700"></div>
            <p className="text-gray-500 text-sm whitespace-nowrap">Or continue with</p>
            <div className="flex-1 h-[1px] bg-gray-700"></div>
          </div>

          {/* Sign Up Form */}
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            {/* Name Input */}
            <div className="w-full flex items-center gap-3 border-2 border-gray-700 rounded-xl p-3 bg-transparent">
              <UserIcon className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />
            </div>

            {/* Email Input */}
            <div className="w-full flex items-center gap-3 border-2 border-gray-700 rounded-xl p-3 bg-transparent">
              <EnvelopeIcon className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onKeyDown={handleKeyDown}
                disabled={loading}
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
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />
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

            {/* Confirm Password Input */}
            <div className="w-full flex items-center gap-3 border-2 border-gray-700 rounded-xl p-3 bg-transparent">
              <LockClosedIcon className="w-5 h-5 text-gray-500" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />
              {!showConfirmPassword ? (
                <EyeSlashIcon
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <EyeIcon
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#21ABFD] to-[#0055DE] text-white font-semibold cursor-pointer hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-white text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#0093E8] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignUp;