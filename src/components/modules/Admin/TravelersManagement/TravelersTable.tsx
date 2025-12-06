"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { ITraveler } from "@/types/traveler.interface";
import { travelersColumns } from "./travelerColumns";
import { useState } from "react";
import TravelerViewDetailDialog from "./TravelerViewDetailDialog";
import { deleteTravelerAction } from "@/services/admin/travelersManagement";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface TravelersTableProps {
  travelers: ITraveler[];
}

const TravelersTable = ({ travelers }: TravelersTableProps) => {
  const [viewingTraveler, setViewingTraveler] = useState<ITraveler | null>(
    null
  );
  const [deletingTraveler, setDeletingTraveler] = useState<ITraveler | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = (traveler: ITraveler) => {
    setViewingTraveler(traveler);
  };

  const handleDelete = (traveler: ITraveler) => {
    setDeletingTraveler(traveler);
  };

  const handleConfirmDelete = async () => {
    if (!deletingTraveler) return;

    try {
      setIsDeleting(true);

      const result = await deleteTravelerAction(deletingTraveler.email);

      if (result?.success) {
        toast.success("Traveler deleted successfully ✅");
      } else {
        toast.error(result?.message || "Failed to delete traveler ❌");
      }
    } catch (error) {
      toast.error("Something went wrong ❌");
      console.log(error);
    } finally {
      setIsDeleting(false);
      setDeletingTraveler(null);
    }
  };
  return (
    <>
      <ManagementTable
        data={travelers}
        columns={travelersColumns}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(traveler) => traveler.id!}
        emptyMessage="No travelers found"
      />
      {/* 👁️ View Traveler Detail Dialog */}
      <TravelerViewDetailDialog
        open={!!viewingTraveler}
        onClose={() => setViewingTraveler(null)}
        traveler={viewingTraveler}
      />
      {/* ✅ Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingTraveler}
        onOpenChange={(open) => !open && setDeletingTraveler(null)}
        onConfirm={handleConfirmDelete}
        itemName={deletingTraveler?.name || deletingTraveler?.email}
        title="Delete Traveler"
        description="This traveler will be deactivated. You can restore later if needed."
        isDeleting={isDeleting}
      />
    </>
  );
};
export default TravelersTable;
