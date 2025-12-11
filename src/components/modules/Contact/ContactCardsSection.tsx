import { MapPin, Phone, Mail } from "lucide-react";
import ContactCard from "./ContactCard";

export default function ContactCardsSection() {
  const contactCards = [
    {
      icon: <MapPin className="w-6 h-6 text-teal-600" />,
      title: "Visit Our Office",
      details: ["123 Adventure Lane", "San Francisco, CA 94105"],
      action: "Get Directions",
      href: "#",
    },
    {
      icon: <Phone className="w-6 h-6 text-teal-600" />,
      title: "Call Us",
      details: ["Mon-Fri from 8am to 5pm", "+1 (555) 000-0000"],
      action: "Call Now",
      href: "tel:+15550000000",
    },
    {
      icon: <Mail className="w-6 h-6 text-teal-600" />,
      title: "Email Support",
      details: ["We usually reply within 24h", "support@travelbuddy.com"],
      action: "Send Email",
      href: "mailto:support@travelbuddy.com",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {contactCards.map((card, index) => (
        <ContactCard key={index} {...card} />
      ))}
    </div>
  );
}
