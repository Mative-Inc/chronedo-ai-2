import HeroSection from "@/components/about/HeroSection";
import VisionSection from "@/components/about/VisionSection";
import FAQSection from "@/components/FAQSection";
import MainLayout from "@/layouts/mainLayout";
import React from "react";

const About = () => {
    return (
        <MainLayout>
        <div className="flex flex-col w-full items-center justify-center px-4">
            <HeroSection />
            <VisionSection />
            <FAQSection />
        </div>
        </MainLayout>
    );
};

export default About;