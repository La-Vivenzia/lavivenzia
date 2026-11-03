"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

// Once-per-session flag. The inline script in app/layout.tsx reads the same key
// and sets `data-lv-welcomed` on <html> before first paint, so returning
// visitors never see a flash of the overlay.
const STORAGE_KEY = "lv_welcomed";

// Choreography (ms). Full motion runs ~2.7s end-to-end; reduced motion ~1.2s.
const HOLD_MS = 2000;
const EXIT_MS = 700;
const REDUCED_HOLD_MS = 800;
const REDUCED_EXIT_MS = 400;

type Phase = "intro" | "exit" | "done";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mql = window.matchMedia(REDUCED_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_QUERY).matches;
const getServerReducedMotion = () => false;

export default function WelcomeAnimation() {
  const [phase, setPhase] = useState<Phase>("intro");
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback((exitMs: number) => {
    setPhase((p) => (p === "intro" ? "exit" : p));
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage can be unavailable (private mode / blocked); just play again next time.
    }
    if (exitTimer.current) return;
    exitTimer.current = setTimeout(() => setPhase("done"), exitMs);
  }, []);

  useEffect(() => {
    let welcomed = false;
    try {
      welcomed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (welcomed) {
      // Already hidden by the pre-paint CSS flag; just unmount.
      const t = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(t);
    }

    const reduced = getReducedMotion();
    const exitMs = reduced ? REDUCED_EXIT_MS : EXIT_MS;

    // Lock scroll while the curtain is down so the reveal lands on the Hero.
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const holdTimer = setTimeout(() => dismiss(exitMs), reduced ? REDUCED_HOLD_MS : HOLD_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") dismiss(exitMs);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(holdTimer);
      if (exitTimer.current) clearTimeout(exitTimer.current);
      exitTimer.current = null;
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [dismiss]);

  useEffect(() => {
    if (phase === "done") document.documentElement.style.overflow = "";
  }, [phase]);

  if (phase === "done") return null;

  const exiting = phase === "exit";
  const exitMs = reducedMotion ? REDUCED_EXIT_MS : EXIT_MS;

  return (
    <div
      className="lv-welcome fixed inset-0 z-[200] overflow-hidden bg-[#080806]"
      style={{
        transitionProperty: "transform, opacity",
        transitionDuration: `${exitMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transform: exiting && !reducedMotion ? "translate3d(0,-100%,0)" : "translate3d(0,0,0)",
        opacity: exiting && reducedMotion ? 0 : 1,
        pointerEvents: exiting ? "none" : "auto",
      }}
      role="dialog"
      aria-label="Welcome to La Vivenzia"
    >
      <style>{`
        html[data-lv-welcomed] .lv-welcome { display: none; }

        @keyframes lv-glow   { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes lv-logo   { from { opacity: 0; transform: scale(0.96); filter: blur(6px); } to { opacity: 1; transform: scale(1); filter: blur(0); } }
        @keyframes lv-sheen  { from { transform: translateX(-120%); } to { transform: translateX(120%); } }
        @keyframes lv-rule   { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes lv-rise   { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes lv-fade   { from { opacity: 0; } to { opacity: 1; } }

        .lv-ease { animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); animation-fill-mode: both; }
        .lv-glow  { animation: lv-glow 1.6s 0s; }
        .lv-logo  { animation: lv-logo 0.95s 0.1s; }
        .lv-sheen { animation: lv-sheen 1.1s 0.65s cubic-bezier(0.65, 0, 0.35, 1) both; }
        .lv-rule  { animation: lv-rule 0.8s 0.7s; }
        .lv-sub   { animation: lv-rise 0.8s 0.9s; }
        .lv-badge { animation: lv-rise 0.8s 1.1s; }
        .lv-skip  { animation: lv-fade 0.6s 0.4s; }

        @media (prefers-reduced-motion: reduce) {
          .lv-glow, .lv-logo, .lv-rule, .lv-sub, .lv-badge, .lv-skip { animation: lv-fade 0.4s both; }
          .lv-sheen { display: none; }
        }
      `}</style>

      {/* Ambient golden luminescence */}
      <div
        aria-hidden
        className="lv-glow lv-ease pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle at center, rgba(215,174,99,0.16) 0%, rgba(198,148,59,0.06) 32%, rgba(8,8,6,0) 62%)",
        }}
      />
      {/* Hairline vignette for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />

      {/* Skip / Enter */}
      <button
        type="button"
        onClick={() => dismiss(exitMs)}
        className="lv-skip lv-ease absolute right-5 top-5 sm:right-8 sm:top-7 z-10 font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#A8A296] transition-colors duration-300 hover:text-[#F8E7A9] focus-visible:text-[#F8E7A9] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#D7AE63]/60"
        aria-label="Enter site (skip intro)"
      >
        [ Enter <span className="text-[#D7AE63]/70">Esc</span> ]
      </button>

      {/* Stage */}
      <div
        className="lv-stage relative flex h-full w-full flex-col items-center justify-center px-6"
        style={{
          transition: `opacity ${exitMs * 0.6}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${exitMs}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          opacity: exiting ? 0 : 1,
          transform: exiting && !reducedMotion ? "translateY(-16px)" : "none",
        }}
      >
        {/* Logo + masked gold shimmer */}
        <div className="lv-logo lv-ease relative w-[230px] sm:w-[320px] md:w-[380px]">
          <Image
            src="/logo_official_tight.png"
            alt="La Vivenzia"
            width={594}
            height={119}
            className="h-auto w-full select-none"
            draggable={false}
            preload
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              WebkitMaskImage: "url(/logo_official_tight.png)",
              maskImage: "url(/logo_official_tight.png)",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            <div
              className="lv-sheen absolute inset-y-0 -inset-x-1/4"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,246,214,0.0) 40%, rgba(255,246,214,0.85) 50%, rgba(255,246,214,0.0) 60%, transparent 65%)",
              }}
            />
          </div>
        </div>

        {/* Hairline gold divider */}
        <div
          aria-hidden
          className="lv-rule lv-ease mt-8 sm:mt-10 h-px w-40 sm:w-56 origin-center"
          style={{
            background: "linear-gradient(90deg, rgba(215,174,99,0) 0%, rgba(215,174,99,0.9) 50%, rgba(215,174,99,0) 100%)",
          }}
        />

        <p
          className="lv-sub lv-ease mt-6 sm:mt-7 text-center text-lg sm:text-2xl italic font-light tracking-[0.02em] text-[#F5F2EB]/90"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Curating Maharashtra&rsquo;s Rare Escapes
        </p>

        <p className="lv-badge lv-ease mt-5 sm:mt-6 text-center font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.38em] text-[#D7AE63]/80">
          · By Invitation Only · Founding Cohort 2026 ·
        </p>
      </div>
    </div>
  );
}
