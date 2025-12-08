"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { sendTravelBuddyRequest } from "@/services/traveler/travelPlansManagement";
import { toast } from "sonner";

interface Props {
  planId: string;
}

const RequestToJoinButton = ({ planId }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const handleRequest = async () => {
//   console.log("✅ Button Clicked");
  setLoading(true);

  const res = await sendTravelBuddyRequest(planId);

//   console.log("✅ API Response:", res);

  if (res.success) {
    toast.success("Request sent successfully! You'll be notified when accepted", {
      duration: 5000,
    });
    router.push("/");
    router.refresh();
  } else {
    toast.error(res.message || "Failed to send request");
    // console.log("❌ Error Message:", res.message);
  }

  setLoading(false);
};



  return (
    <Button
      size="lg"
      onClick={handleRequest}
      disabled={loading}
      className="min-w-[200px]"
    >
      {loading ? "Sending Request..." : "Request to Join"}
    </Button>
  );
};

export default RequestToJoinButton;