import Image from "next/image";
import { MapPin } from "lucide-react";

export default function MapSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 h-[400px] relative overflow-hidden group">
      <Image
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80"
        alt="Map location"
        width={800}
        height={600}
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/50">
          <div className="flex items-start space-x-3">
            <div className="bg-teal-100 p-2 rounded-full text-teal-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Travel Buddy HQ</h4>
              <p className="text-sm text-gray-600">
                123 Adventure Lane, San Francisco
              </p>
              <a
                href="#"
                className="text-xs font-semibold text-teal-600 mt-1 inline-block hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
