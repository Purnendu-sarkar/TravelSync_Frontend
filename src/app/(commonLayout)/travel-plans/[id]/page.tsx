import { getSingleTravelPlan } from "@/services/traveler/travelPlansManagement";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  DollarSign,
  MapPin,
  User,
  MessageSquare,
} from "lucide-react";
import RequestToJoinButton from "@/components/modules/Traveler/TravelPlan/RequestToJoinButton";

const TravelPlanDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;
  const res = await getSingleTravelPlan(id);

  if (!res.success || !res.data) {
    notFound();
  }

  const plan = res.data;

  console.log(plan, plan.traveler);

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <Card className="overflow-hidden">
        <CardHeader className="bg-linear-to-r from-blue-600 to-purple-600 text-white pb-8">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-4xl font-bold text-white">
                {plan.destination}
              </CardTitle>
              <CardDescription className="text-gray-100 mt-2 text-lg">
                Posted by {plan.traveler?.name || plan.traveler?.email}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {plan.travelType}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-8 space-y-8">
          {/* Traveler Info */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              {plan.traveler?.profilePhoto ? (
                <Image
                  src={plan.traveler.profilePhoto}
                  alt={plan.traveler.name || "Traveler"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-semibold">
                {plan.traveler?.name || "Anonymous Traveler"}
              </h3>
              <p className="text-muted-foreground">
                {plan.traveler?.bio || "No bio yet"}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Travel Dates</p>
                <p className="text-lg font-medium">
                  {new Date(plan.startDate).toLocaleDateString()} →{" "}
                  {new Date(plan.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="text-lg font-medium">{plan.budget}</p>
              </div>
            </div>

            {plan.itinerary && (
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Itinerary
                </h4>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {plan.itinerary}
                </p>
              </div>
            )}

            {plan.description && (
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Description
                </h4>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-6">
            <RequestToJoinButton planId={plan.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelPlanDetailsPage;
