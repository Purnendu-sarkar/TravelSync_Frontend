import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[400px] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"
          alt="Travel background"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/30 to-slate-900/70" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-300 text-sm font-semibold mb-4 backdrop-blur-sm border border-teal-500/30">
          We’d love to hear from you.
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Have questions about your next adventure? Our team of travel experts
          is here to help you plan the perfect trip.
        </p>
      </div>
    </section>
  );
}
