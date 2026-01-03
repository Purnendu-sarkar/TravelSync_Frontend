"use client";
import { motion, Transition } from "framer-motion";
import { Globe, Luggage, PlaneTakeoff } from "lucide-react";

const loadingContainerVariants = {
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

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

const loadingCircleTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  ease: "easeInOut",
};

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <motion.div
        className="flex space-x-2 mb-8"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          className="w-4 h-4 bg-sky-500 rounded-full"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          className="w-4 h-4 bg-sky-500 rounded-full"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          className="w-4 h-4 bg-sky-500 rounded-full"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <PlaneTakeoff className="w-16 h-16 text-sky-600 mb-4 animate-bounce" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Preparing Your Adventure
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Finding the perfect travel buddies...
        </p>
      </motion.div>
      <motion.div
        className="mt-12 flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Globe className="w-8 h-8 text-sky-500 animate-spin" />
        <Luggage className="w-8 h-8 text-sky-500 animate-pulse" />
      </motion.div>
    </div>
  );
}
