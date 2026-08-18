export default function TopBanner() {
  return (
    <div className="w-full bg-[#11110f] border-b border-[var(--color-border-subtle)] text-[#C6943B] overflow-hidden py-2 z-50 relative flex">
      <div className="flex whitespace-nowrap animate-marquee text-[10px] sm:text-[11px] font-sans tracking-[0.2em] font-semibold uppercase">
        <span className="mx-4">
          ✦ DISCOVER THE EXTRAORDINARY ESCAPES ✦ CURATED EXPERIENCES ✦ AI POWERED ✦ LAUNCHING SOON ✦ JOIN THE WAITLIST FOR EARLY ACCESS
        </span>
        <span className="mx-4">
          ✦ DISCOVER THE EXTRAORDINARY ESCAPES ✦ CURATED EXPERIENCES ✦ AI POWERED ✦ LAUNCHING SOON ✦ JOIN THE WAITLIST FOR EARLY ACCESS
        </span>
        <span className="mx-4">
          ✦ DISCOVER THE EXTRAORDINARY ESCAPES ✦ CURATED EXPERIENCES ✦ AI POWERED ✦ LAUNCHING SOON ✦ JOIN THE WAITLIST FOR EARLY ACCESS
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
