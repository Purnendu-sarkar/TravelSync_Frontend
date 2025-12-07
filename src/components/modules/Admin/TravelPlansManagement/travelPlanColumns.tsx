"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { Column } from "@/components/shared/ManagementTable";
import { ITravelPlan } from "@/types/travelPlan.interface";

export const travelPlansColumns: Column<ITravelPlan>[] = [
  {
    header: "Destination",
    accessor: (travelPlan) => (
      <span className="text-sm">{travelPlan.destination}</span>
    ),
    sortKey: "destination",
  },
  {
    header: "Travel Type",
    accessor: (travelPlan) => (
      <span className="text-sm capitalize">
        {travelPlan.travelType.toLowerCase()}
      </span>
    ),
  },
  {
    header: "Budget",
    accessor: (travelPlan) => (
      <span className="text-sm">${travelPlan.budget}</span>
    ),
  },
  {
    header: "Start Date",
    accessor: (travelPlan) => <DateCell date={travelPlan.startDate} />,
    sortKey: "startDate",
  },
  {
    header: "End Date",
    accessor: (travelPlan) => <DateCell date={travelPlan.endDate} />,
    sortKey: "endDate",
  },
  {
    header: "Created At",
    accessor: (travelPlan) => <DateCell date={travelPlan.createdAt} />,
    sortKey: "createdAt",
  },
];
