"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentCancelPage = () => {
  const router = useRouter();

  useEffect(() => {
    toast.error("Payment cancelled. Please try again.");
    router.push("/subscription");
  }, [router]);

  return <div>Payment cancelled...</div>;
};

export default PaymentCancelPage;
