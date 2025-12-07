"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TravelPlanForm from "@/components/modules/Traveler/TravelPlanForm";
import { ITravelPlan } from "@/types/travelPlan.interface";



interface TravelPlanEditDialogProps {
  open: boolean;
  onClose: () => void;
  travelPlan: ITravelPlan| null;
}

const TravelPlanEditDialog = ({
  open,
  onClose,
  travelPlan,
}: TravelPlanEditDialogProps) => {
  if (!travelPlan) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Travel Plan</DialogTitle>
        </DialogHeader>
        <TravelPlanForm initialData={travelPlan} isEditMode={true} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default TravelPlanEditDialog;