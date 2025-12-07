"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { travelPlanColumns } from "./travelPlanColumns";
import { ITravelPlan } from "@/types/travelPlan.interface";
import TravelPlanViewDetailDialog from "./TravelPlanViewDetailDialog";
import { useState } from "react";

interface TravelPlansTableProps {
  travelPlans: ITravelPlan[];
}

const TravelPlansTable = ({ travelPlans }: TravelPlansTableProps) => {
  const [viewingTravelPlan, setViewingTravelPlan] =
    useState<ITravelPlan | null>(null);

  const handleView = (travelPlan: ITravelPlan) => {
    setViewingTravelPlan(travelPlan);
  };

  return (
    <>
      <ManagementTable
        data={travelPlans}
        columns={travelPlanColumns}
        onView={handleView}
        getRowKey={(travelPlan) => travelPlan.id}
        emptyMessage="No travel plans found"
      />

      {/* 👁️ View Travel Plan Detail Dialog */}
      <TravelPlanViewDetailDialog
        open={!!viewingTravelPlan}
        onClose={() => setViewingTravelPlan(null)}
        travelPlan={viewingTravelPlan}
      />
    </>
  );
};

export default TravelPlansTable;
