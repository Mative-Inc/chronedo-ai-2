import Link from "next/link";
import React from "react";

const BadgeSection = () => {
  return (
    <div className="flex flex-col w-full px-4 max-w-[1200px] mx-auto py-5">
      <div className="flex flex-col w-full px-10 bg-gradient-to-r from-[#21ACFD] to-[#2174FE] p-[50px] rounded-[20px] p-4">
        <div className="flex flex-col gap-4">
          <p className="text-white text-2xl font-bold">
            Ready to Transform Your Watch Photos?
          </p>
          <p className="text-white text-sm">
            Transform Your Watch Photos with AI & Get <br /> Stunning Backgrounds
            Instantly!
          </p>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Link
            href="/"
            className="bg-white text-black px-4 py-2 rounded-lg"
          >
            Start for Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BadgeSection;
