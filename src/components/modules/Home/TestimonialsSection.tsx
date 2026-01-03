"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { getPublicReviews } from "@/services/review/review.service";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Review } from "@/types/review.interface";

export const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getPublicReviews({ limit: 3 });
      setReviews(data);
    };
    fetchReviews();
  }, []);

  //   console.log("Re", reviews);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">
            What Travelers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy travelers who have found their perfect
            companions through our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
            >
              <Card className="h-full border-none shadow-lg bg-gray-50/50 hover:bg-white transition-colors duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6">
                    <Quote className="h-10 w-10 text-brand-orange/20 mb-4" />
                    <p className="text-gray-700 italic text-lg leading-relaxed">
                      {`"${review.comment}"`}
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
        </div>
      </div>
    </section>
  );
};
