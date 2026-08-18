"use client";

import { useState } from "react";
import Image from "next/image";
import HostRegistrationModal from "./HostRegistrationModal";
import WaitlistModal from "./WaitlistModal";

export default function Hero() {
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center bg-[#080806] overflow-hidden pt-24 pb-12 md:pt-28">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-background.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-right opacity-85"
            preload
            quality={75}
          />
          {/* Strong left dark panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080806] from-30% via-[#080806]/70 via-60% to-transparent" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080806] to-transparent" />
          {/* Top navbar blend */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080806] to-transparent" />
          {/* Subtle amber warmth on left */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(ellipse_at_20%_55%,rgba(198,148,59,0.07)_0%,transparent_65%)]" />
        </div>

        {/* Main Content — vertically centered, left-aligned */}
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 relative z-10 flex flex-col items-start text-left">

          {/* Coming Soon */}
          <div className="mb-3">
            <span className="text-[#D7AE63] font-sans font-bold tracking-[0.3em] uppercase text-sm sm:text-base md:text-lg drop-shadow-md">
              COMING SOON !!!
            </span>
          </div>

          <h1
            className="font-serif leading-[1.1] mb-4 tracking-wide"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 42px)",
              background: "linear-gradient(to right, #E2BA5F 0%, #F8E7A9 20%, #C6943B 45%, #F8E7A9 70%, #E2BA5F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 400,
              maxWidth: "800px",
              filter: "drop-shadow(0 4px 15px rgba(198,148,59,0.3)) drop-shadow(0 10px 40px rgba(0,0,0,0.8))"
            }}
          >
            The Future of Premium<br />
            Experiences{" "}
            <span
              className="italic font-light"
              style={{ 
                background: "linear-gradient(to right, #C6943B 0%, #F8E7A9 50%, #E2BA5F 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                fontSize: "92%" 
              }}
            >
              Begins Here.
            </span>
          </h1>

          <p 
            className="italic text-lg sm:text-xl md:text-2xl tracking-wide text-balance sm:whitespace-nowrap mb-8 pt-1"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "#D7AE63",
              opacity: 0.9,
              fontWeight: 300,
            }}
          >
            Experience every journey through its soul
          </p>

          {/* Brand Description */}
          <div
            className="font-light leading-relaxed mb-8 text-[#E7D5B4]/90 space-y-1.5"
            style={{ 
              fontFamily: "var(--font-cormorant)", 
              maxWidth: "640px", 
              fontSize: "clamp(1.1rem, 1.5vw, 22px)", 
              letterSpacing: "0.02em" 
            }}
          >
            <p>Travel platforms became endless directories.</p>
            <p className="italic text-[#E7D5B4]">We built something different!!!</p>
            <p>La Vivenzia is where extraordinary journeys begin.</p>
            <p>We curate Maharashtra&apos;s most exceptional stays, hidden gems, and unforgettable experiences around how you want to feel—not just where you want to go.</p>
            <p>Less searching. More discovering.</p>
            <p className="italic text-[#E7D5B4] pt-2">
              Every journey is thoughtfully crafted to become a story worth telling.
            </p>
          </div>

          {/* Thin gold rule above buttons */}
          <div className="w-16 h-px bg-gradient-to-r from-[#C6943B]/60 to-transparent mb-5" />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsHostModalOpen(true)}
              className="btn-gold-primary !px-8 !py-3.5 !text-[11px] !tracking-[0.2em]"
            >
              Become a Founding Host
            </button>
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="btn-waitlist !px-8 !py-3.5 !text-[11px] !tracking-[0.2em]"
            >
              Join VIP Traveler Waitlist
            </button>
          </div>

          {/* Trust badges */}
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-5 list-none">
            {["By Invitation Only", "Curated Luxury", "Founding Members Welcome"].map((badge) => (
              <li key={badge} className="flex items-center gap-3">
                <span className="text-[#C6943B] text-xs" aria-hidden="true">◆</span>
                <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-[#C6943B] font-bold">
                  {badge}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HostRegistrationModal
        isOpen={isHostModalOpen}
        onClose={() => setIsHostModalOpen(false)}
      />
      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
      />
    </>
  );
}
