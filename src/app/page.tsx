"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PartnerBanner from "@/components/PartnerBanner";
import MoreThanPlaces from "@/components/MoreThanPlaces";
import PanoramicCarousel from "@/components/PanoramicCarousel";
import Viveniq from "@/components/Viveniq";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";
import WelcomeAnimation from "@/components/WelcomeAnimation";
import { X } from "lucide-react";

export default function Home() {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#080806] text-[#FAF8F5] selection:bg-[#D7AE63] selection:text-[#080806]">
      {/* 0. Cinematic welcome curtain (once per session) */}
      <WelcomeAnimation />

      {/* 1. Header with TopBanner & Official Brand Identity */}
      <Header />

      {/* 2. Hero Section with Real Brand Copy & Architectural Vista */}
      <Hero onOpenStory={() => setIsStoryModalOpen(true)} />

      {/* 3. Pre-Launch Curation Ribbon (No fake partner logos) */}
      <PartnerBanner />

      {/* 4. "More than just places." (Built For A Different Kind Of Traveller) */}
      <MoreThanPlaces />

      {/* 5. Panoramic Landscapes Carousel */}
      <PanoramicCarousel />

      {/* 6. Viveniq AI Intelligence Showcase with Video */}
      <div id="viveniq">
        <Viveniq />
      </div>

      {/* 7. Core Commitments & Founding Cohort Access */}
      <div id="coming-soon">
        <ComingSoon />
      </div>

      {/* 8. Footer */}
      <Footer />

      {/* Global Story Video Modal */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 anim-fade-in">
          <div className="relative w-full max-w-4xl bg-[#0E0C09] border border-[#3A352B] rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsStoryModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              aria-label="Close story video"
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

            <div className="p-6 bg-[#12100C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 
                  className="text-xl font-normal text-[#F5F2EB]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  La Vivenzia — The Soul of Extraordinary Travel
                </h3>
                <p className="text-xs font-sans text-[#A8A296] mt-0.5">
                  Handcrafted stays, dining, and hidden places across Maharashtra.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
