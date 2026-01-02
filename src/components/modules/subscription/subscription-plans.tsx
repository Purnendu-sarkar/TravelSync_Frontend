/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getSubscriptionPlans,
  createCheckoutSession,
  getMySubscriptionStatus,
} from "@/services/subscription/subscription";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string>("FREE");

  useEffect(() => {
    const fetchData = async () => {
      const planResult = await getSubscriptionPlans();
      if (planResult.success) {
        setPlans(planResult.data);
      }

      const statusResult = await getMySubscriptionStatus();
      if (statusResult.success) {
        setCurrentPlan(statusResult.data.plan);
      }
    };

    fetchData();
  }, []);

  const handleSubscribe = async (planType: string) => {
    if (planType === "FREE") {
      toast.info("You are already on FREE plan.");
      return;
    }

    setLoading(true);
    const result = await createCheckoutSession(planType);

    if (result.success) {
      window.location.assign(result.data.url);
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <Card key={plan.type}>
          <CardHeader>
            <CardTitle>{plan.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              ${plan.price} / {plan.duration}
            </p>
            <Button
              onClick={() => handleSubscribe(plan.type)}
              disabled={loading || plan.type === currentPlan}
            >
              {plan.type === currentPlan
                ? "Current Plan"
                : loading
                ? "Processing..."
                : "Subscribe Now"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
