"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import HostRegistrationModal from "./HostRegistrationModal";
import WaitlistModal from "./WaitlistModal";

interface HeroProps {
  onOpenStory?: () => void;
}

export default function Hero({ onOpenStory }: HeroProps) {
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    { title: "COASTS", number: "01", img: "/design/thumb_coasts_clean.jpg" },
    { title: "HILLS", number: "02", img: "/design/thumb_hills_clean.jpg" },
    { title: "CULTURE", number: "03", img: "/design/thumb_culture_clean.jpg" },
    { title: "DINING", number: "04", img: "/design/thumb_dining_clean.jpg" },
  ];

  return (
    <>
      <section 
        id="vision" 
        className="relative min-h-[760px] lg:min-h-[860px] w-full bg-[#080806] overflow-hidden pt-36 pb-16 lg:pt-40 lg:pb-24 flex items-center"
      >
        {/* Architectural Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/design/hero_backdrop_pristine.jpg"
            alt="La Vivenzia Architectural Portal"
            fill
            priority
            quality={92}
            className="object-cover object-center lg:object-right"
          />
          
          {/* Subtle lighting & vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080806] via-[#080806]/85 lg:via-[#080806]/55 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#080806]/98 via-[#080806]/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#080806] to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-6 items-center">
            
            {/* Left Column — 100% Real Live Brand Copy */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left z-10">
              
              {/* Eyebrow: — LAUNCHING SOON / COMING SOON !!! */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#D7AE63]" />
                <span className="text-[11px] font-sans tracking-[0.3em] text-[#D7AE63] uppercase font-bold">
                  LAUNCHING SOON
                </span>
              </div>

              {/* Headline: The Future of Premium Experiences Begins Here. */}
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px] 2xl:text-[68px] font-normal leading-[1.08] tracking-[-0.015em] text-[#FAF8F5] mb-4"
                style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
              >
                The Future of Premium<br />
                Experiences{" "}
                <span className="text-[#C5B499] italic font-light">
                  Begins Here.
                </span>
              </h1>

              {/* Subtitle: Experience every journey through its soul */}
              <p 
                className="text-lg sm:text-xl lg:text-2xl italic tracking-wide text-[#D7AE63] font-light mb-6"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Experience every journey through its soul
              </p>

              {/* Full Original Paragraph Copy */}
              <div className="font-sans font-light text-xs sm:text-sm text-[#C5C0B6] leading-relaxed max-w-xl space-y-2 mb-8">
                <p>Travel platforms became endless directories.</p>
                <p className="italic text-[#FAF8F5] font-serif text-sm sm:text-base">We built something different!!!</p>
                <p>La Vivenzia is where extraordinary journeys begin.</p>
                <p>We curate Maharashtra&apos;s most exceptional stays, hidden gems, and unforgettable experiences around how you want to feel—not just where you want to go.</p>
                <p className="font-medium text-[#FAF8F5]">Less searching. More discovering.</p>
                <p className="italic text-[#D7AE63] pt-1">
                  Every journey is thoughtfully crafted to become a story worth telling.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
                <button
                  type="button"
                  onClick={() => setIsHostModalOpen(true)}
                  className="px-7 py-3.5 rounded-full border border-[#524B3E] hover:border-[#D7AE63] bg-black/50 hover:bg-black/80 text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase font-sans transition-all duration-300 text-center"
                >
                  Become a Founding Host
                </button>

                <button
                  type="button"
                  onClick={() => setIsWaitlistModalOpen(true)}
                  className="px-7 py-3.5 rounded-full bg-[#E4DCD1] hover:bg-white text-[#14120E] text-xs font-semibold tracking-wider uppercase font-sans transition-all duration-300 shadow-md hover:translate-y-[-1px] text-center"
                >
                  Join VIP Traveler Waitlist
                </button>
              </div>

              {/* Trust Badges */}
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 list-none">
                {["By Invitation Only", "Curated Luxury", "Founding Members Welcome"].map((badge) => (
                  <li key={badge} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#D7AE63]/80 shrink-0" aria-hidden="true" />
                    <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#A6A196] font-semibold">
                      {badge}
                    </span>
                  </li>
                ))}
              </ul>

            </div>

            {/* Center: Open Architectural Window Categories */}
            <div className="hidden xl:flex xl:col-span-2 h-full relative items-center justify-end pr-2 pointer-events-none">
              <div className="flex flex-col gap-2.5 text-right font-sans text-[11px] tracking-[0.32em] text-[#FAF8F5]/85 uppercase font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                <span>STAYS</span>
                <span>EXPERIENCES</span>
                <span>DINING</span>
                <span>ITINERARIES</span>
              </div>
            </div>

            {/* Right Column: 4 Category Cards — 2x2 grid below lg, vertical stack from lg */}
            <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-col lg:gap-3 z-10 w-full lg:max-w-[290px] lg:ml-auto">
              {categories.map((cat, idx) => {
                const isActive = activeCategory === idx;
                return (
                  <div
                    key={cat.number}
                    onClick={() => setActiveCategory(idx)}
                    className={`group cursor-pointer grid grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2.5 p-2.5 rounded-xl border transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#181613]/90 border-[#D7AE63]/60 shadow-[0_4px_24px_rgba(0,0,0,0.6)]' 
                        : 'bg-[#12110E]/70 border-white/[0.08] hover:bg-[#161411]/80 lg:bg-transparent lg:rounded-none lg:border-x-transparent lg:border-t-transparent lg:last:border-b-transparent lg:hover:rounded-xl lg:hover:bg-[#161411]/70'
                    }`}
                  >
                    <div className="relative col-span-2 lg:col-span-1 w-full aspect-[16/10] lg:w-16 lg:h-11 lg:aspect-auto rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <Image
                        src={cat.img}
                        alt={cat.title}
                        fill
                        sizes="(max-width: 1023px) 50vw, 80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <span className="pl-1 lg:pl-0 text-[11px] sm:text-xs font-sans font-medium tracking-[0.2em] text-[#FAF8F5] uppercase truncate">
                      {cat.title}
                    </span>

                    <span className="pr-1 lg:pr-2 text-xs font-mono tracking-widest text-[#7C776E] group-hover:text-[#D7AE63] transition-colors">
                      {cat.number}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 anim-fade-in">
          <div className="relative w-full max-w-4xl bg-[#0E0C09] border border-[#3A352B] rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full relative bg-black">
              <video
                src="/viveniq_video.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
      />

      {/* Host Registration Modal */}
      <HostRegistrationModal
        isOpen={isHostModalOpen}
        onClose={() => setIsHostModalOpen(false)}
      />
    </>
  );
}
