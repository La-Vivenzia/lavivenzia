"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import WaitlistModal from "./WaitlistModal";
import HostRegistrationModal from "./HostRegistrationModal";
import TopBanner from "./TopBanner";

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

  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <TopBanner />
        <header className="w-full bg-[#080806]/95 backdrop-blur-md border-b border-[var(--color-border-subtle)] h-16 transition-all">
          <div className="container px-4 sm:px-6 flex items-center justify-between h-full">
            {/* Logo — Full Wordmark */}
            <Link href="/" className="flex items-center shrink-0 z-50">
              <Image
                src="/lavivenzia_icon_clean.png"
                alt="La Vivenzia"
                width={200}
                height={60}
                className="h-[56px] w-auto object-contain"
                style={{ mixBlendMode: "screen" }}
                priority
                unoptimized
              />
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 xl:gap-16 text-xs font-medium tracking-widest text-[var(--color-body-text)] uppercase font-sans px-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="hover:text-[var(--color-ivory)] transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Primary — gold filled pill */}
            <button
              onClick={() => setIsHostModalOpen(true)}
              className="whitespace-nowrap relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #D4A843 0%, #C6943B 50%, #9A7030 100%)",
                color: "#080806",
                padding: "8px 18px",
                borderRadius: "4px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontFamily: "var(--font-sans)",
                boxShadow: "0 2px 12px rgba(198,148,59,0.3)",
                transition: "all 0.25s ease",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(198,148,59,0.5)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(198,148,59,0.3)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Become a Founding Host
            </button>

            {/* Secondary — outlined */}
            <button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="whitespace-nowrap"
              style={{
                background: "transparent",
                color: "#D4A843",
                padding: "7px 18px",
                borderRadius: "4px",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontFamily: "var(--font-sans)",
                border: "1px solid rgba(198,148,59,0.45)",
                transition: "all 0.25s ease",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "#800020";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#800020";
                (e.currentTarget as HTMLButtonElement).style.color = "#fcfbf9";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(128, 0, 32, 0.4)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(198,148,59,0.45)";
                (e.currentTarget as HTMLButtonElement).style.color = "#D4A843";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Join VIP Traveler Waitlist
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden text-[var(--color-gold-primary)] p-2 focus:outline-none z-50 ml-auto"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Navigation Overlay Drawer */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 top-[110px] bg-[#080806]/98 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-between p-8 border-b border-[var(--color-border-subtle)] animate-in fade-in slide-in-from-top-4 duration-300 h-[calc(100vh-110px)] overflow-y-auto">
              <nav className="flex flex-col gap-6 text-center mt-6 font-sans">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium tracking-[0.2em] text-[var(--color-ivory)] uppercase hover:text-[var(--color-gold-primary)] transition-colors py-3 border-b border-white/5"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-4 mt-8 pb-6">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsHostModalOpen(true);
                  }}
                  className="btn-gold-primary w-full"
                >
                  Become a Founding Host
                </button>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsWaitlistModalOpen(true);
                  }}
                  className="btn-waitlist w-full"
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
