"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import WaitlistModal from "./WaitlistModal";

export default function PanoramicCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Coastal Sanctuaries & Island Waters",
      tag: "SEASIDE RETREATS",
      image: "/design/slider_1.jpg",
    },
    {
      id: 2,
      title: "Western Ghats & Mountain Escapes",
      tag: "MISTY HIGHLANDS",
      image: "/design/slider_2.jpg",
    },
    {
      id: 3,
      title: "Heritage Estates & Hidden Sanctuaries",
      tag: "TIMELESS SPACES",
      image: "/design/slider_3.jpg",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section className="w-full bg-[#080806] py-16 border-b border-white/[0.06] overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Main Panorama Row */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0E0C09] shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[260px] sm:min-h-[300px]">
              
              {/* Left Panorama Image */}
              <div 
                onClick={() => setIsWaitlistOpen(true)}
                className="md:col-span-5 relative overflow-hidden group cursor-pointer min-h-[200px]"
              >
                <Image
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0E0C09]" />
                
                <div className="absolute bottom-5 left-6 z-10">
                  <span className="text-[10px] font-sans font-semibold tracking-[0.22em] text-[#D7AE63] uppercase block mb-1">
                    {slides[currentIndex].tag}
                  </span>
                  <h4 
                    className="text-lg font-normal text-[#FAF8F5]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    {slides[currentIndex].title}
                  </h4>
                </div>
              </div>

              {/* Center Message: DIFFERENT PLACES | SAME FEELING | MORE YOU */}
              <div className="md:col-span-2 flex flex-col items-center justify-center p-6 text-center border-y md:border-y-0 md:border-x border-white/[0.08] bg-[#0D0B08]/80 z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D7AE63] mb-4" />
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#D7AE63]/60 to-transparent mb-4" />
                
                <div className="flex flex-col gap-1.5 font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#E4DCD1] uppercase">
                  <span>DIFFERENT PLACES</span>
                  <span className="text-[#A6A196]">SAME FEELING</span>
                  <span className="text-[#D7AE63]">MORE YOU</span>
                </div>

                <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#D7AE63]/60 to-transparent mt-4" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#D7AE63] mt-4" />
              </div>

              {/* Right Panorama Image & Controls */}
              <div 
                onClick={() => setIsWaitlistOpen(true)}
                className="md:col-span-5 relative overflow-hidden group cursor-pointer min-h-[200px]"
              >
                <Image
                  src={slides[(currentIndex + 1) % slides.length].image}
                  alt={slides[(currentIndex + 1) % slides.length].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:to-[#0E0C09]" />

                <div className="absolute bottom-5 left-6 z-10">
                  <span className="text-[10px] font-sans font-semibold tracking-[0.22em] text-[#D7AE63] uppercase block mb-1">
                    {slides[(currentIndex + 1) % slides.length].tag}
                  </span>
                  <h4 
                    className="text-lg font-normal text-[#FAF8F5]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    {slides[(currentIndex + 1) % slides.length].title}
                  </h4>
                </div>

                {/* Arrow Controls on the Bottom Right */}
                <div 
                  className="absolute bottom-4 right-4 z-20 flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous destination"
                    className="w-10 h-10 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E4DCD1] hover:text-[#14120E] hover:border-[#E4DCD1] transition-all duration-300 shadow-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next destination"
                    className="w-10 h-10 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E4DCD1] hover:text-[#14120E] hover:border-[#E4DCD1] transition-all duration-300 shadow-lg"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

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
