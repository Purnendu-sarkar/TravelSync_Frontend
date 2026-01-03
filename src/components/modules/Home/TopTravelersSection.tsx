/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Users } from "lucide-react";
import { getPublicTopTravelers } from "@/services/user/user.service";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import Link from "next/link";

export const TopTravelersSection = () => {
  const [travelers, setTravelers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravelers = async () => {
      try {
        const res = await getPublicTopTravelers({ limit: 4 });

        if (res?.success) {
          setTravelers(res.data || []);
        } else {
          setTravelers([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTravelers();
  }, []);

  return (
    <section className="py-24 bg-brand-light/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Top Rated Travelers
            </h2>
            <p className="text-gray-600 max-w-xl">
              Connect with experienced community members who love to explore.
            </p>
          </div>
          <Button asChild variant="link" className="text-brand-orange">
            <Link href="/travelers">View All Travelers</Link>
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {/* ---------------- LOADING ---------------- */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loading />
            </motion.div>
          )}

          {/* ---------------- EMPTY STATE ---------------- */}
          {!loading && travelers.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <Users className="mx-auto h-14 w-14 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold text-brand-dark mb-2">
                No Travelers Found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn’t find any top-rated travelers right now. Please check
                back later as our community keeps growing.
              </p>
            </motion.div>
          )}

          {/* ---------------- DATA ---------------- */}
          {!loading && travelers.length > 0 && (
            <motion.div
              key="travelers"
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {travelers.map((traveler, i) => (
                <motion.div
                  key={traveler.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer"
                >
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-24 w-24 mx-auto border-4 border-brand-light group-hover:border-brand-orange/20 transition-colors">
                      <AvatarImage src={traveler.profilePhoto} />
                      <AvatarFallback>
                        {traveler.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-full shadow-sm flex items-center gap-1 text-xs font-bold border border-gray-100">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      {traveler.avgRating}
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-brand-dark mb-1">
                    {traveler.name}
                  </h3>

                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-3">
                    <MapPin className="h-3 w-3" />
                    {traveler.address}
                  </div>

                  <div className="text-xs font-medium text-brand-blue bg-brand-blue/10 py-1 px-3 rounded-full inline-block">
                    {traveler.completedPlansCount} Trips Completed
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
