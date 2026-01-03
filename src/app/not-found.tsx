"use client";

import { motion, Variants } from "framer-motion";
import { Plane, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const planeVariants: Variants = {
  initial: { x: "-100%", rotate: -10 },
  animate: {
    x: "100%",
    rotate: 10,
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-100 to-sky-300 dark:from-sky-900 dark:to-sky-700">
      <motion.div
        className="text-center p-8 max-w-md w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="relative mb-8" variants={itemVariants}>
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2"
            variants={planeVariants}
            initial="initial"
            animate="animate"
          >
            <Plane className="w-24 h-24 text-sky-500" />
          </motion.div>
          <motion.h1
            className="text-9xl font-bold text-sky-600 dark:text-sky-300"
            variants={itemVariants}
          >
            404
          </motion.h1>
        </motion.div>
        <motion.h2
          className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200"
          variants={itemVariants}
        >
          Oops! Destination Not Found
        </motion.h2>
        <motion.p
          className="text-lg mb-8 text-gray-600 dark:text-gray-400"
          variants={itemVariants}
        >
          Looks like you have wandered off the map. Let us get you back on track
          to your next adventure!
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button asChild variant="default" size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return to Home
            </Link>
          </Button>
        </motion.div>
        <motion.div
          className="mt-12 flex justify-center"
          variants={itemVariants}
        >
          <MapPin className="w-12 h-12 text-sky-500 animate-bounce" />
        </motion.div>
      </motion.div>
    </div>
  );
}
