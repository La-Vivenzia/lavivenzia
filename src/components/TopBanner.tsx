const MESSAGE =
  "✦ DISCOVER THE EXTRAORDINARY ESCAPES ✦ CURATED EXPERIENCES ✦ AI POWERED ✦ LAUNCHING SOON ✦ JOIN THE WAITLIST FOR EARLY ACCESS";

export default function TopBanner() {
  return (
    <div className="w-full bg-[#11110f] border-b border-[var(--color-border-subtle)] text-[#C6943B] overflow-hidden py-2 z-50 relative flex">
      <div className="flex whitespace-nowrap animate-marquee text-[10px] sm:text-[11px] font-sans tracking-[0.2em] font-semibold uppercase">
        <span className="mx-4">{MESSAGE}</span>
        {/* Duplicates exist only to make the scroll seamless — hidden from
            assistive tech so the message is announced once, not three times. */}
        <span className="mx-4" aria-hidden="true">
          {MESSAGE}
        </span>
        <span className="mx-4" aria-hidden="true">
          {MESSAGE}
        </span>
      </div>
    </div>
  );
}
