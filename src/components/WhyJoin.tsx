"use client";

import { ShieldCheck, Megaphone, CalendarCheck, LineChart, Users } from "lucide-react";
import { ArchPortalIcon, ArmillarySphereIcon } from "./LuxuryIcons";

const features = [
  {
    icon: <ArchPortalIcon className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.2} />,
    title: "Discerning Audience",
    description: "Reach verified high-net-worth guests seeking authentic, private, and premium escapes.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    title: "Curated, Not Crowded",
    description: "We strictly limit our collection to maintain exclusivity and prevent price-competition dilution.",
  },
  {
    icon: <ArmillarySphereIcon className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.2} />,
    title: "Viveniq AI Discovery",
    description: "Our proprietary engine matches your property with travelers based on style and mood, not endless searching.",
  },
  {
    icon: <Megaphone className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    title: "Bespoke Storytelling",
    description: "Dedicated editorial features, photo curation, and brand highlights across private member channels.",
  },
  {
    icon: <CalendarCheck className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    title: "Host Autonomy",
    description: "Retain 100% control over your dates, rules, pricing, and guest acceptance.",
  },
  {
    icon: <LineChart className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    title: "Founding Host Economics",
    description: "Enjoy zero platform commission during the launch period and preferential lifetime benefits.",
  },
  {
    icon: <Users className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
    title: "Inner Circle Community",
    description: "Collaborate directly with top villa owners, restaurateurs, and sommeliers across Maharashtra.",
  },
];

export default function WhyJoin() {
  return (
    <section className="bg-[#0A0907] py-20 lg:py-28 border-b border-white/[0.06] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#8A857D]" />
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#A6A196] uppercase font-semibold">
              EXCLUSIVE ADVANTAGES
            </span>
            <span className="w-8 h-[1px] bg-[#8A857D]" />
          </div>

          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF8F5] mb-6 leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            Why Partner With <br />
            <span className="text-[#C5B499] italic">La Vivenzia</span>
          </h2>

          <p className="text-sm font-sans font-light text-[#A8A398] leading-relaxed">
            We are building an ecosystem designed to honor hospitality creators, villa owners, and culinary visionaries with uncompromising respect.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="bg-[#12100C] border border-white/[0.08] hover:border-[#D7AE63]/50 rounded-2xl p-7 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#1A1813] border border-[#2D281F] flex items-center justify-center mb-5">
                  {feat.icon}
                </div>
                <h3 
                  className="text-xl font-normal text-[#FAF8F5] tracking-wide mb-3"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans font-light text-[#9E988D] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
