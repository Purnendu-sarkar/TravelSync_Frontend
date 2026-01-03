/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, CalendarCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TravelersGridProps {
  travelers: any[];
}

export default function TravelersGrid({ travelers }: TravelersGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {travelers.map((traveler: any) => (
        <Card
          key={traveler.id}
          className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 bg-gray-100">
                  <AvatarImage src={traveler.profilePhoto ?? ""} />
                  <AvatarFallback className="bg-brand-orange text-black font-semibold">
                    {traveler.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{traveler.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    {traveler.avgRating.toFixed(1)} ({traveler.totalReviews})
                  </div>
                </div>
              </div>
              <Badge variant="secondary">
                {traveler.completedPlansCount} Trips
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {traveler.address || "Not specified"}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarCheck className="h-4 w-4" />
              {traveler.completedPlansCount} completed plans
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/travelers/${traveler.id}`} className="w-full">
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
