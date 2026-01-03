/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Mail,
  User,
  Calendar,
  Star,
  Globe,
  Phone,
} from "lucide-react";
import { format } from "date-fns";

const MyProfile = ({ profile }: { profile: any }) => {
  const isTraveler = profile.role === "TRAVELER";

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button>Edit Profile</Button>
      </div>

      {/* PROFILE CARD */}
      <Card className="overflow-hidden">
        {/* COVER */}
        <div className="h-28 bg-linear-to-r from-primary/20 via-purple-500/20 to-pink-500/20" />

        {/* HEADER */}
        <CardHeader className="-mt-16 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* AVATAR */}
          <Avatar className="h-32 w-32 ring-4 ring-background shadow-lg">
            <AvatarImage
              src={profile.profilePhoto}
              alt={profile.name}
              className="object-cover"
            />
            <AvatarFallback className="text-4xl font-semibold">
              {profile.name?.[0]}
            </AvatarFallback>
          </Avatar>

          {/* BASIC INFO */}
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold">
              {profile.name}
            </CardTitle>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <Badge variant="secondary">{profile.role}</Badge>
              <Badge variant="outline">{profile.status}</Badge>
              {isTraveler && profile.isVerified && (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                  ✔ Verified
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="grid gap-8 md:grid-cols-2 pt-6">
          {/* PERSONAL INFO */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              Personal Information
            </h3>

            <InfoItem icon={<Mail />} text={profile.email} />

            {profile.address && (
              <InfoItem icon={<MapPin />} text={profile.address} />
            )}

            {profile.gender && (
              <InfoItem icon={<User />} text={profile.gender} />
            )}

            {profile.contactNumber && (
              <InfoItem
                icon={<Phone />}
                text={profile.contactNumber}
              />
            )}

            {profile.bio && (
              <div>
                <h4 className="font-medium mb-1">Bio</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}
          </div>

          {/* TRAVEL STATS */}
          {isTraveler && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                Travel Stats
              </h3>

              <InfoItem
                icon={<Star className="text-yellow-500" />}
                text={`${profile.reviewSummary.avgRating.toFixed(
                  1
                )} (${profile.reviewSummary.totalReviews} reviews)`}
              />

              <InfoItem
                icon={<Calendar />}
                text={`${profile.travelPlansCount} plans • ${profile.completedPlansCount} completed`}
              />

              <InfoItem
                icon={<Globe />}
                text={`${profile.visitedCountries?.length || 0} countries visited`}
              />

              {profile.interests?.length > 0 && (
                <div>
                  <h4 className="font-medium mb-1">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest: string) => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {profile.subscription && (
                <div>
                  <h4 className="font-medium mb-1">
                    Subscription
                  </h4>
                  <Badge className="mr-2">
                    {profile.subscription.plan}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profile.subscription.isActive
                      ? "Active"
                      : "Inactive"}{" "}
                    until{" "}
                    {format(
                      new Date(profile.subscription.end),
                      "PPP"
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

/* REUSABLE INFO ITEM */
const InfoItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center gap-3 text-muted-foreground">
    <span className="h-4 w-4">{icon}</span>
    <span>{text}</span>
  </div>
);

export default MyProfile;
