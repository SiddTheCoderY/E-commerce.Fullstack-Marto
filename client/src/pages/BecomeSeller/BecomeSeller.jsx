import React from "react";
import { motion } from "framer-motion";

export default function BecomeSeller() {
  return (
    <div className="relative w-full h-screen bg-white flex flex-col items-center  px-4">
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-black text-4xl md:text-8xl font-bold text-center relative top-10 md:top-35"
      >
        Become <span className="highlight-tilt py-1 px-4">Seller</span> at{" "}
        <span className="text-9xl">Anbari</span>
      </motion.h1>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/10 px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer hover:scale-105"
      >
        Get Started
      </motion.button>
    </div>
  );
}
