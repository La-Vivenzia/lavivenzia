"use client";

import Image from "next/image";

export default function About() {
  return (
    <section className="bg-[#080806] py-20 lg:py-28 border-b border-white/[0.06] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Image */}
        <div className="lg:col-span-5 relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl">
          <Image
            src="/about-journey.jpg"
            alt="About La Vivenzia"
            fill
            className="object-cover object-[75%_30%] transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#D7AE63] uppercase block mb-1">
              OUR ETHOS
            </span>
            <p 
              className="text-xl text-[#FAF8F5] font-normal"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Beyond directories. Rooted in discovery.
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#8A857D]" />
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#A6A196] uppercase font-semibold">
              ABOUT LA VIVENZIA
            </span>
          </div>

          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF8F5] mb-6 leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            Experience Every Journey <br />
            <span className="text-[#C5B499] italic">Through Its Soul.</span>
          </h2>

          <div className="space-y-5 text-[#A8A398] text-sm sm:text-base font-light leading-relaxed font-sans max-w-xl">
            <p>
              At La Vivenzia, we believe travel should move you. Born out of a passion for uncovering Maharashtra&apos;s best-kept secrets, our mission is to connect discerning travelers with stays and experiences that resonate on a deeper level.
            </p>
            <p>
              We bypass the generic directories and over-commercialized listings. We carefully handpick only spaces that possess distinct architectural character, exceptional culinary devotion, and genuine human warmth.
            </p>
            <p className="text-[#D7AE63] italic font-serif text-lg pt-2">
              &ldquo;Less searching. More discovering. Designed around how you desire to feel.&rdquo;
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
