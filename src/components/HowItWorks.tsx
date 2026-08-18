import { ClipboardList, Search, Mail, Rocket } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    step: "STEP 01",
    title: "Apply",
    description: "Tell us about your business, experience or event.",
    icon: <ClipboardList className="w-6 h-6 text-[var(--color-gold-primary)]" strokeWidth={1.5} />,
  },
  {
    step: "STEP 02",
    title: "Review",
    description: "Our team reviews your application carefully.",
    icon: <Search className="w-6 h-6 text-[var(--color-gold-primary)]" strokeWidth={1.5} />,
  },
  {
    step: "STEP 03",
    title: "Early Access",
    description: "Selected hosts get priority onboarding & support.",
    icon: <Mail className="w-6 h-6 text-[var(--color-gold-primary)]" strokeWidth={1.5} />,
  },
  {
    step: "STEP 04",
    title: "Launch Together",
    description: "Go live with us when La Vivenzia officially launches.",
    icon: <Rocket className="w-6 h-6 text-[var(--color-gold-primary)]" strokeWidth={1.5} />,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[var(--color-background)] py-16 sm:py-20 lg:py-24 border-b border-[var(--color-border-subtle)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
        
        {/* Left: Architectural Image */}
        <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none border border-[var(--color-border-subtle)] p-2 rounded-sm">
          <div className="relative w-full h-full overflow-hidden">
            <Image 
              src="/how-it-works-new.jpg"
              alt="La Vivenzia Partner Application"
              fill
              className="object-cover transition-transform duration-[2s] hover:scale-105"
            />
            {/* Moody warm overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#080806]/60 via-[#100E0A]/20 to-transparent" />
            <div className="absolute inset-0 mix-blend-color bg-[var(--color-gold-muted)] opacity-20" />
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <div className="mb-10 sm:mb-12 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4 opacity-70">
              <div className="w-12 h-[1px] bg-[var(--color-gold-muted)]" />
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="var(--color-gold-primary)"/>
              </svg>
              <div className="w-12 h-[1px] bg-[var(--color-gold-muted)]" />
            </div>
            <p className="text-[var(--color-gold-primary)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3 font-sans">
              HOW IT WORKS
            </p>
            <h2 className="font-serif font-medium text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ivory)] leading-tight uppercase">
              Simple Steps <br />
              <span className="text-gradient-gold">To Get Started</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8 max-w-md mx-auto lg:mx-0">
            {steps.map((item, idx) => (
              <div key={idx} className="flex flex-row items-start sm:items-center gap-5 sm:gap-6">
                <div className="w-14 sm:w-16 h-14 sm:h-16 shrink-0 rounded-full border border-[var(--color-border-gold)] flex items-center justify-center bg-[var(--color-surface-warm)] relative z-10 shadow-md">
                  {item.icon}
                </div>

                <div className="flex flex-col">
                  <p className="text-[var(--color-gold-primary)] text-xs tracking-[0.25em] uppercase font-semibold mb-1 font-sans">
                    {item.step}
                  </p>
                  <h3 className="text-[var(--color-ivory)] font-serif text-lg sm:text-xl lg:text-2xl mb-1 uppercase font-medium">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-body-text)] text-xs sm:text-sm md:text-base font-light leading-relaxed font-sans max-w-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
