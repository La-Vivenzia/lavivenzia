"use client";

import { useState } from "react";
import { ClipboardList, Search, Mail, Rocket, ArrowRight } from "lucide-react";
import Image from "next/image";
import HostRegistrationModal from "./HostRegistrationModal";

const steps = [
  {
    step: "STEP 01",
    title: "Submit Details",
    description: "Tell us about your property, table, or bespoke retreat in Maharashtra.",
    icon: <ClipboardList className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
  },
  {
    step: "STEP 02",
    title: "Curation Review",
    description: "Our hospitality team reviews your space for quality, soul, and aesthetic alignment.",
    icon: <Search className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
  },
  {
    step: "STEP 03",
    title: "Founding Onboarding",
    description: "Approved hosts receive personalized profile creation and photo curation support.",
    icon: <Mail className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
  },
  {
    step: "STEP 04",
    title: "Launch Exposure",
    description: "Go live with priority positioning when the platform officially unveils.",
    icon: <Rocket className="w-5 h-5 text-[#D7AE63]" strokeWidth={1.5} />,
  },
];

export default function HowItWorks() {
  const [isHostOpen, setIsHostOpen] = useState(false);

  return (
    <>
      <section className="bg-[#080806] py-20 lg:py-28 border-b border-white/[0.06] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Architectural Visual */}
          <div className="lg:col-span-5 relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl">
            <Image 
              src="/how-it-works-new.jpg"
              alt="La Vivenzia Partner Application"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#D7AE63] uppercase block mb-1">
                EXCLUSIVITY GUARANTEED
              </span>
              <p 
                className="text-xl text-[#FAF8F5] font-normal"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Every listing is visited, verified, and thoughtfully curated.
              </p>
            </div>
          </div>

          {/* Right: 4 Steps */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#8A857D]" />
              <span className="text-[11px] font-sans tracking-[0.25em] text-[#A6A196] uppercase font-semibold">
                HOW IT WORKS
              </span>
            </div>

            <h2 
              className="text-4xl sm:text-5xl font-normal text-[#FAF8F5] mb-6 leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              The Path to Becoming a <br />
              <span className="text-[#C5B499] italic">Founding Host</span>
            </h2>

            <p className="text-sm font-sans font-light text-[#A8A398] leading-relaxed mb-10 max-w-xl">
              We ensure our onboarding process is respectful of your time while safeguarding the prestige of the La Vivenzia network.
            </p>

            {/* Steps list */}
            <div className="space-y-6 w-full max-w-xl mb-10">
              {steps.map((st) => (
                <div 
                  key={st.step} 
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#100F0C] border border-white/[0.06] hover:border-[#D7AE63]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1A1813] border border-[#2D281F] flex items-center justify-center shrink-0">
                    {st.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#D7AE63] uppercase block">
                      {st.step}
                    </span>
                    <h4 
                      className="text-lg font-normal text-[#FAF8F5] tracking-wide"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      {st.title}
                    </h4>
                    <p className="text-xs font-sans font-light text-[#9E988D] leading-relaxed mt-1">
                      {st.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Application CTA */}
            <div>
              <button
                type="button"
                onClick={() => setIsHostOpen(true)}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#E4DCD1] hover:bg-white text-[#14120E] text-xs font-semibold tracking-wider uppercase font-sans transition-all duration-300 shadow-md hover:translate-y-[-1px]"
              >
                <span>Submit Founding Host Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Host Registration Modal */}
      <HostRegistrationModal
        isOpen={isHostOpen}
        onClose={() => setIsHostOpen(false)}
      />
    </>
  );
}
