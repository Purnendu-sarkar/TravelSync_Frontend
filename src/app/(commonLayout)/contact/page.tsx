

import ContactCardsSection from "@/components/modules/Contact/ContactCardsSection";
import ContactForm from "@/components/modules/Contact/ContactForm";
import FAQSection from "@/components/modules/Contact/FAQSection";
import HeroSection from "@/components/modules/Contact/HeroSection";
import MapSection from "@/components/modules/Contact/MapSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
        <ContactCardsSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ContactForm />
          <div className="lg:col-span-1 space-y-8">
            <MapSection />
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
}
