import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="flex flex-col gap-6 h-full border border-[#0093E87D] backdrop-blur-[70px] rounded-[20px] p-6">
            {/* Rating Stars */}
            <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                    <StarIcon
                        key={index}
                        className={`w-5 h-5 ${
                            index < testimonial.rating 
                                ? "text-yellow-500" 
                                : "text-gray-400"
                        }`}
                    />
                ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-300 text-lg leading-relaxed flex-grow">
                "{testimonial.testimonial}"
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[#0093E87D]/30">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                        src={`/${testimonial.image}`}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h3 className="text-white font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.profession}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
