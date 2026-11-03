import { Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#080806] pt-20 pb-12 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center gap-10 mb-14 text-center">
          
          {/* Official Tight Logo */}
          <Link href="/" className="flex flex-col items-center gap-3 group">
            <Image
              src="/logo_official_tight.png"
              alt="La Vivenzia"
              width={280}
              height={56}
              className="h-10 sm:h-11 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90 drop-shadow-[0_2px_16px_rgba(198,148,59,0.25)]"
            />
          </Link>
          
          {/* Navigation Links — 100% Live Site */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <Link href="/about-us" className="text-[#A6A196] text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:text-[#D7AE63] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-[#A6A196] text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:text-[#D7AE63] transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-[#A6A196] text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:text-[#D7AE63] transition-colors">
              Privacy Policy
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/lavivenzia/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#B5B0A6] hover:text-white hover:border-[#D7AE63] hover:bg-white/5 transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://www.linkedin.com/search/results/all/?keywords=La%20Vivenzia&origin=RICH_QUERY_TYPEAHEAD_HISTORY&heroEntityKey=urn%3Ali%3Aorganization%3A133385725&position=0" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#B5B0A6] hover:text-white hover:border-[#D7AE63] hover:bg-white/5 transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a 
              href="mailto:contact@lavivenzia.com" 
              aria-label="Email" 
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#B5B0A6] hover:text-white hover:border-[#D7AE63] hover:bg-white/5 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="border-t border-white/[0.06] pt-8 text-center text-xs text-[#7A756D] font-light tracking-wider font-sans">
          © {new Date().getFullYear()} La Vivenzia. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
