"use client";

import { Sparkles, Compass } from "lucide-react";

export default function PartnerBanner() {
  const offerings = [
    { name: "PRIVATE VILLAS", detail: "Exclusive Estates" },
    { name: "CHEF'S TABLES", detail: "Culinary Experiences" },
    { name: "RARE SANCTUARIES", detail: "Off-Grid Hideaways" },
    { name: "HERITAGE RETREATS", detail: "Timeless Architecture" },
    { name: "BESPOKE JOURNEYS", detail: "Thoughtfully Curated" },
  ];

  return (
    <section className="w-full bg-[#E5DFD4] border-y border-[#CBC4B6] py-4 sm:py-5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        
        {/* Left: Pre-Launch Curation Label */}
        <div className="flex items-center gap-5 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#1A1814] text-[#E5DFD4] flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-sans font-bold tracking-[0.24em] text-[#292622] uppercase">
              PRE-LAUNCH CURATION
            </span>
            <span className="block text-[10px] font-sans font-medium tracking-[0.24em] text-[#635D54] uppercase">
              WHAT WE CURATE
            </span>
          </div>
          <div className="hidden md:block w-px h-8 bg-[#B8B0A2]" />
        </div>

        {/* Center: Curated Offerings */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-11 text-[#24221E] py-1">
          {offerings.map((item) => (
            <div key={item.name} className="flex flex-col items-center sm:items-start group cursor-default">
              <span className="text-xs font-sans font-bold tracking-[0.2em] text-[#1D1B17] uppercase group-hover:text-[#800020] transition-colors">
                {item.name}
              </span>
              <span className="text-[10px] font-sans text-[#6B655C] tracking-wider mt-0.5">
                {item.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Right: Invitation Only / Launch Window */}
        <div className="flex items-center gap-5 shrink-0">
          <div className="hidden md:block w-px h-8 bg-[#B8B0A2]" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="block text-[10px] font-sans font-bold tracking-[0.22em] text-[#1E1C18] uppercase">
                BY INVITATION ONLY
              </span>
              <span className="block text-[10px] font-sans font-medium tracking-[0.22em] text-[#696359] uppercase">
                FOUNDING ACCESS · 2026
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#C6943B]/20 text-[#8F641B] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
