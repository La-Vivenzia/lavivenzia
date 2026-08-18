import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#080806] text-[#fcfbf9]">
      <Header />
      <div className="pt-20">
        <About />
      </div>

      <section className="bg-[#080806] py-16 sm:py-24 border-b border-[var(--color-border-subtle)] text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-[#C6943B] mb-4">
            LEADERSHIP
          </div>
          <h2 className="font-serif font-normal text-3xl sm:text-4xl text-[#E2BA5F] mb-12">Meet the Team</h2>
          
          <div className="flex flex-col gap-20 md:gap-32 max-w-6xl mx-auto mt-16">
            {/* Tejas */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center group">
              <div className="md:col-span-5 relative w-full aspect-[4/5] overflow-hidden rounded-sm border border-[var(--color-border-gold)]/30">
                <Image src="/tejasnatani.png" alt="Tejas Natani" fill className="object-cover object-[70%_center] md:group-hover:scale-105 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080806] via-transparent to-transparent opacity-50" />
              </div>
              <div className="md:col-span-7 flex flex-col text-left">
                <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C6943B] mb-2">Founder & Director</p>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#fcfbf9] mb-6">Tejas Natani</h3>
                <div className="w-12 h-[1px] bg-[#C6943B]/50 mb-6" />
                <div className="text-[#fcfbf9] text-base sm:text-lg font-light leading-relaxed space-y-5 font-sans opacity-90">
                  <p>
                    Driven by a vision to redefine how people discover and experience travel. Passionate about innovation, he brings expertise in operations, process optimization, and project management, combining strategic thinking with flawless execution.
                  </p>
                  <p>
                    The idea for La Vivenzia was born during his travels across multiple countries, where he recognized that extraordinary experiences often remained difficult to discover and fragmented to access. Inspired to bridge this gap, he envisioned a premium ecosystem that seamlessly connects discerning travelers with thoughtfully curated experiences, exceptional stays, and unforgettable journeys. 
                  </p>
                  <p>
                    Today, he leads La Vivenzia&apos;s mission to transform travel from endless searching into effortless discovery, where every journey is designed to create lasting memories.
                  </p>
                </div>
              </div>
            </div>

            {/* Deepa */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center group">
              <div className="md:col-span-7 flex flex-col text-left md:text-right order-2 md:order-1">
                <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C6943B] mb-2">Director & CXO</p>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#fcfbf9] mb-6">Deepa Khandelwal</h3>
                <div className="w-12 h-[1px] bg-[#C6943B]/50 mb-6 md:ml-auto" />
                <div className="text-[#fcfbf9] text-base sm:text-lg font-light leading-relaxed space-y-5 font-sans opacity-90">
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
              <div className="md:col-span-5 relative w-full aspect-[4/5] overflow-hidden rounded-sm border border-[var(--color-border-gold)]/30 order-1 md:order-2">
                <Image src="/deepakhandewal.jpg" alt="Deepa Khandelwal" fill className="object-cover md:group-hover:scale-105 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080806] via-transparent to-transparent opacity-50" />
              </div>
            </div>

            {/* Karan */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center group">
              <div className="md:col-span-5 relative w-full aspect-[4/5] overflow-hidden rounded-sm border border-[var(--color-border-gold)]/30">
                <Image src="/karanpatil.PNG" alt="Karan Patil" fill className="object-cover object-[center_10%] md:group-hover:scale-105 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080806] via-transparent to-transparent opacity-50" />
              </div>
              <div className="md:col-span-7 flex flex-col text-left">
                <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C6943B] mb-2">Core Team</p>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#fcfbf9] mb-6">Karan Patil</h3>
                <div className="w-12 h-[1px] bg-[#C6943B]/50 mb-6" />
                <div className="text-[#fcfbf9] text-base sm:text-lg font-light leading-relaxed space-y-5 font-sans opacity-90">
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
