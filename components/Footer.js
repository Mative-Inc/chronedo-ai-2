import { EnvelopeIcon, MapIcon, PhoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, CheckIcon, Cross } from "lucide-react";
import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const Footer = () => {
  const [mail, setMail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [showPolicy, setShowPolicy] = React.useState(false);

  

  const handleMail = async (e) => {
    e.preventDefault();

    const termsCheckbox = document.getElementById('terms-checkbox');
  
    if (!termsCheckbox.checked) {
      setError("Please accept the terms and conditions.");
      toast.error("Please accept the terms and conditions.");
      return false;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail }),
      });
      const data = await res.json();
      setMail("");
      setSuccess(true);
      
    } catch (error) {
      setError(true);
    }finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full bg-[#000] mt-4 border-t border-[#0093E8] text-sm py-4 px-4">
      <div className="flex max-w-[1200px] w-full justify-between flex-wrap mx-auto py-10 gap-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <img src="/Chronedo_AI.png" alt="logo" width={150} height={50} className="w-30 h-10" />
            <p className="text-white text-sm">
              © 2025 Watch Background Generator. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-white text-sm">Join our newsletter</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={mail}
                onChange={(e) => {setMail(e.target.value); setError(false); setSuccess(false); setShowPolicy(true)}}
                placeholder="Enter your email"
                className="w-full p-2 rounded-md bg-transparent border border-gray-700 outline-none"
              />

              {
                !success && !error && <button onClick={handleMail} disabled={loading} className="bg-[#21ACFD] text-white px-4 py-2 h-full rounded-md hover:bg-[#2174FE] disabled:cursor-not-allowed cursor-pointer">
                {
                  loading ? <span className="loading loading-ring loading-xs"></span> : 
                  <ArrowRightIcon className="w-4 h-4" />}
              </button>}

              {/* error btn */}
              {
                error && <button className="bg-[#f03333] text-white px-4 py-2 h-full rounded-md hover:bg-[#d16969] disabled:cursor-not-allowed cursor-pointer">
                  <XMarkIcon className="w-4 h-4" />
              </button>
              }
              


              {/* success btn */}
              {
                success &&
                <button onClick={handleMail} disabled={loading} className="bg-[#72cb06] text-white px-4 py-2 h-full rounded-md hover:bg-[#86f18a] disabled:cursor-not-allowed cursor-pointer">
                  <CheckIcon className="w-4 h-4" />
              </button>}


            </div>

            {
              showPolicy &&
              <div className="flex items-center gap-2 text-sm">
                <input 
                  type="checkbox" 
                  id="terms-checkbox" 
                  className="checkbox checkbox-primary border-2 border-[#0093E8] rounded-sm bg-transparent
                        hover:border-[#21ABFD] focus:ring-2 focus:ring-[#21ACFD]
                        checked:bg-[#0093E8] checked:border-[#0093E8]" 
                />
                <label htmlFor="terms-checkbox" className="cursor-pointer ml-2">
                  
                  I agree with the <Link href="/privacy" className="text-[#0093E8] hover:underline">Privacy Policy</Link>
                </label>
              </div>}

          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4 cursor-pointer">
          <h1 className="text-white text-sm">Quick Links</h1>
          <a href="https://www.chronedo-podcast.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">Chronedo Podcast</a>
          <Link href="/contact1" className="text-sm text-gray-400 hover:text-white">Contact</Link>
          <Link href="/terms" className="text-sm text-gray-400 hover:text-white">Imprint</Link>
          <Link href="/terms" className="text-sm text-gray-400 hover:text-white">Terms & Conditions</Link>
          <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
        </div>

        {/* Column 3
        <div className="flex flex-col gap-4 cursor-pointer">
          <h1 className="text-white text-sm">Services</h1>
          <p className="text-sm text-gray-400 hover:text-white">
            Watch Background Generator
          </p>
          <p className="text-sm text-gray-400 hover:text-white">
            Watch Background Generator
          </p>
          <p className="text-sm text-gray-400 hover:text-white">
            Watch Background Generator
          </p>
        </div> */}

        {/* Column 4
        <div className="flex flex-col gap-4 cursor-pointer">
          <h1 className="text-white text-sm">Contact</h1>
          <p className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
            <MapIcon className="w-4 h-4 text-[#21ACFD]" /> Switzerland
          </p>
          <p className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
            <EnvelopeIcon className="w-4 h-4 text-[#21ACFD]" /> info@chronedo.com
          </p>
          <p className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-[#21ACFD]" /> +41 79 687 55 22
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;