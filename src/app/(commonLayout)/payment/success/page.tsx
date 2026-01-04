"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { revalidate } from "@/lib/revalidate";
import { useEffect, useState } from "react";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // Run once
  useEffect(() => {
    revalidate("my-subscription-status");
    revalidate("subscription-plans");

    toast.success("Payment successful! You are now subscribed and verified.");

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Redirect AFTER render (safe)
  useEffect(() => {
    if (countdown <= 0) {
      router.push("/my-profile");
    }
  }, [countdown, router]);

  const handleManualRedirect = () => {
    router.push("/my-profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-green-50 to-emerald-50">
      <Card className="max-w-md w-full border-green-200 shadow-lg">
        <CardContent className="pt-8 pb-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-green-100 rounded-full p-4">
                  <CheckCircle2 className="h-20 w-20 text-green-600" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-green-900">
              Payment Successful!
            </h1>

            <p className="text-green-700">
              Redirecting to your profile in {countdown} seconds...
            </p>

            <Button
              onClick={handleManualRedirect}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              Go to Profile Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
