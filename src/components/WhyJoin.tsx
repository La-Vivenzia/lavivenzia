import { Diamond, ShieldCheck, Sparkles, Megaphone, CalendarCheck, LineChart, Users } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Diamond className="w-6 h-6 text-[var(--gold-bright)] mb-4 mx-auto" strokeWidth={1.5} />,
    title: "Premium Audience",
    description: "Reach high-intent customers seeking unique & premium experiences.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[var(--gold-bright)] mb-4 mx-auto" strokeWidth={1.5} />,
    title: "Curated, Not Crowded",
    description: "We carefully curate every listing to maintain the highest quality standards.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[var(--gold-bright)] mb-4 mx-auto" strokeWidth={1.5} />,
    title: "AI-Powered Discovery",
    description: "Our future AI engine matches your experience with the right audience, faster.",
  },
  {
    icon: <Megaphone className="w-6 h-6 text-[var(--gold-bright)] mb-4 mx-auto" strokeWidth={1.5} />,
    title: "Marketing Support",
    description: "Featured placements, storytelling, and campaigns to grow your brand.",
  },
  {
    icon: <CalendarCheck className="w-6 h-6 text-[var(--gold-bright)] mb-4 mx-auto" strokeWidth={1.5} />,
    title: "Seamless Bookings",
    description: "Receive direct bookings through our premium booking platform.",
  },
  {
    icon: <LineChart className="w-6 h-6 text-[var(--gold-bright)] mb-4 mx-auto" strokeWidth={1.5} />,
    title: "Insights & Analytics",
    description: "Track performance, customer engagement, and optimize your offerings.",
  },
  {
    icon: <Users className="w-6 h-6 text-[var(--gold-bright)] mb-4 mx-auto" strokeWidth={1.5} />,
    title: "Community Access",
    description: "Be part of an exclusive network of top hosts and creators.",
  },
];

export default function WhyJoin() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 border-b border-[var(--line-soft)] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1507652313519-d4e9174996cb?q=80&w=2000&auto=format&fit=crop"
          alt="Why Join Background"
          fill
          className="object-cover object-center opacity-30"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#161616]/90 to-[#0d0d0d]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="eyebrow mb-3">
            WHY JOIN LA VIVENZIA?
          </div>
          <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-[#fcfbf9] leading-tight px-2">
            Built for Hosts. <span className="ital font-normal">Designed for Growth.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 lg:gap-4 lg:divide-x divide-[var(--line-soft)]">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center text-center px-3 lg:first:pl-0 lg:last:pr-0 bg-[#161616]/60 lg:bg-transparent p-6 lg:p-0 border lg:border-none border-[var(--line-soft)] rounded-md"
            >
              {feature.icon}
              <h3 className="text-[var(--gold-bright)] text-sm sm:text-base font-serif font-medium mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-[#cfc8bc] text-xs sm:text-sm leading-relaxed font-light font-sans">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
