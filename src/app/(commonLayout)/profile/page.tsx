/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getMySubscriptionStatus } from "@/services/subscription/subscription";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await getMySubscriptionStatus();
      setStatus(res);
    };

    fetchStatus();
  }, []);

  if (!status) return null;

  return (
    <div>
      {status.success && status.data.isVerified && (
        <Badge variant="outline" className="bg-green-500 text-white">
          Verified
        </Badge>
      )}
    </div>
  );
};

export default ProfilePage;
