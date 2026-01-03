/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Star } from "lucide-react";
import { getPublicTravelPlans } from "@/services/traveler/travelPlansManagement";
import Loading from "@/app/loading";

export const PopularDestinationsSection = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await getPublicTravelPlans({ limit: 3 });
        if (res.success) {
          setPlans(res.data || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  /* -------------------- LOADING STATE -------------------- */
  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold mb-4">Trending Travel Plans</h2>
            <p className="text-gray-600 max-w-xl">
              Discover popular trips created by our community travelers.
            </p>
          </div>
          <Link href="/explore">
            <Button variant="outline" className="w-full">
              View All
            </Button>
          </Link>
        </div>

        {/* -------------------- EMPTY STATE -------------------- */}
        {plans.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <MapPin className="mx-auto h-14 w-14 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No Travel Plans Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Be the first to create a travel plan and inspire fellow travelers
              to join your journey.
            </p>
            <Link href="/create-travel-plan">
              <Button>Create Travel Plan</Button>
            </Link>
          </motion.div>
        )}

        {/* -------------------- DATA GRID -------------------- */}
        {plans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                  {/* Traveler Header */}
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            plan.traveler?.profilePhoto ||
                            "/placeholder-avatar.jpg"
                          }
                          alt={plan.traveler?.name}
                          width={56}
                          height={56}
                          className="rounded-full object-cover border"
                        />
                        <div>
                          <h3 className="font-semibold">
                            {plan.traveler?.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {plan.traveler?._count?.travelPlans} plans created
                          </p>
                        </div>
                      </div>

                      <Badge variant="secondary">{plan.travelType}</Badge>
                    </div>
                  </CardHeader>

                  {/* Content */}
                  <CardContent className="space-y-4">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      {plan.destination}
                    </h4>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(new Date(plan.startDate), "MMM d")} –{" "}
                        {format(new Date(plan.endDate), "MMM d, yyyy")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">
                        Budget: ${plan.budget}
                      </span>
                    </div>

                    {plan.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {plan.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>
                        {plan.hostRating?.avgRating} (
                        {plan.hostRating?.totalReviews} reviews)
                      </span>
                    </div>
                  </CardContent>

                  {/* Footer */}
                  <CardFooter>
                    <Link href={`/travel-plans/${plan.id}`} className="w-full">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
