"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/formatters";

interface UserInfoCellProps {
  name: string | null | undefined;
  email: string | null | undefined;
  photo?: string | null;
}

export function UserInfoCell({ name, email, photo }: UserInfoCellProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={photo || ""} alt={name || ""} />
        <AvatarFallback>{getInitials(name || "")}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium">{name || "N/A"}</span>
        <span className="text-sm text-muted-foreground">{email || "N/A"}</span>
      </div>
    </div>
  );
}