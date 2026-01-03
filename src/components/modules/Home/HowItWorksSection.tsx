"use client";

import { motion } from "framer-motion";
import { UserPlus, MapPin, Globe } from "lucide-react";
const steps = [
  {
    icon: UserPlus,
    title: "Sign Up & Profile",
    desc: "Create your profile with travel interests, budget, and preferred destinations.",
  },
  {
    icon: MapPin,
    title: "Create Travel Plan",
    desc: "Post your upcoming trip details including dates, itinerary, and what you're looking for.",
  },
  {
    icon: Globe,
    title: "Match & Travel",
    desc: "Connect with compatible travelers, chat, and embark on your shared adventure.",
  },
];
export const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start your journey in three simple steps. We make it easy to find
            the perfect companion for your next adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
              }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-light mb-6 group-hover:bg-brand-orange/10 transition-colors duration-300">
                <step.icon className="h-10 w-10 text-brand-orange" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm border-4 border-white">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-dark">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed px-4">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
