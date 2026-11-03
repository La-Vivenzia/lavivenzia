import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | La Vivenzia",
  description: "Privacy Policy for La Vivenzia Pre-Launch Platform",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#080806] text-[#FAF8F5]">
      <Header />
      
      <div className="pt-32 pb-24 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto bg-[#100F0C] border border-white/[0.08] p-8 sm:p-14 rounded-2xl shadow-2xl">
          
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#8A857D]" />
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#A6A196] uppercase font-semibold">
              LEGAL GOVERNANCE
            </span>
          </div>

          <h1 
            className="text-4xl sm:text-5xl font-normal text-[#FAF8F5] mb-2"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Privacy Policy
          </h1>
          <p className="text-xs tracking-widest text-[#D7AE63] uppercase font-mono mb-10">Last updated: July 2026</p>

          <div className="space-y-8 font-sans font-light leading-relaxed text-sm sm:text-base text-[#A8A398]">
            <p>
              At La Vivenzia, accessible from our launch portal, one of our main priorities is the privacy of our visitors, discerning guests, and host applicants. This Privacy Policy document outlines the types of information collected and how it is protected.
            </p>
            <p>
              If you have additional questions or require more information regarding our privacy practices, do not hesitate to contact us at <a href="mailto:contact@lavivenzia.com" className="text-[#D7AE63] hover:underline">contact@lavivenzia.com</a>.
            </p>

            <section>
              <h2 
                className="text-2xl font-normal text-[#FAF8F5] mb-4 mt-8"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                1. Information We Collect
              </h2>
              <p className="mb-4">
                When you submit a Founding Host application or join our traveler waitlist, we collect the personal information you provide to us, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#D5D0C6]">
                <li><strong className="text-[#D7AE63] font-normal">Contact details:</strong> Name, Email address, Phone number.</li>
                <li><strong className="text-[#D7AE63] font-normal">Business & Property details:</strong> Business Name, Category, Location, Social Profiles, Years of Operation, Price Range, and Property description.</li>
                <li><strong className="text-[#D7AE63] font-normal">Representation assets:</strong> High-resolution photography representing your stay or experience.</li>
                <li><strong className="text-[#D7AE63] font-normal">Submission metadata:</strong> IP verification and timestamps to prevent fraudulent registrations.</li>
              </ul>
            </section>

            <section>
              <h2 
                className="text-2xl font-normal text-[#FAF8F5] mb-4 mt-8"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                2. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the information we collect strictly to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#D5D0C6]">
                <li>Provide, operate, and maintain our pre-launch curation engine.</li>
                <li>Assess and curate Founding Host applications with bespoke attention.</li>
                <li>Issue VIP Traveler invitations as cohort openings become available.</li>
                <li>Dispatch transactional confirmation emails via our secure SMTP infrastructure.</li>
                <li>Prevent spam, bots, and illegitimate access requests.</li>
              </ul>
            </section>

            <section>
              <h2 
                className="text-2xl font-normal text-[#FAF8F5] mb-4 mt-8"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                3. Storage and Protection
              </h2>
              <p>
                Your data is held securely in encrypted database instances managed via Supabase. Image uploads are safeguarded in authenticated storage buckets. We retain this data solely to service curation reviews and membership invitations.
              </p>
            </section>
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
