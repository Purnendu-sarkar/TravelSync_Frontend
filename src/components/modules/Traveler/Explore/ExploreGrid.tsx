/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, User, Sparkles } from "lucide-react";
import { format } from "date-fns";
interface ExploreCardProps {
  matches: any[];
}
export default function MatchesGrid({ matches }: ExploreCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((plan: any) => (
        <Card
          key={plan.id}
          className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={
                      plan.traveler.profilePhoto || "/placeholder-avatar.jpg"
                    }
                    alt={plan.traveler.name}
                    width={72}
                    height={108}
                    className="rounded-full object-cover border-2 border-primary/20"
                  />
                  <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {plan.traveler.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.traveler._count.travelPlans} plans
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg font-bold">
                {plan.matchScore}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-bold text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {plan.destination}
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {format(new Date(plan.startDate), "MMM d")} -{" "}
                  {format(new Date(plan.endDate), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-medium">{plan.budget}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="capitalize text-sm">
                {plan.travelType.toLowerCase()} Trip
              </span>
            </div>
            {plan.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {plan.description}
              </p>
            )}
          </CardContent>
          <CardFooter>
            
            <Link href={`/travel-plans/${plan.id}`} className="w-full">
              <Button className="w-full" size="lg">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}