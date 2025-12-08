"use client";

import InfoRow from "@/components/shared/InfoRow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { ITravelPlan } from "@/types/travelPlan.interface";
import {
  Calendar,
  MapPin,
  DollarSign,
  Plane,
  FileText,
  Clock,
} from "lucide-react";

interface TravelPlanViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  travelPlan: ITravelPlan | null;
}

const TravelPlanViewDetailDialog = ({
  open,
  onClose,
  travelPlan,
}: TravelPlanViewDetailDialogProps) => {
  if (!travelPlan) return null;

  console.log(travelPlan)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        {/* HEADER */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
            <MapPin className="h-6 w-6 text-indigo-600" />
            {travelPlan.destination} Travel Plan
            <Badge variant="secondary" className="ml-2">
              {travelPlan.travelType}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-8">
          {/* SUMMARY CARD */}
          <div className="mt-6 p-6 rounded-xl bg-linear-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-1">
                <Calendar className="h-7 w-7 text-indigo-600" />
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-semibold">
                  {formatDateTime(travelPlan.startDate)}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Clock className="h-7 w-7 text-green-600" />
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-semibold">
                  {formatDateTime(travelPlan.endDate)}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <DollarSign className="h-7 w-7 text-emerald-600" />
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-semibold text-lg">
                  ${travelPlan.budget.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* BASIC INFO */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-lg">Plan Overview</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-5 rounded-xl">
              <InfoRow label="Destination" value={travelPlan.destination} />
              <InfoRow label="Travel Type" value={travelPlan.travelType} />
            </div>
          </div>

          <Separator />

          {/* ITINERARY */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-lg">Itinerary</h3>
            </div>

            <div className="bg-muted/50 p-5 rounded-xl">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {travelPlan.itinerary || "No itinerary added."}
              </p>
            </div>
          </div>

          <Separator />

          {/* DESCRIPTION */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-lg">Description</h3>
            </div>

            <div className="bg-muted/50 p-5 rounded-xl">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {travelPlan.description || "No description provided."}
              </p>
            </div>
          </div>

          <Separator />

          {/* META INFO */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-rose-600" />
              <h3 className="font-semibold text-lg">Plan Meta Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-5 rounded-xl">
              <InfoRow
                label="Created At"
                value={formatDateTime(travelPlan.createdAt)}
              />
              <InfoRow
                label="Updated At"
                value={formatDateTime(travelPlan.updatedAt)}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TravelPlanViewDetailDialog;
