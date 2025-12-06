"use client";

import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useTransition } from "react";
import { updateTravelerStatusAction } from "@/services/admin/travelersManagement";

type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

interface StatusBadgeCellProps {
  email: string;
  status: UserStatus;
}

/**
 * STATUS CYCLE:
 * ACTIVE → BLOCKED → INACTIVE → ACTIVE
 */
const getNextStatus = (current: UserStatus): UserStatus => {
  if (current === "ACTIVE") return "BLOCKED";
  if (current === "BLOCKED") return "INACTIVE";
  return "ACTIVE";
};

export function StatusBadgeCell({ email, status }: StatusBadgeCellProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const nextStatus = getNextStatus(status);

    startTransition(async () => {
      const res = await updateTravelerStatusAction(email, nextStatus);

      if (res?.success) {
        toast.success(`User status updated to ${nextStatus}`);
      } else {
        toast.error(res?.message || "Status update failed");
      }
    });
  };

  const getVariant = () => {
    if (status === "BLOCKED") return "destructive";
    if (status === "INACTIVE") return "secondary";
    return "default";
  };

  return (
    <Badge
      onClick={handleToggle}
      className="cursor-pointer select-none"
      variant={getVariant()}
    >
      {isPending ? "Updating..." : status}
    </Badge>
  );
}
