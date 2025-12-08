/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Requester {
  id: string;
  name: string | null;
  email: string;
  profilePhoto: string | null;
  bio: string | null;
  gender: string | null;
  interests: string[];
  visitedCountries: string[];
  isVerified: boolean;
}

interface BuddyRequest {
  id: string;
  requester: Requester;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  message: string | null;
  createdAt: string;
}

interface BuddyRequestsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId?: string;
  destination?: string;
}

export default function BuddyRequestsDialog({
  open,
  onOpenChange,
  planId,
  destination,
}: BuddyRequestsDialogProps) {
  const [requests, setRequests] = useState<BuddyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (open && planId) {
      fetchRequests();
    } else if (!open) {
      setRequests([]);
    }
  }, [open, planId]);

  const fetchRequests = async () => {
    if (!planId) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/travel-plans/my-plans/${planId}/requests`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Please login again");
          return;
        }
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      if (data.success) {
        setRequests(data.data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    requestId: string,
    status: "ACCEPTED" | "REJECTED"
  ) => {
    setUpdatingId(requestId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/travel-plans/requests/${requestId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success(`Request ${status.toLowerCase()}!`);
        setRequests((prev) =>
          prev.map((r) => (r.id === requestId ? { ...r, status } : r))
        );
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Buddy Requests for{" "}
            <span className="text-primary">{destination}</span>
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No buddy requests yet
          </p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={req.requester.profilePhoto || undefined}
                    />
                    <AvatarFallback>
                      {req.requester.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium">
                      {req.requester.name || "Unknown"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {req.requester.email}
                    </p>
                    {req.message && (
                      <p className="text-sm mt-1 italic">{req.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      req.status === "ACCEPTED"
                        ? "default"
                        : req.status === "REJECTED"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {req.status}
                  </Badge>

                  {req.status === "PENDING" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(req.id, "ACCEPTED")}
                        disabled={updatingId === req.id}
                      >
                        {updatingId === req.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Accept"
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive border-destructive hover:bg-destructive/10"
                        onClick={() => handleStatusUpdate(req.id, "REJECTED")}
                        disabled={updatingId === req.id}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
