"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { Column } from "@/components/shared/ManagementTable";
import { ITravelPlan } from "@/types/travelPlan.interface";


export const travelPlanColumns: Column<ITravelPlan>[] = [
  {
    header: "Destination",
    accessor: (plan) => plan.destination,
    sortKey: "destination",
  },
  {
    header: "Dates",
    accessor: (plan) => (
      <span>
        {new Date(plan.startDate).toLocaleDateString()} -{" "}
        {new Date(plan.endDate).toLocaleDateString()}
      </span>
    ),
    sortKey: "startDate",
  },
  {
    header: "Budget",
    accessor: (plan) => `$${plan.budget.toFixed(2)}`,
  },
  {
    header: "Type",
    accessor: (plan) => (
      <span className="text-sm capitalize">
        {plan.travelType.toLowerCase()}
      </span>
    ),
  },
  {
    header: "Created",
    accessor: (plan) => <DateCell date={plan.createdAt} />,
    sortKey: "createdAt",
  },
];
