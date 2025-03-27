"use client";

import React, { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const testimonials = [
    {
        id: 1,
        name: "John Doe",
        image: "watch.png",
        profession: "CEO, Google",
        testimonial: "Rainbow-Themes has become such an integral part of our work! By putting our trust in them, we have been able to create a more efficient and streamlined workflow.",
        rating: 5,
    },
    {
        id: 2,
        name: "Jane Doe",
        image: "watch.png",
        profession: "CEO, Google",
        testimonial: "Rainbow-Themes has become such an integral part of our work! By putting our trust in them, we have been able to create a more efficient and streamlined workflow.",
        rating: 4,
    },
    {
        id: 3,
        name: "John Doe",
        image: "watch.png",
        profession: "CEO, Google",
        testimonial: "Rainbow-Themes has become such an integral part of our work! By putting our trust in them, we have been able to create a more efficient and streamlined workflow.",
        rating: 5,
    },
    {
        id: 4,
        name: "John Doe",
        image: "watch.png",
        profession: "CEO, Google",
        testimonial: "Rainbow-Themes has become such an integral part of our work! By putting our trust in them, we have been able to create a more efficient and streamlined workflow.",
        rating: 5,
    },
    {
        id: 5,
        name: "John Doe",
        image: "watch.png",
        profession: "CEO, Google",
        testimonial: "Rainbow-Themes has become such an integral part of our work! By putting our trust in them, we have been able to create a more efficient and streamlined workflow.",
        rating: 5,
    },
];

const TestimonialSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(2);

    // Update cards to show based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setCardsToShow(1);
            } else if (window.innerWidth < 1024) {
                setCardsToShow(2);
            } else {
                setCardsToShow(4);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            return newIndex < 0 ? testimonials.length - cardsToShow : newIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            return newIndex > testimonials.length - cardsToShow ? 0 : newIndex;
        });
    };

    return <div className="flex flex-col gap-4 w-full max-w-[1200px] mx-auto py-[60px] px-4">
    
    <div className="flex flex-col border border-[#0093E87D] bg-[#217DFE08] backdrop-blur-[70px] rounded-[20px] gap-4 w-full py-[60px] px-2">

    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
            <div className="flex flex-col w-full gap-4">
                <h1 className="text-white text-4xl font-normal">Testimonials</h1>
                <p className="text-gray-400 text-lg">What our customers say</p>
            </div>
            <div className="flex items-center gap-4">
                <button 
                    onClick={handlePrevious}
                    className="p-2 rounded-full border border-[#0093E87D] hover:bg-[#0093E87D]/10 transition-all"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-white" />
                </button>
                <button 
                    onClick={handleNext}
                    className="p-2 rounded-full border border-[#0093E87D] hover:bg-[#0093E87D]/10 transition-all"
                    aria-label="Next testimonial"
                >
                    <ChevronRightIcon className="w-6 h-6 text-white" />
                </button>
            </div>  
        </div>

        <div className="relative w-full overflow-hidden">
            <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ 
                    transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
                    gap: '1rem'
                }}
            >
                {testimonials.map((testimonial) => (
                    <div 
                        key={testimonial.id} 
                        style={{ width: `${100 / cardsToShow}%` }}
                        className="flex-shrink-0 px-2"
                    >
                        <TestimonialCard testimonial={testimonial} />
                    </div>
                ))}
            </div>
        </div>

    </div>

        
    </div>;
};

export default TestimonialSection;
