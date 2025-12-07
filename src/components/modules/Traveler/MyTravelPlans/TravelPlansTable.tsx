"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { travelPlanColumns } from "./travelPlanColumns";
import { ITravelPlan } from "@/types/travelPlan.interface";

interface TravelPlansTableProps {
  travelPlans: ITravelPlan[];
}

const TravelPlansTable = ({ travelPlans }: TravelPlansTableProps) => {
  return (
    <>
      <ManagementTable
        data={travelPlans}
        columns={travelPlanColumns}
        getRowKey={(travelPlan) => travelPlan.id}
        emptyMessage="No travel plans found"
      />
    </>
  );
};

export default TravelPlansTable;
