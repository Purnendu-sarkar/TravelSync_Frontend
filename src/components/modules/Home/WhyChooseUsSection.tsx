"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  Heart,
  Star,
  Globe2,
  Users2,
} from "lucide-react";
const benefits = [
  {
    icon: ShieldCheck,
    text: "Verified Travelers Only",
    desc: "Every member goes through a verification process for your safety.",
  },
  {
    icon: CreditCard,
    text: "Secure Payments",
    desc: "Your transactions are protected with bank-level security encryption.",
  },
  {
    icon: Heart,
    text: "Interest Matching",
    desc: "Find people who love the same activities and travel style as you.",
  },
  {
    icon: Star,
    text: "Real Reviews",
    desc: "Transparent rating system based on actual completed trips.",
  },
  {
    icon: Globe2,
    text: "Global Community",
    desc: "Connect with travelers from over 120 countries around the world.",
  },
  {
    icon: Users2,
    text: "24/7 Support",
    desc: "Our dedicated team is always here to help you during your journey.",
  },
];
export const WhyChooseUsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">
            Why Choose TravelSync?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We prioritize safety, compatibility, and community to ensure you
            have the best travel experience possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
              className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <div className="bg-brand-orange/10 p-3 rounded-lg shrink-0">
                <benefit.icon className="h-6 w-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  {benefit.text}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
