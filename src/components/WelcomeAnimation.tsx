"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Project-aligned quotes shown sequentially after the loading bar.
// Module scope so the effect below doesn't see a new array every render.
const quotes = [
  "Curating Extraordinary Journeys",
  "Designing Timeless Experiences",
  "Elevating Everyday Luxury"
];

export default function WelcomeAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [showText, setShowText] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [displayedQuotes, setDisplayedQuotes] = useState<string[]>([]);

  useEffect(() => {
    // Fade out logo after 6 seconds to allow quotes to appear
    const fadeTimer = setTimeout(() => setIsFading(true), 6000);
    // Show the first quote after loading bar completes + buffer
    const startTimer = setTimeout(() => setShowText(true), 3500);
    // Cycle through quotes every 2 seconds, appending each to displayedQuotes
    const quoteTimer = setInterval(() => {
      setDisplayedQuotes(prev => {
        const nextIdx = prev.length;
        if (nextIdx >= quotes.length) return prev;
        return [...prev, quotes[nextIdx]];
      });
    }, 2000);
    // Remove component after all quotes have appeared plus a short buffer (e.g., 14 seconds)
    const removeTimer = setTimeout(() => setIsVisible(false), 14000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(startTimer);
      clearInterval(quoteTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080806] transition-opacity duration-1000 ease-in-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes subtle-scale {
          0% {
            transform: scale(0.95);
            opacity: 0;
            filter: drop-shadow(0 0 0 rgba(198,148,59,0));
          }
          40% {
            opacity: 1;
          }
          70% {
            filter: drop-shadow(0 0 25px rgba(198,148,59,0.3));
          }
          100% {
            transform: scale(1.05);
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(198,148,59,0.2));
          }
        }
        @keyframes load-progress {
          0% {
            width: 0%;
          }
          15% {
            width: 10%;
          }
          50% {
            width: 55%;
          }
          100% {
            width: 100%;
          }
        }
        @keyframes text-fade {
          0% { opacity: 0; transform: translateY(5px); }
          50% { opacity: 0; transform: translateY(5px); }
          75% { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-welcome-logo {
          animation: subtle-scale 3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-loading-bar {
          animation: load-progress 2.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .animate-text-line-1 { opacity: 0; animation: text-fade 0.6s ease-out forwards; animation-delay: 1.5s; }
        .animate-text-line-2 { opacity: 0; animation: text-fade 0.6s ease-out forwards; animation-delay: 2.1s; }
        .animate-text-line-3 { opacity: 0; animation: text-fade 0.6s ease-out forwards; animation-delay: 2.7s; }
        .quote-fade { opacity: 0; animation: fadeIn 0.6s ease-out forwards; }
        @keyframes fadeIn { to { opacity: 1; } }
      `}</style>
      
      <div className="flex flex-col items-center animate-welcome-logo">
        <Image
          src="/lavivenzia_icon_clean.png"
          alt="La Vivenzia"
          width={280}
          height={90}
          className="w-48 sm:w-64 md:w-72 h-auto object-contain mb-10 -translate-x-3 sm:-translate-x-4"
          style={{ mixBlendMode: "screen" }}
          preload
          unoptimized
        />
        
        {/* Loading Bar & Text Container */}
        <div className="flex flex-col items-center w-56 sm:w-72">
          {/* Subtle line background */}
          <div className="w-full h-[1px] bg-white/5 overflow-hidden mb-5">
            {/* Golden Loading Bar fill */}
            <div className="h-full bg-gradient-to-r from-[#C6943B] via-[#F8E7A9] to-[#C6943B] animate-loading-bar"></div>
          </div>
          
          {/* Sequential project quotes */}
          <div className="w-full flex flex-col items-center space-y-1">
            {showText && displayedQuotes.map((q, idx) => (
              <p key={idx} className="font-serif italic text-xs sm:text-sm text-[#F8E7A9] tracking-[0.2em] uppercase quote-fade" style={{ animationDelay: `${1.5 + idx * 0.6}s` }}>
                {q}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
