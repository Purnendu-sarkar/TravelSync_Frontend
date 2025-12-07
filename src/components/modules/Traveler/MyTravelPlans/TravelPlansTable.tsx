"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { travelPlanColumns } from "./travelPlanColumns";
import { ITravelPlan } from "@/types/travelPlan.interface";
import TravelPlanViewDetailDialog from "./TravelPlanViewDetailDialog";
import { useState } from "react";
import TravelPlanEditDialog from "./TravelPlanEditDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { deleteTravelPlanAction } from "@/services/traveler/travelPlansManagement";
import { toast } from "sonner";

interface TravelPlansTableProps {
  travelPlans: ITravelPlan[];
}

const TravelPlansTable = ({ travelPlans }: TravelPlansTableProps) => {
  const [viewingTravelPlan, setViewingTravelPlan] =
    useState<ITravelPlan | null>(null);
  const [editingTravelPlan, setEditingTravelPlan] =
    useState<ITravelPlan | null>(null);
  const [deletingTravelPlan, setDeletingTravelPlan] =
    useState<ITravelPlan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = (travelPlan: ITravelPlan) => {
    setViewingTravelPlan(travelPlan);
  };

  const handleEdit = (travelPlan: ITravelPlan) => {
    setEditingTravelPlan(travelPlan);
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
        columns={travelPlanColumns}
        onView={handleView}
        onEdit={handleEdit}
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

      {/* ✏️ Edit Travel Plan Dialog */}
      <TravelPlanEditDialog
        open={!!editingTravelPlan}
        onClose={() => setEditingTravelPlan(null)}
        travelPlan={editingTravelPlan}
      />

      {/* ✅ Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingTravelPlan}
        onOpenChange={(open) => !open && setDeletingTravelPlan(null)}
        onConfirm={handleConfirmDelete}
        itemName={deletingTravelPlan?.destination || "this travel plan"}
        title="Delete Travel Plan"
        description="This action cannot be undone. Are you sure?"
        isDeleting={isDeleting}
      />
    </>
  );
};

export default TravelPlansTable;
