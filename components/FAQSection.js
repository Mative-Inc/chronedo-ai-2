"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";



const faqData = [
    {
        id: 1,
        question: " What is Chronedo.A!?",
        answer: "Chronedo.ai is an AI-powered tool that enhances your watch photos by automatically removing and replacing the background with a high-quality, professional backdrop.",
    },
    {
        id: 2,
        question: "What image formats are supported?",
        answer: "Chronedo.ai supports JPG, JPEG, and PNG formats for image uploads.",
    },
    {
        id: 3,
        question: "Do I need to create an account?",
        answer: "Yes, creating an account allows you to save your projects and access premium features.",
    },
    {
        id: 4,
        question: "Can I customize the background?",
        answer: "Absolutely! You can choose from a variety of backgrounds or upload your own.",
    },
    {
        id: 5,
        question: "What if I encounter issues?",
        answer: "Our support team is available 24/7 to assist you with any issues you may face.",
    },
];


const FAQSection = () => {
    const [active, setActive] = useState(null);

    const handleClick = (id) => {
        setActive(active === id ? null : id);
    };

    return <div className="flex flex-col w-full max-w-[1200px] mx-auto items-center gap-10 py-[50px]">
        <div className="flex flex-col items-center gap-2">
            <h1 className="text-white text-4xl font-normal">FAQ's</h1>
            <p className="text-gray-400 text-sm">People often ask these questions</p>
        </div>


        <div className="flex flex-col gap-4 px-4 w-full">
            {faqData.map((faq) => (
                <div key={faq.id} className={`flex items-center gap-4 border border-[#0093E87D] bg-[#217DFE08] backdrop-blur-[70px] rounded-[20px] p-4 ${active === faq.id ? "border-[#21ADFD] bg-[#217DFE21]" : ""}`}>
                    <div onClick={() => handleClick(faq.id)} className={`flex items-center gap-2 w-10 h-10 bg-gray-800 rounded-lg justify-center items-center cursor-pointer self-start ${active === faq.id ? "bg-white text-black" : ""}`}  >                        {active === faq.id ? <PlusIcon style={{ color: "#5124C5" }} className={`w-4 h-4 text-gray-400`} /> : < MinusIcon className={`w-4 h-4 text-gray-400`} />}

                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-white text-lg font-bold">{faq.question}</h2>
                        <p className={`text-white text-md w-1/2 ${active === faq.id ? "block transition-all duration-300" : "hidden"}`}>{faq.answer}</p>
                    </div>


                </div>
            ))}
        </div>
    </div>;
};

export default FAQSection;
