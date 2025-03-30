"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
    return (
        <div className="relative w-full flex flex-col items-center justify-center px-4 pb-[100px] pt-[200px]">
            {/* Layer Image - Positioned Below Content */}
            <div className="absolute inset-0 z-0">
                
            </div>

            {/* Blur Effect */}
            <div className="absolute top-0 left-0 w-full h-full z-10 flex justify-end items-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="w-[500px] h-[400px] rounded-full bg-[#2176FE14] blur-[150px]"
                ></motion.div>
            </div>

            <div className="relative flex flex-col items-center justify-center max-w-[1200px] mx-auto">
                {/* Content Section */}
                <div className="flex flex-col items-center justify-center gap-1 text-white relative">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl sm:text-[35px] md:text-[65px] font-semibold"
                    >
                        About
                    </motion.h1>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl sm:text-[35px] md:text-[65px] font-semibold"
                    >
                        <span className="bg-gradient-to-r from-[#21ABFD] to-[#0055DE] bg-clip-text text-transparent font-bold">
                            Chronedo.AI
                        </span>
                    </motion.h1>
                </div>

                <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-4 relative z-10"
                >
                    Upload a watch photo & get a stunning <br /> background in seconds!
                </motion.p>
            </div>
        </div>
    );
};

export default HeroSection;
