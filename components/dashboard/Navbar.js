import { ChevronDownIcon, SearchIcon, UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Bars3Icon, XCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import axios from "axios";
import { useImageCount } from "@/context/ImageCountContext";
import { usePackage } from "@/context/PackageContext";

const Navbar = () => {
  const { user, logout } = useUser();
  const [bar, setBar] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [count, setCount] = useState(0);
  const { imageCount, setImageCount } = useImageCount(0);
  const [loading, setLoading] = useState(false);
  const {savePackage} =usePackage()

  useEffect(() => {
    if (!user)return
    setLoading(true);
    const fetch =async() => {
      try {
        console.log("fetching count", user);
        console.log("response")
        const res =await axios.get(`/api/packages/${user?.userId || user._id}`);
        console.log(res.data);
        if (!res.data?.name){
          savePackage({
            UserId: user?.userId || user._id,
            name: "Free",
            price: "0",
            images: 25,
          })
          setImageCount(25);
          setCount(25);
          return
        }

        setCount(res.data?.images  );
        setImageCount(res.data?.images  );
        // localStorage.setItem("type", "subcriber")
        console.log(res.data);
        
      } catch (error) {
        console.log(error);
      }finally {
        setLoading(false);
      }
      
    }
    fetch()

  },[user])

  const handleLogout = () => {
          toast.info('Logging out...', { duration: 1000 });
          logout();
          toast.success('Logged out successfully!', { duration: 2000 });
      }

  return (
    <div
      className={`flex flex-col md:flex-row gap-2 justify-between items-center py-4 ${
        bar ? "overflow-y-hidden" : ""
      }`}
    >
      <div className="flex md:flex-row flex-col w-full justify-between gap-4">
        <div className="flex w-full items-center justify-between gap-2 ">
          {/* Mobile Sidebar */}
          <div className="flex w-full items-center flex-col md:hidden block">
            {/* Toggle Button */}
            <div className="flex items-center w-full pl-4">
              <Bars3Icon
                className="w-10 h-10 text-white cursor-pointer bg-[#217DFE0F] p-2 rounded-md border border-[#0093E87D] hover:bg-[#217DFE1A] transition-all"
                onClick={() => setBar(!bar)}
              />
            </div>

            {/* Sidebar */}
            <div
              className={`fixed top-0 left-0 h-full z-50 flex flex-col justify-start items-start transition-transform duration-300 ease-in-out ${
                bar ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={() => setBar(false)}
              ></div>

              {/* Sidebar Content */}
              <div className="relative z-50 w-[300px] h-full p-4 bg-[#0093e8f1] border-r border-[#0093E87D] sticky top-0">
                <div className="w-full flex items-center justify-end py-4 text-white">
                  <XCircleIcon
                    className="w-6 h-6 text-white cursor-pointer"
                    onClick={() => setBar(false)}
                  />
                </div>

                <Link
                  href="/dashboard"
                  className="block py-2 text-white hover:text-gray-700"
                  onClick={() => setBar(false)}
                >
                  Home
                </Link>
                <Link
                  href="/dashboard/subscriptions"
                  className="block py-2 text-white hover:text-gray-700"
                  onClick={() => setBar(false)}
                >
                  My Credits
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block py-2 text-white hover:text-gray-700"
                  onClick={() => setBar(false)}
                >
                  Settings
                </Link>
                <Link
                  href="/dashboard/contact"
                  className="block py-2 text-white hover:text-gray-700"
                  onClick={() => setBar(false)}
                >
                  Contact
                </Link>
                <button
                  className="block py-2 text-white hover:text-gray-700 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar
          <div className="flex items-center gap-2 md:gap-4 bg-[#217DFE0F] w-full max-w-[400px] p-1 md:p-2 rounded-md border border-[#0093E87D]">
            <SearchIcon className="w-6 h-6" />
            <input
              type="text"
              placeholder="Search"
              className="w-full p-1 rounded-md outline-none bg-transparent"
            />
          </div> */}
        </div>

        {/* User Profile Section */}
        <div className="flex items-center md:justify-end gap-4">
          {/* Notification Icon */}
          <div className="flex items-center gap-2">
            <img
              src="/star.png"
              alt="notification"
              className="max-w-8 max-h-8"
            />
            <p className="text-normal sm:text-xl font-bold">{loading? "..." : imageCount}</p>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-[30px] bg-gray-500"></div>

          {/* User Info */}
          <div className="flex items-center w-full gap-2">
            <UserIcon className="max-w-6 max-h-6" />
            <div className="flex flex-col text-white">
              <p className="text-xs sm:text-normal md:text-xl font-bold">
                {user?.name || "Guest"}
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                {user?.email || "guest@example.com"}
              </p>
            </div>
            <div className="relative flex items-center p-2 hover:bg-gray-500 rounded-md cursor-pointer" onClick={()=> setDropdown(!dropdown)}>
              <ChevronDownIcon className="w-4 h-4" />
              {
              dropdown && (
                <div onClick={handleLogout} className="absolute p-2 top-10 right-0 mt-2 w-40 bg-gray-900 border border-[#0093E87D] rounded-md shadow-md">
                  <p className="te">Logout</p>
                </div>
              )
            }
            </div>

            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
