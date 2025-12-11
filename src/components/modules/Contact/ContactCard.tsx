import { Card } from "@/components/ui/card";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
  action: string;
  href: string;
}

export default function ContactCard({
  icon,
  title,
  details,
  action,
  href,
}: ContactCardProps) {
  return (
    <Card className="p-8 text-center flex flex-col items-center group hover:shadow-lg transition">
      <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <div className="text-gray-600 mb-6 space-y-1">
        {details.map((detail, i) => (
          <p key={i}>{detail}</p>
        ))}
      </div>
      <a
        href={href}
        className="text-teal-600 font-semibold hover:text-teal-700 mt-auto inline-flex items-center group-hover:translate-x-1 transition-transform"
      >
        {action} <span className="ml-1">→</span>
      </a>
    </Card>
  );
}
