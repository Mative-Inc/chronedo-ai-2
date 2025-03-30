"use client";
import BadgeSection from "@/components/BadgeSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Gallery from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import TestimonialSection from "@/components/TestimonialSection";
import WorkSection from "@/components/WorkSection";
import MainLayout from "@/layouts/mainLayout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log("Session data:", session);
      // Store the token in localStorage
      localStorage.setItem("token", session.customToken);
    }
  }, [session]);


  return (
    <MainLayout>
      <div className="w-full flex flex-col items-center justify-center overflow-x-hidden">
        {/* <Navbar /> */}
        <HeroSection />
        <Gallery />
        <WorkSection />
        {/* <BadgeSection /> */}
        {/* <Footer /> */}
      </div>
    </MainLayout>
  );
}
