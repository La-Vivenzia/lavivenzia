"use client";

import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#080806] text-[#FAF8F5]">
      <Header />
      
      <div className="pt-24">
        <About />
      </div>

      <section className="bg-[#0A0907] py-24 border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#8A857D]" />
              <span className="text-[11px] font-sans tracking-[0.25em] text-[#A6A196] uppercase font-semibold">
                LEADERSHIP & VISION
              </span>
              <span className="w-8 h-[1px] bg-[#8A857D]" />
            </div>
            <h2 
              className="text-4xl sm:text-5xl font-normal text-[#FAF8F5] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              The Minds Behind <br />
              <span className="text-[#C5B499] italic">La Vivenzia</span>
            </h2>
          </div>

          <div className="flex flex-col gap-24 max-w-5xl mx-auto">
            
            {/* Tejas Natani */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center bg-[#100F0C] border border-white/[0.08] rounded-2xl p-6 sm:p-10 shadow-2xl">
              <div className="md:col-span-5 relative w-full aspect-[4/5] overflow-hidden rounded-xl border border-white/[0.1]">
                <Image 
                  src="/tejasnatani.png" 
                  alt="Tejas Natani" 
                  fill 
                  className="object-cover object-[70%_center] transition-transform duration-700 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100F0C]/80 via-transparent to-transparent" />
              </div>
              <div className="md:col-span-7 flex flex-col text-left">
                <span className="text-[10px] font-sans font-bold tracking-[0.22em] text-[#D7AE63] uppercase mb-2 block">
                  FOUNDER & DIRECTOR
                </span>
                <h3 
                  className="text-3xl sm:text-4xl font-normal text-[#FAF8F5] mb-4"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Tejas Natani
                </h3>
                <div className="w-12 h-[1px] bg-[#D7AE63]/60 mb-6" />
                <div className="text-[#A8A398] text-sm leading-relaxed space-y-4 font-sans font-light">
                  <p>
                    Driven by a vision to redefine how people discover and experience travel. Passionate about innovation, he brings expertise in operations, process optimization, and project management, combining strategic thinking with flawless execution.
                  </p>
                  <p>
                    The idea for La Vivenzia was born during his travels across multiple countries, where he recognized that extraordinary experiences often remained difficult to discover and fragmented to access. Inspired to bridge this gap, he envisioned a premium ecosystem that seamlessly connects discerning travelers with thoughtfully curated experiences, exceptional stays, and unforgettable journeys.
                  </p>
                  <p>
                    Today, he leads La Vivenzia&apos;s mission to transform travel from endless searching into effortless discovery.
                  </p>
                </div>
              </div>
            </div>

            {/* Deepa Khandelwal */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center bg-[#100F0C] border border-white/[0.08] rounded-2xl p-6 sm:p-10 shadow-2xl">
              <div className="md:col-span-7 flex flex-col text-left order-2 md:order-1">
                <span className="text-[10px] font-sans font-bold tracking-[0.22em] text-[#D7AE63] uppercase mb-2 block">
                  DIRECTOR & CXO
                </span>
                <h3 
                  className="text-3xl sm:text-4xl font-normal text-[#FAF8F5] mb-4"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Deepa Khandelwal
                </h3>
                <div className="w-12 h-[1px] bg-[#D7AE63]/60 mb-6" />
                <div className="text-[#A8A398] text-sm leading-relaxed space-y-4 font-sans font-light">
                  <p>
                    Leading the design and execution of exceptional experiences that blend creativity with flawless execution. With extensive expertise in corporate events, community festivals, and luxury gatherings, she specializes in transforming complex ideas into seamless, memorable experiences.
                  </p>
                  <p>
                    Having successfully led large-scale events such as Skyfest 2026, Deepa combines strategic planning, operational excellence, and a passion for hospitality to deliver experiences that leave a lasting impression.
                  </p>
                  <p>
                    Inspired by her love for travel and storytelling, she brings a global perspective to every event, ensuring each one reflects La Vivenzia&apos;s commitment to thoughtful, world-class experiences.
                  </p>
                </div>
              </div>
              <div className="md:col-span-5 relative w-full aspect-[4/5] overflow-hidden rounded-xl border border-white/[0.1] order-1 md:order-2">
                <Image 
                  src="/deepakhandewal.jpg" 
                  alt="Deepa Khandelwal" 
                  fill 
                  className="object-cover transition-transform duration-700 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100F0C]/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* Karan Patil */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center bg-[#100F0C] border border-white/[0.08] rounded-2xl p-6 sm:p-10 shadow-2xl">
              <div className="md:col-span-5 relative w-full aspect-[4/5] overflow-hidden rounded-xl border border-white/[0.1]">
                <Image 
                  src="/karanpatil.PNG" 
                  alt="Karan Patil" 
                  fill 
                  className="object-cover object-[center_10%] transition-transform duration-700 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100F0C]/80 via-transparent to-transparent" />
              </div>
              <div className="md:col-span-7 flex flex-col text-left">
                <span className="text-[10px] font-sans font-bold tracking-[0.22em] text-[#D7AE63] uppercase mb-2 block">
                  TECHNICAL LEAD & CORE TEAM
                </span>
                <h3 
                  className="text-3xl sm:text-4xl font-normal text-[#FAF8F5] mb-4"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Karan Patil
                </h3>
                <div className="w-12 h-[1px] bg-[#D7AE63]/60 mb-6" />
                <div className="text-[#A8A398] text-sm leading-relaxed space-y-4 font-sans font-light">
                  <p>
                    Driven by a passion for technology, innovation, and intelligent systems, Karan specializes in building AI-powered solutions that simplify complex business challenges and create meaningful digital experiences. With expertise spanning software development, automation, and modern AI technologies, he focuses on transforming ideas into scalable, practical solutions.
                  </p>
                  <p>
                    Combining a strong technical foundation with an entrepreneurial mindset, Karan has worked across web applications, AI integrations, business automation, and digital infrastructure, delivering solutions designed for efficiency, reliability, and long-term impact.
                  </p>
                  <p>
                    Inspired by emerging technologies and continuous learning, he approaches every project with a commitment to innovation, thoughtful execution, and creating products that solve real-world problems while delivering exceptional user experiences.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
      
      <Footer />
    </main>
  );
}
