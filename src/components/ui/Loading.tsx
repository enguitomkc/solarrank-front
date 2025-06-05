"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      {/* Logo Section */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="flex flex-col items-center"
        >
          {/* Logo */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-6">
            <Image
              src="/images/solarrank-logo.png"
              alt="SolarRank"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Loading Animation */}
          <motion.div
            className="flex space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-primary rounded-full mx-1"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="pb-12 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <p className="text-gray-500 dark:text-gray-400 font-medium text-center">
          from{" "}
          <span className="text-gray-800 dark:text-gray-200 font-bold">
            SolarRank
          </span>
        </p>
      </motion.div>
    </div>
  );
}
