"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ArmillarySphereIcon, CompassRoseIcon } from "./LuxuryIcons";
import WaitlistModal from "./WaitlistModal";

export default function Viveniq() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <>
      <section 
        id="viveniq" 
        className="relative bg-[#080806] py-24 border-b border-white/[0.06] overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-[#9E988E]" />
                <p className="text-[#D7AE63] text-[11px] font-semibold tracking-[0.28em] uppercase font-sans">
                  Introducing Viveniq
                </p>
              </div>
              
              {/* Heading */}
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF8F5] mb-6 leading-[1.08] tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
              >
                The Intelligence Behind <br />
                <span className="text-[#C5B499] italic">Extraordinary.</span>
              </h2>
              
              {/* Description */}
              <p className="text-[#B5B0A6] text-sm sm:text-base leading-relaxed mb-8 font-light font-sans max-w-xl">
                Meet Viveniq, our proprietary state-of-the-art curation engine. Designed to seamlessly map human desire to exceptional experiences, Viveniq ensures that every recommendation is intensely personal, anticipating the unspoken preferences of our distinguished members.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-6 text-left max-w-lg mb-8">
                
                {/* Hyper-Personalization */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-11 h-11 rounded-full bg-[#14120F] border border-[#2E2A22] flex items-center justify-center shrink-0 text-[#D7AE63] shadow-md">
                    <CompassRoseIcon className="w-[22px] h-[22px]" />
                  </div>
                  <div>
                    <h4 
                      className="text-[#FAF8F5] text-base font-normal tracking-wide mb-1"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      Hyper-Personalization
                    </h4>
                    <p className="text-[#969186] text-xs sm:text-sm leading-relaxed font-sans font-light">
                      Viveniq learns from nuanced interactions to craft bespoke recommendations that evolve with your unique tastes.
                    </p>
                  </div>
                </div>

                {/* Predictive Curation */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-11 h-11 rounded-full bg-[#14120F] border border-[#2E2A22] flex items-center justify-center shrink-0 text-[#D7AE63] shadow-md">
                    <ArmillarySphereIcon className="w-[22px] h-[22px]" />
                  </div>
                  <div>
                    <h4 
                      className="text-[#FAF8F5] text-base font-normal tracking-wide mb-1"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      Predictive Curation
                    </h4>
                    <p className="text-[#969186] text-xs sm:text-sm leading-relaxed font-sans font-light">
                      Anticipating desires before they are articulated, presenting rare opportunities perfectly aligned with your lifestyle.
                    </p>
                  </div>
                </div>

              </div>

              {/* Request Early Access */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsWaitlistOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E4DCD1] hover:bg-white text-[#14120E] text-xs font-semibold tracking-wider uppercase font-sans transition-all duration-300 shadow-md hover:translate-y-[-1px]"
                >
                  <span>Experience Viveniq Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Video Container */}
            <div className="lg:col-span-6 w-full relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] shadow-[0_0_60px_rgba(215,174,99,0.08)] group bg-[#080806] aspect-video">
                
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D7AE63] opacity-60 rounded-tl-2xl z-20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D7AE63] opacity-60 rounded-br-2xl z-20 pointer-events-none" />
                
                <div className="w-full h-full overflow-hidden relative">
                  <video 
                    src="/viveniq_video.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover scale-[1.32] origin-[45%_35%] transition-transform duration-700 ease-out z-10 relative"
                  />
                  
                  {/* Watermark concealment mask: Seamless dark fade matching obsidian background perfectly */}
                  <div 
                    className="absolute bottom-0 right-0 w-64 h-48 pointer-events-none z-20"
                    style={{
                      background: 'radial-gradient(ellipse 100% 100% at 100% 100%, #080806 0%, #080806 55%, rgba(8,8,6,0.85) 75%, transparent 100%)'
                    }}
                  />
                </div>
                
                {/* Overlay for cinematic depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/70 via-transparent to-transparent z-10 pointer-events-none" />
              </div>
              
              {/* Background ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#D7AE63] opacity-[0.03] blur-[100px] -z-10 rounded-full pointer-events-none" />
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
