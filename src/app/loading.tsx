"use client";

import { motion, Transition } from "framer-motion";
import { Globe, Luggage, PlaneTakeoff } from "lucide-react";

const containerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const dotVariants = {
  start: { y: "0%" },
  end: { y: "100%" },
};

const dotTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

export default function Loading() {
  return (
    <div className="min-h-svh w-full flex flex-col items-center justify-center bg-white dark:bg-background overflow-hidden">
      {/* Animated Dots */}
      <motion.div
        className="flex space-x-3 mb-10"
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {[1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="w-4 h-4 bg-sky-500 rounded-full"
            variants={dotVariants}
            transition={dotTransition}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center"
      >
        <PlaneTakeoff className="w-16 h-16 text-sky-600 mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Preparing Your Adventure
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Finding the perfect travel buddies for you...
        </p>
      </motion.div>

      {/* Bottom Icons */}
      <motion.div
        className="mt-12 flex space-x-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Globe className="w-8 h-8 text-sky-500 animate-spin" />
        <Luggage className="w-8 h-8 text-sky-500 animate-pulse" />
      </motion.div>
    </div>
  );
}
