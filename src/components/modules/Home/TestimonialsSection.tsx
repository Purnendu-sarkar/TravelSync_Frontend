"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, MessageSquare } from "lucide-react";
import { getPublicReviews } from "@/services/review/review.service";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { Review } from "@/types/review.interface";
import Loading from "@/app/loading";

export const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getPublicReviews({ limit: 3 });
        setReviews(data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">
            What Travelers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy travelers who found their companions here.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* ---------------- LOADING ---------------- */}
          {loading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loading />
            </motion.div>
          )}

          {/* ---------------- EMPTY STATE ---------------- */}
          {!loading && reviews.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <MessageSquare className="mx-auto h-14 w-14 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No Reviews Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Be the first traveler to share your experience and inspire
                others.
              </p>
            </motion.div>
          )}

          {/* ---------------- DATA ---------------- */}
          {!loading && reviews.length > 0 && (
            <motion.div
              key="reviews"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="grid md:grid-cols-3 gap-8"
            >
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Card className="h-full border-none shadow-lg bg-gray-50/50 hover:bg-white transition-colors duration-300">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="mb-6">
                        <Quote className="h-10 w-10 text-brand-orange/20 mb-4" />
                        <p className="text-gray-700 italic text-lg leading-relaxed">
                          “{review.comment}”
                        </p>
                      </div>

                      <div className="mt-auto flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-brand-orange/20">
                          <AvatarImage src={review.reviewer.profilePhoto} />
                          <AvatarFallback>
                            {review.reviewer.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h4 className="font-bold text-brand-dark">
                            {review.reviewer.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {review.reviewer.location}
                          </p>
                        </div>

                        <div className="ml-auto flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${
                                j < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
