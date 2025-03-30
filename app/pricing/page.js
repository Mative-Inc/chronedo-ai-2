import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/pricing/HeroSection";
import PricingSection from "@/components/PricingSection";
import React from "react";
import MainLayout from "@/layouts/mainLayout";


const Pricing = () => {
    return (
        <MainLayout>
        <div className="flex flex-col w-full items-center justify-center px-4">
            <HeroSection />
            <PricingSection />
            <FAQSection />
        </div>
        </MainLayout>
    );
};

export default Pricing;