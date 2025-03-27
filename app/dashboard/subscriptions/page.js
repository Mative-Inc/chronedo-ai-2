"use client";
import PricingCard from "@/components/PricingCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";

const pricingCards = [
    {
        id: "1",
        title: "Free",
        description: "For the casual user",
        price: "0",
        images: 5,
        features: [
            { id: 1, feature: "25 images" },
           
        ],
        type: "Monthly",
    },
    {
        id: "price_1R6Rv2PFeWozK4w0HhFXlo2c",
        title: "Basic",
        description: "For the power user",
        price: "19.99",
        images: 30,
        features: [
            { id: 1, feature: "30 images" },
            
        ],
        type: "Monthly",
    },
    {
        id: "price_1R6Rx0PFeWozK4w0ZjkrXlw3",
        title: "Premium",
        description: "For the power user",
        price: "39.99",
        images: 100,
        features: [
            { id: 1, feature: "100 images" },
            
        ],
        type: "Monthly",
    },
    
    {
        id: "price_1R77iEPFeWozK4w0AOJ6HKE3",
        title: "Enterprise",
        description: "For the power user",
        price: "139.99",
        images: 400,
        features: [
            { id: 1, feature: "400 images" },
            
        ],
        type: "Monthly",
    },
];

const Subscription = () => {
    const [activeTab, setActiveTab] = useState("Monthly");
    const [activeCard, setActiveCard] = useState(null);
    const [currentPackage, setCurrentPackage] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;
        console.log("user in subscription",user);

        const fetchCurrentPackage = async () => {
            try {
                const res = await axios.get(`/api/packages/${user.userId || user._id}`);
                if (!res.data) {
                    setCurrentPackage("Free"); // Default to Basic if no package is found
                    return;
                }

                setCurrentPackage(res.data.name); // Set the current package name
            } catch (error) {
                console.error("Error fetching current package:", error);
                setCurrentPackage("Basic"); // Fallback to Basic if there's an error
            }
        };

        fetchCurrentPackage();
    }, [user]);

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-[1200px] mx-auto py-[60px] px-4">
            

            {/* Pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {pricingCards
                    
                    .map((card) => (
                        <PricingCard
                            key={card.id}
                            card={card}
                            active={card.id === activeCard}
                            onClick={() => setActiveCard(card.id)}
                            currentPlan={card.title === currentPackage} // Set currentPlan dynamically
                        />
                    ))}
            </div>
        </div>
    );
};

export default Subscription;