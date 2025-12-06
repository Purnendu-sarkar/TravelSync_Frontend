"use client";

import { formatDateTime } from "@/lib/formatters";

interface DateCellProps {
  date: string | Date | null | undefined;
  format?: string;
}

export function DateCell({ date, format = "PPP" }: DateCellProps) {
  if (!date) return <span className="text-muted-foreground">N/A</span>;
  return <span>{formatDateTime(date, format)}</span>;
}