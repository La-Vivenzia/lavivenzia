import { Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[var(--color-background)] pt-14 sm:pt-20 pb-10 border-t border-[var(--color-border-subtle)]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-10 mb-12 sm:mb-16 text-center">
          
          {/* Logo */}
          <Link href="/" className="inline-block">
            <Image 
              src="/lavivenzia_icon_clean.png" 
              alt="La Vivenzia" 
              width={350} 
              height={120} 
              className="h-[100px] sm:h-[130px] w-auto object-contain"
              style={{ mixBlendMode: "screen" }}
              unoptimized
            />
          </Link>
          
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <Link href="/about-us" className="text-[var(--color-body-text)] text-xs sm:text-sm font-sans tracking-[0.2em] uppercase font-semibold hover:text-[var(--color-gold-primary)] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-[var(--color-body-text)] text-xs sm:text-sm font-sans tracking-[0.2em] uppercase font-semibold hover:text-[var(--color-gold-primary)] transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-[var(--color-body-text)] text-xs sm:text-sm font-sans tracking-[0.2em] uppercase font-semibold hover:text-[var(--color-gold-primary)] transition-colors">
              Privacy Policy
            </Link>
          </div>

          {/* Social */}
          <div className="flex gap-5">
            <a href="https://www.instagram.com/lavivenzia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-[var(--color-border-gold)] flex items-center justify-center text-[var(--color-gold-primary)] hover:bg-[var(--color-gold-primary)] hover:text-[var(--color-background)] transition-colors">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/search/results/all/?keywords=La%20Vivenzia&origin=RICH_QUERY_TYPEAHEAD_HISTORY&heroEntityKey=urn%3Ali%3Aorganization%3A133385725&position=0" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-[var(--color-border-gold)] flex items-center justify-center text-[var(--color-gold-primary)] hover:bg-[var(--color-gold-primary)] hover:text-[var(--color-background)] transition-colors">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a href="mailto:contact@lavivenzia.com" aria-label="Email" className="w-10 h-10 rounded-full border border-[var(--color-border-gold)] flex items-center justify-center text-[var(--color-gold-primary)] hover:bg-[var(--color-gold-primary)] hover:text-[var(--color-background)] transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="border-t border-[var(--color-border-subtle)] pt-8 text-center text-xs sm:text-sm text-[var(--color-muted-text)] font-light tracking-wider font-sans">
          © {new Date().getFullYear()} La Vivenzia. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
