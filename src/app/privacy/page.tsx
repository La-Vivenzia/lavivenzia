import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | La Vivenzia",
  description: "Privacy Policy for La Vivenzia",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#080806] text-[var(--color-body-text)]">
      <Header />
      
      <div className="pt-32 pb-20 container mx-auto px-6 sm:px-10 lg:px-20">
        <div className="max-w-3xl mx-auto bg-[#11110f] border border-[var(--color-border-subtle)] p-8 sm:p-12 rounded-sm shadow-2xl">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#E2BA5F] mb-2">Privacy Policy</h1>
          <p className="text-xs tracking-widest text-[#C6943B] uppercase font-sans mb-10">Last updated: July 5, 2026</p>

          <div className="space-y-8 font-sans font-light leading-relaxed text-sm sm:text-base">
            <p>
              At La Vivenzia, accessible from our Coming Soon launch portal, one of our main priorities is the privacy of our visitors and host applicants. This Privacy Policy document contains types of information that is collected and recorded by La Vivenzia and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#E2BA5F] mb-4 mt-8">1. Information We Collect</h2>
              <p className="mb-4">
                When you submit a Founding Host application or join our traveler waitlist, we collect the personal information you provide to us, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[var(--color-ivory)]">
                <li><strong className="text-[#C6943B] font-normal">Contact details:</strong> Name, Email address, Phone number.</li>
                <li><strong className="text-[#C6943B] font-normal">Business details:</strong> Business Name, Category, Location/City, Website URL, Instagram handle, Years in Business, Price Range, and Short description.</li>
                <li><strong className="text-[#C6943B] font-normal">Representation details:</strong> Image uploads representing your business/experience.</li>
                <li><strong className="text-[#C6943B] font-normal">Consent details and submission metadata</strong> (such as IP address and timestamp) for spam protection.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#E2BA5F] mb-4 mt-8">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[var(--color-ivory)]">
                <li>Provide, operate, and maintain our Coming Soon website.</li>
                <li>Assess and moderate Founding Host applications.</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the launch.</li>
                <li>Send you notification emails (such as application confirmations).</li>
                <li>Detect and prevent spam and fraudulent form submissions.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#E2BA5F] mb-4 mt-8">3. Storage and Protection</h2>
              <p>
                Your data is stored securely in our database instances managed via Supabase. Image uploads are held in secure Supabase Storage buckets. We retain this data only as long as necessary to process host curation or waitlist communications.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#E2BA5F] mb-4 mt-8">4. Third-Party Services</h2>
              <p className="mb-4">
                We share your contact information with select third-party service providers to deliver transactional alerts:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[var(--color-ivory)]">
                <li><strong className="text-[#C6943B] font-normal">Brevo:</strong> Used as our SMTP server to deliver application received receipts and admin lead notifications.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl sm:text-2xl text-[#E2BA5F] mb-4 mt-8">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, you can contact us at <a href="mailto:tejas.natani@lavivenzia.com" className="text-[#C6943B] hover:text-[#E2BA5F] underline underline-offset-4">tejas.natani@lavivenzia.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
