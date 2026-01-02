"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    toast.success("Payment successful! You are now subscribed and verified.");
    router.push("/profile");
  }, [router]);

  return <div>Processing payment success...</div>;
};

export default PaymentSuccessPage;
