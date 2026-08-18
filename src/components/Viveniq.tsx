import React from "react";
import { Brain, Zap } from "lucide-react";

export default function Viveniq() {
  return (
    <section className="relative bg-[var(--color-background)] pt-0 pb-8 sm:pb-12 lg:pb-24 border-b border-[var(--color-border-subtle)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4 sm:mb-6 opacity-80">
              <div className="w-10 h-[1px] bg-[var(--color-gold-muted)]" />
              <p className="text-[var(--color-gold-primary)] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase font-sans">
                Introducing Viveniq
              </p>
            </div>
            
            <h2 className="font-serif font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--color-ivory)] mb-6 sm:mb-8 leading-tight uppercase">
              The Intelligence Behind <br className="hidden md:block" /> 
              <span className="text-gradient-gold italic font-normal">Extraordinary.</span>
            </h2>
            
            <p className="text-[var(--color-body-text)] text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 font-light font-sans max-w-xl mx-auto lg:mx-0">
              Meet Viveniq, our proprietary state-of-the-art curation engine. Designed to seamlessly map human desire to exceptional experiences, Viveniq ensures that every recommendation is intensely personal, anticipating the unspoken preferences of our distinguished members.
            </p>

            <div className="space-y-6 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[var(--color-surface-warm)] border border-[var(--color-border-gold)] flex items-center justify-center shrink-0 text-[var(--color-gold-primary)] shadow-md">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[var(--color-ivory)] text-sm sm:text-base md:text-lg font-serif font-semibold tracking-wide mb-1 uppercase">Hyper-Personalization</h4>
                  <p className="text-[var(--color-muted-text)] text-xs sm:text-sm md:text-base leading-relaxed font-sans font-light">
                    Viveniq learns from nuanced interactions to craft bespoke recommendations that evolve with your unique tastes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[var(--color-surface-warm)] border border-[var(--color-border-gold)] flex items-center justify-center shrink-0 text-[var(--color-gold-primary)] shadow-md">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[var(--color-ivory)] text-sm sm:text-base md:text-lg font-serif font-semibold tracking-wide mb-1 uppercase">Predictive Curation</h4>
                  <p className="text-[var(--color-muted-text)] text-xs sm:text-sm md:text-base leading-relaxed font-sans font-light">
                    Anticipating desires before they are articulated, presenting rare opportunities perfectly aligned with your lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Container */}
          <div className="lg:w-1/2 w-full relative">
            <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border-gold)] shadow-[0_0_60px_rgba(212,175,55,0.08)] group bg-[var(--color-surface)] aspect-video">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-l-2 border-[var(--color-gold-primary)] opacity-70 rounded-tl-2xl z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-r-2 border-[var(--color-gold-primary)] opacity-70 rounded-br-2xl z-20 pointer-events-none" />
              
              <video 
                src="/viveniq_video.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out z-10 relative"
              />
              
              {/* Subtle overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/60 via-transparent to-transparent z-10 pointer-events-none" />
            </div>
            
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--color-gold-primary)] opacity-[0.04] blur-[100px] -z-10 rounded-full pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
