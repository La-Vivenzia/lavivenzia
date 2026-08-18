import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForTravellersPage() {
  return (
    <main className="min-h-screen bg-[#080806] text-[#fcfbf9]">
      <Header />
      <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <div className="text-[10px] font-sans font-semibold tracking-[0.4em] uppercase text-[#C6943B] mb-4">
          FOR TRAVELLERS
        </div>
        <h1 className="font-serif font-normal text-4xl sm:text-5xl lg:text-6xl text-[#E2BA5F] mb-6 leading-tight drop-shadow-md">
          Curated Experiences<br />
          <span className="italic font-light">Just For You</span>
        </h1>
        <p className="text-[var(--color-body-text)] text-sm sm:text-base font-light leading-relaxed font-sans mb-10 max-w-2xl mx-auto">
          We understand that true luxury isn't about extravagance, but about meaning and personalization. La Vivenzia connects discerning travelers with Maharashtra's most exceptional stays and hidden gems, crafting journeys around how you want to feel. 
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left mt-8 w-full max-w-5xl">
          <div className="bg-[#11110f] border border-[var(--color-border-subtle)] p-8 rounded-sm hover:border-[#C6943B]/50 transition-colors">
            <h3 className="font-serif text-2xl text-[#fcfbf9] mb-4">AI-Powered Discovery</h3>
            <p className="text-sm font-light text-[var(--color-body-text)] leading-relaxed">
              Our VivenIQ engine understands your preferences to match you with stays and experiences that perfectly align with your mood and desires.
            </p>
          </div>
          <div className="bg-[#11110f] border border-[var(--color-border-subtle)] p-8 rounded-sm hover:border-[#C6943B]/50 transition-colors">
            <h3 className="font-serif text-2xl text-[#fcfbf9] mb-4">Exclusive Access</h3>
            <p className="text-sm font-light text-[var(--color-body-text)] leading-relaxed">
              Unlock access to unlisted properties, invite-only events, and unique tables that are not available on mainstream booking platforms.
            </p>
          </div>
          <div className="bg-[#11110f] border border-[var(--color-border-subtle)] p-8 rounded-sm hover:border-[#C6943B]/50 transition-colors">
            <h3 className="font-serif text-2xl text-[#fcfbf9] mb-4">Seamless Journeys</h3>
            <p className="text-sm font-light text-[var(--color-body-text)] leading-relaxed">
              From the moment you begin planning to the time you return home, every detail is thoughtfully managed to ensure a stress-free escape.
            </p>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
