import { HeroSection } from "@/components/modules/Home/HeroSection";
import { HowItWorksSection } from "@/components/modules/Home/HowItWorksSection";
import { PopularDestinationsSection } from "@/components/modules/Home/PopularDestinationsSection";
import { SubscriptionPreviewSection } from "@/components/modules/Home/SubscriptionPreviewSection";
import { TestimonialsSection } from "@/components/modules/Home/TestimonialsSection";
import { TopTravelersSection } from "@/components/modules/Home/TopTravelersSection";
import { WhyChooseUsSection } from "@/components/modules/Home/WhyChooseUsSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
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
