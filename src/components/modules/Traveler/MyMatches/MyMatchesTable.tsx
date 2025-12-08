"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/formatters";

type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";


interface RequestItem {
  id: string;
  status: RequestStatus;
  createdAt: string;
  message: string | null;
  travelPlan: {
    destination: string;
    startDate: string;
    endDate: string;
    budget: number;
    travelType: string;
    traveler: {
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

const myMatchesColumns: Column<RequestItem>[] = [
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
    header: "Status",
    accessor: (req) => getStatusBadge(req.status),
  },
  {
    header: "Sent At",
    accessor: (req) => formatDateTime(req.createdAt),
  },
];

const MyMatchesTable = ({ requests }: MyMatchesTableProps) => {
  return (
    <ManagementTable
      data={requests}
      columns={myMatchesColumns}
      getRowKey={(req) => req.id}
      emptyMessage="No requests found"
    />
  );
};

export default MyMatchesTable;
