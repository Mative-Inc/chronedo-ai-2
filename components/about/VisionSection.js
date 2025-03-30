import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const VisionSection = () => {
    return <div className="no-grid flex flex-col items-center justify-center max-w-[1200px] py-15 px-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-8 w-full justify-between bg-[#0B1018] border border-[#0093E87D] rounded-[20px] p-8">
            <div className="flex flex-col gap-6 md:w-1/2 justify-center">
                <h1 className="text-white text-5xl font-bold">Our Mission & Vision</h1>
                <p className="text-gray-400 text-lg">
                    Lorem Ipsum is simply dummy text of the printing.
                </p>

                <p className="text-gray-400 text-lg">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content.
                </p>

                <p className="text-gray-400 text-lg">
                 here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum.
                </p>
                
                <Link
                  href="/"
                  className="w-[180px] bg-gradient-to-r from-[#21ACFD] to-[#2174FE] px-6 py-3 flex items-center justify-center gap-2 rounded-full text-white font-medium text-center transition-all hover:opacity-90 mt-4"
                >
                  Get Started
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
            </div>

            <div className="flex items-center justify-center md:w-1/2">
                <img src="/visionWatch.png" alt="Vision" className="w-full h-full object-cover rounded-lg" />
            </div>
        </div>
    </div>;
};

export default VisionSection;
