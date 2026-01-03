import type { Metadata } from "next";

import { HeroSection } from "@/components/modules/Home/HeroSection";
import { HowItWorksSection } from "@/components/modules/Home/HowItWorksSection";
import { PopularDestinationsSection } from "@/components/modules/Home/PopularDestinationsSection";
import { SubscriptionPreviewSection } from "@/components/modules/Home/SubscriptionPreviewSection";
import { TestimonialsSection } from "@/components/modules/Home/TestimonialsSection";
import { TopTravelersSection } from "@/components/modules/Home/TopTravelersSection";
import { WhyChooseUsSection } from "@/components/modules/Home/WhyChooseUsSection";

export const metadata: Metadata = {
  title: "Travel Buddy & Meetup | Find Travel Partners & Explore Together",
  description:
    "Travel Buddy & Meetup helps travelers connect with like-minded people, share travel plans, and find the perfect travel companion. Discover trips, match with travelers, and explore the world together.",

  keywords: [
    "travel buddy",
    "find travel partner",
    "travel meetup",
    "travel community",
    "solo traveler",
    "group travel",
    "trip matching",
    "travel social network",
    "travel together",
    "travel companions",
    "travel plans",
    "meet travelers",
  ],

  authors: [{ name: "Travel Buddy Team" }],
  creator: "Travel Buddy & Meetup",
  publisher: "Travel Buddy & Meetup",

  openGraph: {
    title: "Travel Buddy & Meetup – Find Your Perfect Travel Partner",
    description:
      "Discover travelers heading to the same destination, match with compatible travel buddies, and turn solo trips into shared adventures.",
    url: "https://travel-sync-frontend-sandy.vercel.app",
    siteName: "Travel Buddy & Meetup",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Travel Buddy & Meetup Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Travel Buddy & Meetup – Explore the World Together",
    description:
      "Find travel companions, share itineraries, and meet amazing people for your next trip.",
    // images: ["/og-home.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Travel",
};

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background">
      <HeroSection />
      <HowItWorksSection />
      <PopularDestinationsSection />
      <WhyChooseUsSection />
      <TopTravelersSection />
      <TestimonialsSection />
      <SubscriptionPreviewSection />
    </main>
  );
}
