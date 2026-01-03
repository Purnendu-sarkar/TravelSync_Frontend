/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getSubscriptionPlans } from "@/services/subscription/subscription";
import { SubscriptionPlan } from "@/types/subscriptionPlan.interface";

export const SubscriptionPreviewSection = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await getSubscriptionPlans();
      setPlans(res.data);
    };
    fetchPlans();
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Upgrade Your Experience
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan: any, i) => (
            <motion.div
              key={plan.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 bg-white rounded-lg shadow-lg text-center"
            >
              <h3 className="text-2xl font-bold mb-2">{plan.type}</h3>
              <p className="text-3xl mb-4">${plan.price}/mo</p>
              <p>{plan.duration}</p>
              <Link href="/subscription">
                <Button className="mt-6">Subscribe Now</Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
