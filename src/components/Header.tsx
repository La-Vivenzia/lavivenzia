"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import WaitlistModal from "./WaitlistModal";
import HostRegistrationModal from "./HostRegistrationModal";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);

  const navLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "For Travellers", href: "/for-travellers" },
    { name: "For Host", href: "/for-host" },
    { name: "Contact", href: "/contact" },
  ];

  // While the drawer is open: lock page scroll, close on Escape, and close
  // automatically if the viewport grows into the desktop (lg) layout.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const close = () => setMobileMenuOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) close();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <header className="w-full bg-[#080806]/90 backdrop-blur-md border-b border-white/[0.06] h-20 transition-all duration-300">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center justify-between lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-6">
            
            {/* Logo — Official Tight Wordmark */}
            <Link href="/" className="flex items-center shrink-0 mr-6 z-50 group py-1">
              <Image
                src="/logo_official_tight.png"
                alt="La Vivenzia"
                width={240}
                height={48}
                priority
                className="h-8 sm:h-9 lg:h-8 xl:h-9 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90 drop-shadow-[0_2px_12px_rgba(198,148,59,0.2)]"
              />
            </Link>

            {/* Desktop Navigation Links — 100% Live Site Links */}
            <nav className="hidden lg:flex items-center justify-center min-w-0 gap-5 xl:gap-10 text-[11px] xl:text-xs font-medium tracking-[0.16em] xl:tracking-[0.2em] text-[#C5C0B6] uppercase font-sans">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-[#FAF8F5] transition-colors whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs — 100% Live Site CTAs in Luxury Buttons */}
            {/* lg: Join Waitlist only · xl: both, short labels · 1400px+: full live labels */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setIsHostModalOpen(true)} 
                className="hidden xl:inline-flex whitespace-nowrap px-5 py-2.5 rounded-full border border-[#524B3E] hover:border-[#D7AE63] bg-black/40 hover:bg-black/70 text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase font-sans transition-all duration-300 shadow-sm"
              >
                <span className="min-[1400px]:hidden">Become a Host</span>
                <span className="hidden min-[1400px]:inline">Become a Founding Host</span>
              </button>

              <button 
                onClick={() => setIsWaitlistModalOpen(true)} 
                className="whitespace-nowrap px-5 py-2.5 rounded-full bg-[#E4DCD1] hover:bg-white text-[#14120E] text-xs font-semibold tracking-wider uppercase font-sans transition-all duration-300 shadow-md hover:translate-y-[-1px]"
              >
                <span className="min-[1400px]:hidden">Join Waitlist</span>
                <span className="hidden min-[1400px]:inline">Join VIP Traveler Waitlist</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className="lg:hidden text-[#D7AE63] p-2 -mr-2 z-50 ml-auto shrink-0"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
              <div
                id="mobile-nav-drawer"
                className="fixed left-0 right-0 top-[80px] bg-[#080806]/98 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-between px-6 py-8 sm:px-8 border-b border-white/[0.06] anim-drawer-in h-[calc(100dvh-80px)] overflow-y-auto overscroll-contain"
              >
                <nav className="flex flex-col gap-6 text-center mt-6 font-sans">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium tracking-[0.2em] text-[#FAF8F5] uppercase hover:text-[#D7AE63] transition-colors py-3 border-b border-white/5"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-3.5 mt-8 pb-6 w-full max-w-md mx-auto">
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsHostModalOpen(true);
                    }}
                    className="w-full py-3.5 rounded-full border border-[#524B3E] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase font-sans text-center"
                  >
                    Become a Founding Host
                  </button>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsWaitlistModalOpen(true);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#E4DCD1] text-[#14120E] text-xs font-semibold tracking-wider uppercase font-sans text-center"
                  >
                    Join VIP Traveler Waitlist
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>

      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)} 
      />
      <HostRegistrationModal 
        isOpen={isHostModalOpen} 
        onClose={() => setIsHostModalOpen(false)} 
      />
    </>
  );
}
