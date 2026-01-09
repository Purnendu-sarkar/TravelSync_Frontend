/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Crown, Loader2,  Star} from "lucide-react";
import {
  getSubscriptionPlans,
  createCheckoutSession,
  getMySubscriptionStatus,
} from "@/services/subscription/subscription";

type Plan = {
  type: string;      
  price: number;
  duration: string;
  stripePriceId?: string;
  features: string[];
};

const plansFeatures: Record<string, string[]> = {
  FREE: [
    "Basic travel plan creation",
    "Search & view public plans",
    "Send join requests (limited)",
    "Basic matching",
  ],
  MONTHLY: [
    "All Free features",
    "Verified badge (blue check)",
    "Priority in search results",
    "Unlimited buddy requests",
    "Advanced filters & sorting",
    "See who viewed your profile",
  ],
  YEARLY: [
    "All Monthly features",
    "Best value • Save ~17%",
    "Verified badge (blue check)",
    "Priority in search results",
    "Unlimited buddy requests",
    "Advanced filters & sorting",
    "See who viewed your profile",
    "Early access to new features",
  ],
};

export default function EnhancedSubscriptionPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string>("FREE");
  const [isYearly, setIsYearly] = useState(true); 

  useEffect(() => {
    async function fetchData() {
      const planRes = await getSubscriptionPlans();
      if (planRes.success) {
        const enhanced = planRes.data.map((p: any) => ({
          ...p,
          features: plansFeatures[p.type] || [],
        }));
        setPlans(enhanced);
      }

      const statusRes = await getMySubscriptionStatus();
      if (statusRes.success) {
        setCurrentPlan(statusRes.data.plan || "FREE");
      }
    }
    fetchData();
  }, []);

  const handleSubscribe = async (planType: string) => {
    if (planType === "FREE") {
      toast.info("You're already enjoying the Free plan!");
      return;
    }
    if (planType === currentPlan) {
      toast.info("This is your current active plan.");
      return;
    }

    setLoading(true);
    try {
      const result = await createCheckoutSession(planType);
      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      } else {
        toast.error(result.message || "Failed to start checkout");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const displayedPlans = plans.filter(p => 
    isYearly ? p.type !== "MONTHLY" : p.type !== "YEARLY"
  );

  return (
    <div className="w-full py-12 md:py-16 bg-linear-to-b from-background via-muted/30 to-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Unlock Premium Travel Adventures
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get verified, reach more travelers, and enjoy priority matching & exclusive features
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center items-center gap-4 mb-10">
          <Label htmlFor="yearly-toggle" className="text-lg font-medium">
            Monthly
          </Label>
          <Switch
            id="yearly-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-primary"
          />
          <div className="flex items-center gap-2">
            <Label htmlFor="yearly-toggle" className="text-lg font-medium">
              Yearly
            </Label>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
              Save ~17%
            </Badge>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {displayedPlans.map((plan) => {
            const isCurrent = plan.type === currentPlan;
            const isPopular = plan.type === "YEARLY";
            const isFree = plan.type === "FREE";

            return (
              <motion.div
                key={plan.type}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Card className={`h-full flex flex-col border-2 transition-all duration-300 ${
                  isCurrent 
                    ? "border-primary shadow-2xl scale-[1.04] z-10" 
                    : isPopular 
                      ? "border-primary/60 shadow-xl" 
                      : "border-border hover:border-primary/40 hover:shadow-lg"
                } ${isFree ? "opacity-90" : ""}`}>
                  
                  {isPopular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm">
                      Most Popular
                    </Badge>
                  )}

                  {isCurrent && (
                    <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 text-xs rounded-full font-medium">
                      Current Plan
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl md:text-3xl">{plan.type}</CardTitle>
                    <div className="mt-4">
                      <span className="text-5xl md:text-6xl font-bold">${plan.price}</span>
                      <span className="text-xl text-muted-foreground">
                        /{isYearly ? "year" : "month"}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-6">
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-base">
                          {isFree ? (
                            <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                          ) : (
                            <Star className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          )}
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-6">
                    <Button
                      onClick={() => handleSubscribe(plan.type)}
                      disabled={loading || isCurrent}
                      size="lg"
                      className="w-full text-base py-6"
                      variant={isCurrent ? "secondary" : isPopular ? "default" : isFree ? "outline" : "default"}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : isCurrent ? (
                        "Current Plan"
                      ) : isFree ? (
                        "Continue with Free"
                      ) : (
                        <>
                          Subscribe Now
                          {isPopular && <Crown className="ml-2 h-5 w-5" />}
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          Secure payments via Stripe • Cancel anytime • No hidden fees
        </p>
      </div>
    </div>
  );
}