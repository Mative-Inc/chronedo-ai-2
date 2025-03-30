"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bars3Icon, XCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { useImageCount } from "@/context/ImageCountContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSession, user, logout } = useUser();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { imageCount, setImageCount } = useImageCount();

  useEffect(() => {
    if (!user) return;

    const fetchImageCount = async () => {
      try {
        const userId = user?.userId || user._id;
        const res = await axios.get(`/api/packages/${userId}`);

        if (!res.data?.name) {
          setImageCount(5); // Default count
          return;
        }

        const count = res.data.name === 'Premium' ? res.data.images : 5;
        setImageCount(count);

        if (res.data.name === 'Premium') {
          localStorage.setItem("type", "subscriber");
        }
      } catch (error) {
        console.error("Error fetching image count:", error);
        setImageCount(5); // Fallback count
      }
    };

    fetchImageCount();
  }, [user]);


  useEffect(() => {
    if (session) {
      console.log("Session data:", session);
      // Store the token in localStorage
      setSession(session);
      // localStorage.setItem("token", session.customToken);
    }
  }, [session]);

  // Navbar animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Link item animation variants
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.4
      }
    })
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  const navLinks = [
    // { href: "/", text: "Home" },
    // { href: "/about", text: "About" },
    // { href: "/pricing", text: "Pricing" },
    // { href: "/terms", text: "Terms" },
    { href: "/signin", text: "Login" },
  ];

  const handleLogout = () => {
    logout();
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className="flex bg-[#000] z-50 absolute top-10 left-0 w-full max-w-[800px] mx-auto right-0 justify-between items-center p-4 border border-[#0093E87D] rounded-xl"
    >
      <motion.div

        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Link href="/">
          <Image src="/Chronedo_AI.png" alt="logo" width={200} height={100} />
        </Link>
      </motion.div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4 items-center ">
        {!user && navLinks.map((link, index) => (
          <motion.div
            key={link.href}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={linkVariants}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={link.href}
              className={`transition-colors duration-300 px-4 py-2 ${pathname === link.href
                  ? "text-white font-medium"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              {link.text}
            </Link>
          </motion.div>
        ))}


        {
          user &&
          <motion.div
            initial="hidden"
            animate="visible"
            variants={linkVariants}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <p
              onClick={handleLogout}
              className={"cursor-pointer transition-colors duration-300 px-4 py-2 text-gray-400 hover:text-white"
              }
            >
              logout
            </p>
          </motion.div>
        }

        <motion.div
          custom={navLinks.length}
          initial="hidden"
          animate="visible"
          variants={linkVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {!user ? (
            <Link
              href="/signup"
              className="flex items-center gap-2 text-white px-4 py-2 bg-gradient-to-r from-[#21ACFD] to-[#2174FE] rounded-full cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Sign up
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-white px-4 py-2 bg-gradient-to-r from-[#21ACFD] to-[#2174FE] rounded-full cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          )}
        </motion.div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden cursor-pointer bg-gray-700 rounded-full p-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bars3Icon className="w-6 h-6 text-white" />
      </motion.div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={mobileMenuVariants}
          className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#21ABFD] to-[#0055DE] 
          flex flex-col gap-4 z-50 rounded-xl p-4 shadow-lg"
        >
          <div className="flex justify-end">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <XCircleIcon
                className="w-6 h-6 text-white cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </motion.div>
          </div>
          <div className="flex text-white flex-col gap-4">
            {!user && navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className={`block px-4 py-2 ${pathname === link.href
                      ? "text-white font-medium"
                      : "text-gray-200 hover:text-white"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </Link>
              </motion.div>
            ))}

            {
              user &&
              <motion.div
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <p
                  onClick={handleLogout}
                  className={"cursor-pointer transition-colors duration-300 px-4 py-2 hover-text-gray-800 text-white"
                  }
                >
                  logout
                </p>
              </motion.div>
            }

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * navLinks.length, duration: 0.3 }}
            >
              {!user ? (
                <Link
                  href="/signup"
                  className="flex items-center gap-2 text-white px-4 py-2 bg-[#0D0B13] rounded-full cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-white px-4 py-2 bg-[#0D0B13] rounded-full cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
