"use client"
import React, { useState, useRef, useEffect } from "react";
import PricingCard from "./PricingCard";
import { motion, AnimatePresence } from "framer-motion";


const pricingCards = [
    {
        id: 1,
        title: "Basic",
        description: "For the large teams & corporations",
        price: "0",
        features: [
            {id: 1, feature: "1000 credits"},
            {id: 2, feature: "1000 credits"},
            {id: 3, feature: "1000 credits"},
            {id: 4, feature: "1000 credits"},
            {id: 5, feature: "1000 credits"},
        ],
        link: "/signin",
        type: "Monthly",
    },
    {
        id: 2,
        title: "Premium",
        description: "For the large teams & corporations",
        price: "10",
        features: [
            {id: 1, feature: "1000 credits"},
            {id: 2, feature: "1000 credits"},
            {id: 3, feature: "1000 credits"},
            {id: 4, feature: "1000 credits"},
            {id: 5, feature: "1000 credits"},
        ],
        link: "/signin",
        type: "Monthly",
    },
    {
        id: 3,
        title: "Enterprise",
        description: "For the large teams & corporations",
        price: "10",
        features: [
            {id: 1, feature: "1000 credits"},
            {id: 2, feature: "1000 credits"},
            {id: 3, feature: "1000 credits"},
            {id: 4, feature: "1000 credits"},
            {id: 5, feature: "1000 credits"},
        ],
        link: "/signin",
        type: "Monthly",
    },
    {
        id: 4,
        title: "Enterprise",
        description: "For the enterprise user",
        price: "60",
        features: [
            {id: 1, feature: "1000 credits"},
            {id: 2, feature: "1000 credits"},
            {id: 3, feature: "1000 credits"},
            {id: 4, feature: "1000 credits"},
            {id: 5, feature: "1000 credits"},
        ],
        link: "/signin",
        type: "Yearly",
    },
    {
        id: 5,
        title: "Enterprise",
        description: "For the enterprise user",
        price: "60",
        features: [
            {id: 1, feature: "1000 credits"},
            {id: 2, feature: "1000 credits"},
            {id: 3, feature: "1000 credits"},
            {id: 4, feature: "1000 credits"},
            {id: 5, feature: "1000 credits"},
        ],
        link: "/signin",
        type: "Yearly",
    },
    {
        id: 6,
        title: "Enterprise",
        description: "For the enterprise user",
        price: "60",
        features: [
            {id: 1, feature: "1000 credits"},
            {id: 2, feature: "1000 credits"},
            {id: 3, feature: "1000 credits"},
            {id: 4, feature: "1000 credits"},
            {id: 5, feature: "1000 credits"},
        ],
        link: "/signin",
        type: "Yearly",
    },
];

const PricingSection = () => {
    const [activeTab, setActiveTab] = useState("Monthly");
    const [activeCard, setActiveCard] = useState(2); // Pro plan has id: 2
    const [tabBounds, setTabBounds] = useState({ monthly: null, yearly: null });
    
    const monthlyRef = useRef(null);
    const yearlyRef = useRef(null);
    const containerRef = useRef(null);

    // Measure the tab positions on mount and resize
    useEffect(() => {
        const updateTabBounds = () => {
            if (monthlyRef.current && yearlyRef.current && containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const monthlyRect = monthlyRef.current.getBoundingClientRect();
                const yearlyRect = yearlyRef.current.getBoundingClientRect();
                
                setTabBounds({
                    monthly: {
                        x: monthlyRect.left - containerRect.left,
                        width: monthlyRect.width
                    },
                    yearly: {
                        x: yearlyRect.left - containerRect.left,
                        width: yearlyRect.width
                    }
                });
            }
        };

        updateTabBounds();
        window.addEventListener('resize', updateTabBounds);
        
        return () => window.removeEventListener('resize', updateTabBounds);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-4 w-full max-w-[1200px] mx-auto py-[60px] px-4"
        >
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-center gap-4"
            >
                <h1 className="text-white text-4xl font-semibold">Pricing</h1>
                <p className="text-gray-400 text-lg w-1/2 text-center">
                    Check out some of the amazing photos we've created for our users.
                </p>
            </motion.div>

            <motion.div 
                ref={containerRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative flex items-center gap-4 border border-[#0093E87D] bg-[#217DFE08] backdrop-blur-[70px] p-2 rounded-full w-fit mx-auto px-2 overflow-hidden"
            >
                {/* Animated sliding background */}
                {tabBounds.monthly && tabBounds.yearly && (
                    <motion.div
                        className="absolute h-[85%] rounded-full bg-[#217DFE21] border border-[#217DFE]"
                        initial={false}
                        animate={{
                            x: activeTab === "Monthly" ? tabBounds.monthly.x + 2 : tabBounds.yearly.x + 2,
                            width: activeTab === "Monthly" ? tabBounds.monthly.width - 4 : tabBounds.yearly.width - 4
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                    />
                )}

                <motion.p 
                    ref={monthlyRef}
                    className={`text-lg font-normal px-10 py-1 cursor-pointer rounded-full transition-colors relative z-10 ${
                        activeTab === "Monthly" ? "text-white" : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("Monthly")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Monthly
                </motion.p>
                
                <motion.p 
                    ref={yearlyRef}
                    className={`text-lg font-normal px-12 py-1 cursor-pointer rounded-full transition-colors relative z-10 ${
                        activeTab === "Yearly" ? "text-white" : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("Yearly")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Yearly
                </motion.p>
            </motion.div>

            {/* pricing cards */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-7"
                >
                    {pricingCards
                        .filter((card) => card.type === activeTab)
                        .map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: 0.1 * index,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                <PricingCard 
                                    card={card} 
                                    active={card.id === activeCard}
                                    onClick={() => setActiveCard(card.id)}
                                />
                            </motion.div>
                        ))
                    }
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default PricingSection;
