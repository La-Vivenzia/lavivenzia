"use client";

import { useState } from "react";
import WaitlistModal from "./WaitlistModal";
import HostRegistrationModal from "./HostRegistrationModal";

export default function ComingSoon() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isHostOpen, setIsHostOpen] = useState(false);

  const features = [
    { 
      icon: (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7AE63]">
          <path d="M18.8 35.4c-6.8-2.6-11.8-9.4-11.8-17.4 0-1.7.3-3.4.8-5" />
          <path d="M21.2 35.4c6.8-2.6 11.8-9.4 11.8-17.4 0-1.7-.3-3.4-.8-5" />
          <path d="M16 30c-2.5 1-5.2-.8-6-3.5 2.5-1 5.2.8 6 3.5z" />
          <path d="M14 24c-3 .5-5.5-2-5.5-5 3-.5 5.5 2 5.5 5z" />
          <path d="M12.5 17c-3-.5-4.5-3.5-3-6 3 .5 4.5 3.5 3 6z" />
          <path d="M10 11c-2-1.5-2-4.5 0-6 2 1.5 2 4.5 0 6z" />
          <path d="M16 30c-1-2.5.8-5.2 3.5-6-1 2.5-.8 5.2-3.5 6z" />
          <path d="M14 24c-.5-3 2-5.5 5-5.5.5 3-2 5.5-5 5.5z" />
          <path d="M12.5 17c.5-3 3.5-4.5 6-3-.5 3-3.5 4.5-6 3z" />
          <path d="M24 30c2.5 1 5.2-.8 6-3.5-2.5-1-5.2.8-6 3.5z" />
          <path d="M26 24c3 .5 5.5-2 5.5-5-3-.5-5.5 2-5.5 5z" />
          <path d="M27.5 17c3-.5 4.5-3.5 3-6-3 .5-4.5 3.5-3 6z" />
          <path d="M30 11c2-1.5 2-4.5 0-6-2 1.5-2 4.5 0 6z" />
          <path d="M24 30c1-2.5-.8-5.2-3.5-6 1 2.5.8 5.2 3.5 6z" />
          <path d="M26 24c.5-3-2-5.5-5-5.5-.5 3 2 5.5 5 5.5z" />
          <path d="M27.5 17c-.5-3-3.5-4.5-6-3 .5 3 3.5 4.5 6 3z" />
          <path d="M17 37l6-4" />
          <path d="M23 37l-6-4" />
        </svg>
      ),
      title: "CURATED WITH CARE", 
      desc: "Handpicked stays\nand experiences" 
    },
    { 
      icon: (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7AE63]">
          <circle cx="20" cy="20" r="11" />
          <path d="M20 2v36" />
          <path d="M2 20h36" />
          <path d="M12 12l16 16" />
          <path d="M12 28l16-16" />
          <path d="M20 6 l3 11 11 3 -11 3 -3 11 -3-11 -11-3 11-3 Z" />
        </svg>
      ),
      title: "AUTHENTIC & LOCAL", 
      desc: "Real places, local hosts,\nmeaningful connections" 
    },
    { 
      icon: (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7AE63]">
          <circle cx="20" cy="10" r="2.5" />
          <path d="M9 24 C9 14, 15 12.5, 20 12.5 C25 12.5, 31 14, 31 24" />
          <rect x="7" y="24" width="26" height="3" rx="1.5" />
          <path d="M5 31 h30" />
          <rect x="19" y="35" width="2" height="2" fill="currentColor" stroke="none" />
        </svg>
      ),
      title: "PERSONALIZED SERVICE", 
      desc: "Thoughtful support,\nevery step of the way" 
    },
    { 
      icon: (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7AE63]">
          <path d="M20 36 C20 36, 6 28, 6 10 L20 4 L34 10 C34 28, 20 36, 20 36 Z" />
          <path d="M20 32 C20 32, 10 25.5, 10 12 L20 7.5 L30 12 C30 25.5, 20 32, 20 32 Z" />
          <path d="M15 19 l3.5 3.5 l7.5 -7.5" />
        </svg>
      ),
      title: "TRUSTED & SECURE", 
      desc: "Your journey,\nin safe hands" 
    },
  ];

  return (
    <>
      <section className="relative bg-[#080806] py-24 border-b border-white/[0.06] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex flex-col items-center text-center">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#8A857D]" />
            <span className="text-[11px] font-sans tracking-[0.28em] text-[#C0BAB0] uppercase font-semibold">
              OUR COMMITMENT
            </span>
            <span className="w-8 h-[1px] bg-[#8A857D]" />
          </div>

          {/* Heading — 100% Live Site Copy */}
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-14"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            <span className="text-[#FAF8F5] font-light">Live beautifully. </span>
            <span className="text-[#C5B499] italic font-normal">Travel meaningfully.</span>
          </h2>

          {/* 4 Feature Pillars Grid */}
          <div className="w-full max-w-[1200px] bg-[#0E0C09] border border-white/[0.08] rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-2xl overflow-hidden mb-16">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center text-center p-8 transition-colors duration-300 hover:bg-[#14120E] ${
                  idx !== features.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-white/[0.06]' : ''
                }`}
              >
                <div className="mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-[#181612] border border-[#2B271F] shadow-inner">
                  {feature.icon}
                </div>
                <h4 className="text-xs font-sans font-semibold tracking-[0.2em] text-[#FAF8F5] mb-2 uppercase">
                  {feature.title}
                </h4>
                <p className="text-xs font-sans font-light text-[#9A958A] leading-relaxed whitespace-pre-line">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Launch Invitation Card */}
          <div className="w-full max-w-[800px] rounded-2xl bg-gradient-to-b from-[#14120E] to-[#0D0B08] border border-[#3A3324] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D7AE63]/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 
              className="text-2xl sm:text-3xl font-normal text-[#FAF8F5] mb-4"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Step Into the Inner Circle
            </h3>
            
            <p className="text-xs sm:text-sm font-sans font-light text-[#AAA498] max-w-lg mx-auto mb-8 leading-relaxed">
              We are currently onboarding Maharashtra&apos;s most distinguished villa owners, boutique hoteliers, and discerning travelers. Secure your priority access before our official release.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsHostOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#4D4533] hover:border-[#D7AE63] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase font-sans transition-all duration-300 hover:bg-white/5"
              >
                Become a Founding Host
              </button>
              <button
                type="button"
                onClick={() => setIsWaitlistOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E4DCD1] hover:bg-white text-[#14120E] text-xs font-semibold tracking-wider uppercase font-sans transition-all duration-300 shadow-md hover:translate-y-[-1px]"
              >
                Join VIP Traveler Waitlist
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      {/* Host Registration Modal */}
      <HostRegistrationModal
        isOpen={isHostOpen}
        onClose={() => setIsHostOpen(false)}
      />
    </>
  );
}
