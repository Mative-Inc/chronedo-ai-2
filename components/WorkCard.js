import Link from "next/link";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const WorkCard = ({ card }) => {
    return <div className="flex flex-col gap-4 w-full border border-[#0093E87D] bg-[#217DFE08] backdrop-blur-[70px] rounded-[20px] p-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#21ACFD]">
            {card.icon}
        </div>
        <h1 className="text-white text-2xl font-medium">{card.title}</h1>
        {/* <p className="text-gray-400 text-lg">{card.description}</p>
        <Link href={card.link} className="flex items-center gap-2">Explore more <ArrowRightIcon className="w-4 h-4" /></Link> */}
    </div>;
};

export default WorkCard;
