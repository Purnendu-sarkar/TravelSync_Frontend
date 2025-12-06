"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
  isDeleted: boolean;
}

export function StatusBadgeCell({ isDeleted }: StatusBadgeCellProps) {
  return (
    <Badge variant={isDeleted ? "destructive" : "default"}>
      {isDeleted ? "Inactive" : "Active"}
    </Badge>
  );
}