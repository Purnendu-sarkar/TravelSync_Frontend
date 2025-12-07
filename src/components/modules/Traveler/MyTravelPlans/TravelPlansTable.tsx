"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { travelPlanColumns } from "./travelPlanColumns";
import { ITravelPlan } from "@/types/travelPlan.interface";
import TravelPlanViewDetailDialog from "./TravelPlanViewDetailDialog";
import { useState } from "react";
import TravelPlanEditDialog from "./TravelPlanEditDialog";

interface TravelPlansTableProps {
  travelPlans: ITravelPlan[];
}

const TravelPlansTable = ({ travelPlans }: TravelPlansTableProps) => {
  const [viewingTravelPlan, setViewingTravelPlan] =
    useState<ITravelPlan | null>(null);
  const [editingTravelPlan, setEditingTravelPlan] =
    useState<ITravelPlan | null>(null);

  const handleView = (travelPlan: ITravelPlan) => {
    setViewingTravelPlan(travelPlan);
  };

  const handleEdit = (travelPlan: ITravelPlan) => {
    setEditingTravelPlan(travelPlan);
  };

  return (
    <>
      <ManagementTable
        data={travelPlans}
        columns={travelPlanColumns}
        onView={handleView}
        onEdit={handleEdit}
        getRowKey={(travelPlan) => travelPlan.id}
        emptyMessage="No travel plans found"
      />

      {/* 👁️ View Travel Plan Detail Dialog */}
      <TravelPlanViewDetailDialog
        open={!!viewingTravelPlan}
        onClose={() => setViewingTravelPlan(null)}
        travelPlan={viewingTravelPlan}
      />

      {/* ✏️ Edit Travel Plan Dialog */}
      <TravelPlanEditDialog
        open={!!editingTravelPlan}
        onClose={() => setEditingTravelPlan(null)}
        travelPlan={editingTravelPlan}
      />
    </>
  );
};

export default TravelPlansTable;
