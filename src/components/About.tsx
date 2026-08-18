import Image from "next/image";
import { MapPin } from "lucide-react";

export default function About() {
  return (
    <section className="bg-[#0d0d0d] py-16 sm:py-20 lg:py-24 border-b border-[var(--line-soft)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
        {/* Left Image */}
        <div className="relative w-full h-full min-h-[300px] lg:min-h-0 border border-[var(--line-soft)] p-2 rounded-sm">
          <div className="relative w-full h-full min-h-[280px] lg:min-h-0 overflow-hidden">
            <Image
              src="/about-journey.jpg"
              alt="About La Vivenzia"
              fill
              className="object-cover object-[75%_30%] transition-transform duration-[2s] hover:scale-105"
            />
            {/* Cinematic Amber Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0d0d0d]/80 via-[#161616]/40 to-transparent" />
            <div className="absolute inset-0 mix-blend-color bg-[var(--gold)] opacity-20" />
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col text-center lg:text-left">
          <div className="eyebrow mb-3">
            ABOUT LA VIVENZIA
          </div>
          <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#fcfbf9] mb-6 leading-tight">
            Experience Every Journey <br />
            <span className="ital font-normal">Through Its Soul.</span>
          </h2>
          <div className="space-y-5 text-[#cfc8bc] text-base sm:text-lg md:text-xl font-light leading-relaxed font-sans max-w-lg mx-auto lg:mx-0">
            <p>
              At La Vivenzia, we believe travel should move you. Born out of a passion for uncovering Maharashtra&apos;s best-kept secrets, our mission is to connect discerning travelers with stays and experiences that resonate on a deeper level.
            </p>
            <p>
              We bypass the generic and the crowded, carefully handpicking only the most extraordinary destinations. Our focus is on the feeling—the serenity, the adventure, the connection—ensuring every escape is truly unforgettable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
