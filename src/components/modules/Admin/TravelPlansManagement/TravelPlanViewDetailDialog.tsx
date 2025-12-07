import InfoRow from "@/components/shared/InfoRow";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { Calendar, DollarSign, MapPin, Plane, User } from "lucide-react";

interface ITravelPlanViewDialogProps {
  open: boolean;
  onClose: () => void;
  travelPlan: ITravelPlan | null;
}

const TravelPlanViewDetailDialog = ({
  open,
  onClose,
  travelPlan,
}: ITravelPlanViewDialogProps) => {
  if (!travelPlan) {
    return null;
  }

  console.log(
    "Viewing Travel Plan:",
    travelPlan,
    travelPlan.traveler,
    travelPlan.travelerId
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Travel Plan Details</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Travel Plan Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">
                {travelPlan.destination}
              </h2>
              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <User className="h-4 w-4" />
                {travelPlan.traveler?.name} ({travelPlan.traveler?.email})
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="default" className="text-sm">
                  Type: {travelPlan.travelType}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  Plans by Traveler: {travelPlan.travelerPlanCount}
                </Badge>
              </div>
            </div>
          </div>
          {/* Information Grid */}
          <div className="space-y-6">
            {/* Plan Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Plan Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Destination" value={travelPlan.destination} />
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Budget" value={`$${travelPlan.budget}`} />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Start Date"
                    value={formatDateTime(travelPlan.startDate)}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="End Date"
                    value={formatDateTime(travelPlan.endDate)}
                  />
                </div>
              </div>
            </div>
            <Separator />
            {/* Additional Details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg">Additional Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Plane className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Itinerary"
                    value={travelPlan.itinerary || "No itinerary"}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Plane className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Description"
                    value={travelPlan.description || "No description"}
                  />
                </div>
              </div>
            </div>
            <Separator />
            {/* Account Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Plan Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Created At"
                    value={formatDateTime(travelPlan.createdAt)}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Updated At"
                    value={formatDateTime(travelPlan.updatedAt)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TravelPlanViewDetailDialog;
