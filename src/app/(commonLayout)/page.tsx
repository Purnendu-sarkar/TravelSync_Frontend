import { HeroSection } from "@/components/modules/Home/HeroSection";
import { HowItWorksSection } from "@/components/modules/Home/HowItWorksSection";
import { SubscriptionPreviewSection } from "@/components/modules/Home/SubscriptionPreviewSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <HowItWorksSection />
      <SubscriptionPreviewSection />
    </main>
  );
}
