import { HeroSection } from "@/components/modules/Home/HeroSection";
import { HowItWorksSection } from "@/components/modules/Home/HowItWorksSection";
import { SubscriptionPreviewSection } from "@/components/modules/Home/SubscriptionPreviewSection";
import { TestimonialsSection } from "@/components/modules/Home/TestimonialsSection";
import { WhyChooseUsSection } from "@/components/modules/Home/WhyChooseUsSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <SubscriptionPreviewSection />
    </main>
  );
}
