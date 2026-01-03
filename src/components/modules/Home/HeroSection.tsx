"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plane, Users } from "lucide-react";
import Link from "next/link";
export const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-4xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Find Your Perfect <br />
            <span className="text-brand-orange">Travel Buddy</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="text-xl md:text-2xl mb-10 text-gray-200 font-light max-w-2xl mx-auto"
        >
          Do not explore the world alone. Connect with like-minded travelers,
          share costs, and create unforgettable memories together.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/explore">
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto flex items-center gap-2 text-lg px-8 py-6"
            >
              <Users className="h-5 w-5" /> Find Buddies
            </Button>
          </Link>
          <Link href="/create-plan">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto flex items-center gap-2 text-lg px-8 py-6"
            >
              <Plane className="h-5 w-5" /> Create Plan
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.5,
          duration: 1,
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};
