// Gallery.js
import React from "react";
import { motion } from "framer-motion";
import GalleryCarousel from "./GalleryCarousel";

const Gallery = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-[1200px] py-15 px-4 mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-2 w-full items-center justify-center bg-[#0B1018] shadow-[0_-2px_10px_-1px_rgba(0,147,232,1)] rounded-lg py-4"
      >
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center px-2 justify-center gap-2"
        >
          <h1 className="text-white text-4xl font-semibold">Inspiration</h1>
          <p className="text-gray-400 text-lg">
            Discover what Chronedo AI can do for your watch photos
          </p>
        </motion.div>

        <div className="w-full px-4 relative max-h-[600px]"> 
          <GalleryCarousel />
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;