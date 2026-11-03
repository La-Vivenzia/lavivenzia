"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { getErrorMessage } from "@/lib/errors";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Request failed');
      }

      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error submitting contact form:', getErrorMessage(error));
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#080806] py-20 lg:py-28 border-b border-white/[0.06] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#8A857D]" />
              <span className="text-[11px] font-sans tracking-[0.25em] text-[#A6A196] uppercase font-semibold">
                GET IN TOUCH
              </span>
            </div>

            <h1 
              className="text-4xl sm:text-5xl font-normal text-[#FAF8F5] mb-6 leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
            >
              Connect With <br />
              <span className="text-[#C5B499] italic">La Vivenzia</span>
            </h1>

            <p className="text-sm font-sans font-light text-[#A8A398] leading-relaxed mb-10">
              Whether you are an aspiring founding host, a brand looking to collaborate, or a guest with curated travel inquiries, we welcome your dialogue.
            </p>

            <div className="space-y-6 w-full">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#14120F] border border-[#2B271F] flex items-center justify-center text-[#D7AE63] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-sans tracking-widest uppercase text-[#7C776E]">Email Directly</span>
                  <a href="mailto:contact@lavivenzia.com" className="text-sm text-[#FAF8F5] hover:text-[#D7AE63] transition-colors font-sans">
                    contact@lavivenzia.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#14120F] border border-[#2B271F] flex items-center justify-center text-[#D7AE63] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-sans tracking-widest uppercase text-[#7C776E]">Headquarters</span>
                  <span className="text-sm text-[#FAF8F5] font-sans">
                    Maharashtra, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Form */}
          <div className="lg:col-span-7 bg-[#100F0C] border border-white/[0.08] p-8 sm:p-10 rounded-2xl shadow-2xl">
            <h3 
              className="text-2xl font-normal text-[#FAF8F5] mb-6"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Send an Enquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-sans tracking-wider uppercase text-[#C5C0B6] mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Karan Patil"
                  className="w-full px-4 py-3 rounded-xl bg-[#161411] border border-white/[0.08] text-sm text-[#FAF8F5] placeholder-[#6E6A62] focus:outline-none focus:border-[#D7AE63] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans tracking-wider uppercase text-[#C5C0B6] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="karan@lavivenzia.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#161411] border border-white/[0.08] text-sm text-[#FAF8F5] placeholder-[#6E6A62] focus:outline-none focus:border-[#D7AE63] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans tracking-wider uppercase text-[#C5C0B6] mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Founding Host Partnership / Media Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-[#161411] border border-white/[0.08] text-sm text-[#FAF8F5] placeholder-[#6E6A62] focus:outline-none focus:border-[#D7AE63] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans tracking-wider uppercase text-[#C5C0B6] mb-1.5">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Tell us about your property, inquiry, or partnership idea..."
                  className="w-full px-4 py-3 rounded-xl bg-[#161411] border border-white/[0.08] text-sm text-[#FAF8F5] placeholder-[#6E6A62] focus:outline-none focus:border-[#D7AE63] transition-colors resize-none"
                />
              </div>

              {submitStatus === 'success' && (
                <p className="text-xs text-[#D7AE63] font-sans">
                  ✓ Your message has been dispatched. Our team will respond promptly.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-xs text-red-400 font-sans">
                  Failed to send message. Please reach us directly at contact@lavivenzia.com.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-[#E4DCD1] hover:bg-white text-[#14120E] text-xs font-semibold tracking-wider uppercase font-sans transition-all duration-300 shadow-md hover:translate-y-[-1px]"
              >
                {isSubmitting ? "Dispatching..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
