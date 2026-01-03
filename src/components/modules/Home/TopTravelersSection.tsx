/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star } from "lucide-react";
import { getPublicTopTravelers } from "@/services/user/user.service";
import { Button } from "@/components/ui/button";

export const TopTravelersSection = () => {
  const [travelers, setTravelers] = useState<any[]>([]);

  useEffect(() => {
    const fetchTravelers = async () => {
      const res = await getPublicTopTravelers({ limit: 4 });

      if (res.success) {
        setTravelers(res.data);
      } else {
        setTravelers([]);
      }
    };

    fetchTravelers();
  }, []);
  //   console.log("travelers", travelers);

  return (
    <section className="py-24 bg-brand-light/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Top Rated Travelers
            </h2>
            <p className="text-gray-600 max-w-xl">
              Connect with experienced community members who love to explore.
            </p>
          </div>
          <Button variant="link" className="text-brand-orange">
            View All Travelers
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {travelers.map((traveler, i) => (
            <motion.div
              key={traveler.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer"
            >
              <div className="relative inline-block mb-4">
                <Avatar className="h-24 w-24 mx-auto border-4 border-brand-light group-hover:border-brand-orange/20 transition-colors">
                  <AvatarImage src={traveler.profilePhoto} />
                  <AvatarFallback>{traveler.name[0]}</AvatarFallback>
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
                {traveler.trips} Trips Completed
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
