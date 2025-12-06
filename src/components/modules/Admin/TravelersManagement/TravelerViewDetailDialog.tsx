import InfoRow from "@/components/shared/InfoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { ITraveler } from "@/types/traveler.interface";
import { Calendar, Mail, MapPin, User } from "lucide-react";

interface ITravelerViewDialogProps {
  open: boolean;
  onClose: () => void;
  traveler: ITraveler | null;
}

const TravelerViewDetailDialog = ({
  open,
  onClose,
  traveler,
}: ITravelerViewDialogProps) => {
  if (!traveler) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Traveler Profile</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Traveler Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={traveler?.profilePhoto || ""}
                alt={traveler?.name || ""}
              />
              <AvatarFallback className="text-2xl">
                {getInitials(traveler?.name || "")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{traveler?.name}</h2>
              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {traveler?.email}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge
                  variant={traveler?.isDeleted ? "destructive" : "default"}
                  className="text-sm"
                >
                  {traveler?.isDeleted ? "Inactive" : "Active"}
                </Badge>
                <Badge
                  variant={traveler?.isVerified ? "secondary" : "outline"}
                  className="text-sm"
                >
                  {traveler?.isVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
            </div>
          </div>
          {/* Information Grid */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Gender"
                    value={
                      traveler.gender
                        ? traveler.gender.charAt(0) +
                          traveler.gender.slice(1).toLowerCase()
                        : "Not specified"
                    }
                  />
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Address"
                    value={traveler.address || "Not provided"}
                  />
                </div>
              </div>
            </div>
            <Separator />

            {/* Additional Profile Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg">
                  Additional Profile Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                {/* Role */}
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Role" value={traveler.role || "Traveler"} />
                </div>

                {/* Bio */}
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Bio" value={traveler.bio || "No bio added"} />
                </div>

                {/* Interests */}
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Interests"
                    value={
                      traveler.interests?.length
                        ? traveler.interests.join(", ")
                        : "No interests added"
                    }
                  />
                </div>

                {/* Visited Countries */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Visited Countries"
                    value={
                      traveler.visitedCountries?.length
                        ? traveler.visitedCountries.join(", ")
                        : "No visited countries"
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Account Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Joined On"
                    value={formatDateTime(traveler.createdAt || "")}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Last Updated"
                    value={formatDateTime(traveler.updatedAt || "")}
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
export default TravelerViewDetailDialog;
