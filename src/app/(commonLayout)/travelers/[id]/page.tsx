import { Mars, Venus } from "lucide-react";
import { getPublicSingleTraveler } from "@/services/user/user.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarCheck, Star, Globe, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TravelerDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const result = await getPublicSingleTraveler(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const traveler = result.data;

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="relative h-64 md:h-80">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-90" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {traveler.name}
            </h1>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <p className="text-lg">{traveler.address || "Global Nomad"}</p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="relative  -mt-20 md:-mt-28  px-6 md:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image and Stats */}
              <div className="flex flex-col items-center md:w-1/3">
                <div className="relative">
                  <Avatar className="h-[200px] w-[200px] border-4 border-white dark:border-gray-800 shadow-xl">
                    <AvatarImage src={traveler.profilePhoto ?? ""} />
                    <AvatarFallback className="text-6xl bg-brand-orange font-bold">
                      {traveler.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <Badge className="absolute bottom-0 right-4 px-3 py-1">
                    {traveler.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="mt-6 w-full space-y-4 text-center">
                  <div className="flex justify-around">
                    <div>
                      <p className="font-bold text-xl">
                        {traveler.travelPlansCount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Plans
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-xl">
                        {traveler.completedPlansCount}
                      </p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <p className="font-bold">
                      {traveler.reviewSummary.avgRating.toFixed(1)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ({traveler.reviewSummary.totalReviews} reviews)
                    </p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="md:w-2/3 space-y-6">
                <h2 className="text-2xl font-semibold">
                  About {traveler.name}
                </h2>
                <p className="text-muted-foreground">
                  {traveler.bio || "No bio available yet."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>{traveler.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {traveler.gender === "MALE" && (
                      <Mars className="h-5 w-5 text-blue-500" />
                    )}

                    {traveler.gender === "FEMALE" && (
                      <Venus className="h-5 w-5 text-pink-500" />
                    )}

                    <span>{traveler.gender || "Not specified"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-500" />
                    <span>
                      {traveler.visitedCountries?.length || 0} countries visited
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5 text-purple-500" />
                    <span>
                      Member since{" "}
                      {new Date(traveler.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {traveler.interests?.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {traveler.interests.map((interest: string) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {traveler.subscriptionPlan && (
                  <div>
                    <h3 className="font-semibold mb-2">Subscription</h3>
                    <Badge variant="outline" className="mr-2">
                      {traveler.subscriptionPlan}
                    </Badge>
                    <p className="text-sm text-muted-foreground inline">
                      Expires on{" "}
                      {new Date(traveler.subscriptionEnd).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 md:px-8 py-6 flex justify-center gap-4">
          <Button variant="outline">Message</Button>
          <Button>Connect</Button>
        </div>
      </div>
    </div>
  );
};

export default TravelerDetailsPage;
