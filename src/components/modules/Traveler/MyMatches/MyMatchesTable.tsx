"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/formatters";
import { Star } from "lucide-react";
import { useState } from "react";
import ReviewDialog from "./ReviewDialog";

type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";
type PlanStatus = "PENDING" | "ONGOING" | "COMPLETED";

interface RequestItem {
  id: string;
  status: RequestStatus;
  createdAt: string;
  message: string | null;
  travelPlan: {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: number;
    travelType: string;
    status: PlanStatus;
    traveler: {
      id: string;
      name: string;
      profilePhoto?: string;
    };
  };
}

interface MyMatchesTableProps {
  requests: RequestItem[];
}

const getStatusBadge = (status: RequestStatus) => {
  switch (status) {
    case "PENDING":
      return <Badge variant="secondary">Pending</Badge>;
    case "ACCEPTED":
      return <Badge className="bg-green-100 text-green-800">Accepted</Badge>;
    case "REJECTED":
      return <Badge variant="destructive">Rejected</Badge>;
  }
};

const getPlanStatusBadge = (status: PlanStatus) => {
  switch (status) {
    case "PENDING":
      return <Badge variant="outline">Upcoming</Badge>;
    case "ONGOING":
      return <Badge className="bg-blue-100 text-blue-800">Ongoing</Badge>;
    case "COMPLETED":
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
  }
};

const myMatchesColumns = (
  openReviewDialog: (planId: string, hostId: string) => void
): Column<RequestItem>[] => [
  {
    header: "Destination",
    accessor: (req) => (
      <div className="font-medium">{req.travelPlan.destination}</div>
    ),
  },
  {
    header: "Host",
    accessor: (req) => req.travelPlan.traveler.name || "Unknown",
  },
  {
    header: "Dates",
    accessor: (req) => (
      <span className="text-sm">
        {new Date(req.travelPlan.startDate).toLocaleDateString()} →{" "}
        {new Date(req.travelPlan.endDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    header: "Budget",
    accessor: (req) => `$${req.travelPlan.budget}`,
  },
  {
    header: "Trip Status",
    accessor: (req) => getPlanStatusBadge(req.travelPlan.status),
  },
  {
    header: "Request Status",
    accessor: (req) => getStatusBadge(req.status),
  },
  {
    header: "Sent At",
    accessor: (req) => formatDateTime(req.createdAt),
  },
  {
    header: "Action",
    accessor: (req) => {
      const isAccepted = req.status === "ACCEPTED";
      const isCompleted = req.travelPlan.status === "COMPLETED";

      if (isAccepted && isCompleted) {
        return (
          <Button
            size="sm"
            onClick={() =>
              openReviewDialog(req.travelPlan.id, req.travelPlan.traveler.id)
            }
            className="flex items-center gap-1"
          >
            <Star className="w-4 h-4" />
            Leave Review
          </Button>
        );
      }
      return null;
    },
  },
];

const MyMatchesTable = ({ requests }: MyMatchesTableProps) => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedHostId, setSelectedHostId] = useState<string>("");

  const openReviewDialog = (planId: string, hostId: string) => {
    setSelectedPlanId(planId);
    setSelectedHostId(hostId);
    setReviewDialogOpen(true);
  };

  return (
    <>
      <ManagementTable
        data={requests}
        columns={myMatchesColumns(openReviewDialog)}
        getRowKey={(req) => req.id}
        emptyMessage="No requests found"
      />

      <ReviewDialog
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
        planId={selectedPlanId}
        revieweeId={selectedHostId}
      />
    </>
  );
};

export default MyMatchesTable;
