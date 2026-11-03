"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import WaitlistModal from "./WaitlistModal";

export default function MoreThanPlaces() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const cards = [
    {
      num: "01",
      title: "Curated stays",
      desc: "Only the best stays, handpicked for your style and pace.",
      image: "/design/card1_photo.jpg",
    },
    {
      num: "02",
      title: "Local experiences",
      desc: "Go beyond the obvious, discover the real.",
      image: "/design/card2_photo.jpg",
    },
    {
      num: "03",
      title: "Personalised journeys",
      desc: "Stays, dining and experiences brought together around you.",
      image: "/design/card3_photo.jpg",
    },
  ];

  return (
    <>
      <section 
        id="experiences" 
        className="w-full bg-[#080806] py-20 lg:py-28 border-b border-white/[0.06] relative overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            
            {/* Left Column: Heading & Subtitle */}
            <div className="lg:col-span-3 flex flex-col items-start text-left pt-2">
              
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-[#C6943B]" aria-hidden="true" />
                <span className="text-[10px] font-sans font-semibold tracking-[0.25em] text-[#A6A196] uppercase">
                  THE CURATION PHILOSOPHY
                </span>
              </div>

              {/* Main Headline */}
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#FAF8F5] mb-8"
                style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
              >
                More than<br />
                <span className="text-[#C5B499]">just places.</span>
              </h2>

              {/* Subtext badge */}
              <div className="pt-2 pl-4 border-l border-[#C6943B]/50">
                <p className="text-xs sm:text-sm font-sans font-light text-[#A8A398] leading-relaxed">
                  A complete travel experience,<br />
                  thoughtfully curated for you.
                </p>
              </div>

              {/* Join waitlist trigger */}
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => setIsWaitlistOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-sans font-medium tracking-[0.16em] uppercase text-[#D7AE63] hover:text-[#FAF8F5] transition-colors group"
                >
                  <span>Explore member privileges</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>

            {/* Center: 3 Experience Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
              {cards.map((card) => (
                <div
                  key={card.num}
                  onClick={() => setIsWaitlistOpen(true)}
                  className="group cursor-pointer bg-[#12110E] border border-white/[0.08] hover:border-[#D7AE63]/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:translate-y-[-2px]"
                >
                  <div>
                    {/* Number */}
                    <div className="mb-3">
                      <span className="text-xs font-mono tracking-widest text-[#7C776D] group-hover:text-[#D7AE63] transition-colors">
                        {card.num}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 border border-white/[0.05]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 250px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-lg font-normal text-[#FAF8F5] mb-2 tracking-wide"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs font-sans font-light text-[#9E988D] leading-relaxed mb-4">
                      {card.desc}
                    </p>
                  </div>

                  {/* Arrow Action */}
                  <div className="flex justify-end pt-2">
                    <div className="w-8 h-8 rounded-full border border-white/15 bg-white/[0.03] group-hover:bg-[#E4DCD1] group-hover:border-[#E4DCD1] flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 text-[#B5B0A4] group-hover:text-[#14120E] transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Maharashtra Launch Map */}
            <div className="lg:col-span-3 flex flex-col justify-between h-full min-h-[380px] bg-[#100F0C] border border-white/[0.08] rounded-2xl p-6 relative overflow-hidden group">
              
              {/* Background map graphic */}
              <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                <Image
                  src="/design/maharashtra_map.jpg"
                  alt="Maharashtra Launch Region"
                  fill
                  sizes="320px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100F0C] via-transparent to-[#100F0C]/80" />
              </div>

              {/* Glowing Coordinate Beacon */}
              <div className="relative z-10 pt-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#D7AE63] animate-ping opacity-75 absolute" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E4BA68] relative" />
                  </div>
                  <div className="h-6 w-px bg-gradient-to-b from-[#D7AE63] to-transparent" />
                </div>
                
                <span className="block text-[10px] font-sans font-semibold tracking-[0.22em] text-[#A6A196] uppercase mb-1">
                  LAUNCHING FIRST IN
                </span>
                <span 
                  className="block text-xl font-normal text-[#E2BA5F] tracking-wide"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  MAHARASHTRA
                </span>
              </div>

              {/* Bottom: More destinations coming soon */}
              <div className="relative z-10 pt-16 flex items-center justify-between border-t border-white/[0.08]">
                <div className="text-left">
                  <span className="block text-[10px] font-sans font-bold tracking-[0.2em] text-[#C5C0B5] uppercase">
                    MORE DESTINATIONS
                  </span>
                  <span className="block text-[10px] font-sans font-bold tracking-[0.2em] text-[#C5C0B5] uppercase">
                    COMING SOON
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWaitlistOpen(true)}
                  aria-label="Request your destination"
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.04] hover:bg-[#E4DCD1] hover:border-[#E4DCD1] flex items-center justify-center transition-all duration-300 group/btn"
                >
                  <ArrowRight className="w-4 h-4 text-[#C5C0B5] group-hover/btn:text-[#14120E] transition-colors" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </>
  );
}
