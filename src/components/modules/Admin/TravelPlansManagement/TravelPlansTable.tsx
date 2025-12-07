"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { travelPlansColumns } from "./travelPlanColumns";
import { useState } from "react";
import TravelPlanViewDetailDialog from "./TravelPlanViewDetailDialog";
import { deleteTravelPlanAction } from "@/services/admin/travelPlansManagement";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface TravelPlansTableProps {
  travelPlans: ITravelPlan[];
}

const TravelPlansTable = ({ travelPlans }: TravelPlansTableProps) => {
  const [viewingTravelPlan, setViewingTravelPlan] =
    useState<ITravelPlan | null>(null);
  const [deletingTravelPlan, setDeletingTravelPlan] =
    useState<ITravelPlan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = (travelPlan: ITravelPlan) => {
    setViewingTravelPlan(travelPlan);
  };

  const handleDelete = (travelPlan: ITravelPlan) => {
    setDeletingTravelPlan(travelPlan);
  };

  const handleConfirmDelete = async () => {
    if (!deletingTravelPlan) return;
    try {
      setIsDeleting(true);
      const result = await deleteTravelPlanAction(deletingTravelPlan.id);
      if (result?.success) {
        toast.success("Travel plan deleted successfully ✅");
      } else {
        toast.error(result?.message || "Failed to delete travel plan ❌");
      }
    } catch (error) {
      toast.error("Something went wrong ❌");
      console.log(error);
    } finally {
      setIsDeleting(false);
      setDeletingTravelPlan(null);
    }
  };

  return (
    <>
      <ManagementTable
        data={travelPlans}
        columns={travelPlansColumns}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(travelPlan) => travelPlan.id}
        emptyMessage="No travel plans found"
      />
      {/* 👁️ View Travel Plan Detail Dialog */}
      <TravelPlanViewDetailDialog
        open={!!viewingTravelPlan}
        onClose={() => setViewingTravelPlan(null)}
        travelPlan={viewingTravelPlan}
      />
      {/* ✅ Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingTravelPlan}
        onOpenChange={(open) => !open && setDeletingTravelPlan(null)}
        onConfirm={handleConfirmDelete}
        itemName={deletingTravelPlan?.destination}
        title="Delete Travel Plan"
        description="This travel plan will be permanently deleted from the database."
        isDeleting={isDeleting}
      />
    </>
  );
};

export default TravelPlansTable;
