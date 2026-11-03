"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TravelerWaitlistForm from "@/components/TravelerWaitlistForm";
import { Sparkles, Compass, Shield, Key } from "lucide-react";

export default function ForTravellersPage() {
  const perks = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#D7AE63]" />,
      title: "Viveniq AI Discovery",
      desc: "Our proprietary engine maps your aesthetic tastes and mood to handpicked escapes across Maharashtra.",
    },
    {
      icon: <Key className="w-5 h-5 text-[#D7AE63]" />,
      title: "Unlisted Collections",
      desc: "Unlock access to private vineyard estates, off-grid villas, and chef tables not available on public directories.",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#D7AE63]" />,
      title: "Tailored Itineraries",
      desc: "Stays, dining, and scenic routes curated harmoniously around the way you actually want to travel.",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#D7AE63]" />,
      title: "Founding Member Status",
      desc: "Lifetime priority reservations, personalized concierge assistance, and private event invitations.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080806] text-[#FAF8F5]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 border-b border-white/[0.06] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-[#8A857D]" />
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#A6A196] uppercase font-semibold">
              FOR DISCERNING TRAVELLERS
            </span>
            <span className="w-8 h-[1px] bg-[#8A857D]" />
          </div>

          <h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            Curated Experiences, <br />
            <span className="text-[#C5B499] italic">Just For You</span>
          </h1>

          <p className="text-sm sm:text-base font-sans font-light text-[#A8A398] max-w-2xl leading-relaxed mb-16">
            We understand that true luxury isn&apos;t about generic volume, but about soul, intimacy, and hyper-personalization. La Vivenzia brings together Maharashtra&apos;s most exceptional hideaways.
          </p>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left mb-20">
            {perks.map((p) => (
              <div 
                key={p.title}
                className="bg-[#100F0C] border border-white/[0.08] hover:border-[#D7AE63]/40 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[#181612] border border-[#2D281F] flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 
                  className="text-xl font-normal text-[#FAF8F5] mb-2 tracking-wide"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  {p.title}
                </h3>
                <p className="text-xs font-sans font-light text-[#9E988D] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="w-full max-w-xl mx-auto">
            <TravelerWaitlistForm />
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
