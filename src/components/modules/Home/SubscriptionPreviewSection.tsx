"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getSubscriptionPlans } from "@/services/subscription/subscription";
import { SubscriptionPlan } from "@/types/subscriptionPlan.interface";
import Loading from "@/app/loading";
import { CreditCard } from "lucide-react";

export const SubscriptionPreviewSection = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await getSubscriptionPlans();
        setPlans(res?.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  /* -------------------- LOADING STATE -------------------- */
  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Upgrade Your Experience
        </h2>

        {/* -------------------- EMPTY STATE -------------------- */}
        {plans.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <CreditCard className="mx-auto h-14 w-14 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold mb-2">
              No Subscription Plans Available
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We’re currently preparing exciting subscription plans to enhance
              your travel experience. Please check back soon.
            </p>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </motion.div>
        )}

        {/* -------------------- DATA GRID -------------------- */}
        {plans.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-white rounded-lg shadow-lg text-center"
              >
                <h3 className="text-2xl font-bold mb-2">{plan.type}</h3>
                <p className="text-3xl font-semibold mb-4">
                  ${plan.price}
                  <span className="text-base font-normal">/mo</span>
                </p>
                <p className="text-muted-foreground">{plan.duration}</p>

                <Link href="/subscription">
                  <Button className="mt-6 w-full">Subscribe Now</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
