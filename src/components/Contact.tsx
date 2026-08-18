"use client";

import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
      const { error } = await supabase
        .from('contacts')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            subject: formData.subject, 
            message: formData.message 
          }
        ]);

      if (error) throw error;
      
      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#080806] py-16 sm:py-24 border-t border-[var(--color-border-subtle)] relative overflow-hidden">
      {/* Subtle gold glow behind form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(198,148,59,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Info */}
          <div className="flex flex-col text-center lg:text-left">
            <div className="text-[9px] font-sans font-semibold tracking-[0.4em] uppercase text-[#C6943B] mb-4">
              GET IN TOUCH
            </div>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#E2BA5F] mb-6 leading-tight drop-shadow-md">
              Contact Our Team
            </h2>
            <p className="text-[var(--color-body-text)] text-sm sm:text-base font-light leading-relaxed font-sans mb-10 max-w-lg mx-auto lg:mx-0">
              Whether you are a premium host looking to partner, a traveler with inquiries, or want to say hello, we are here. Fill out the form below and our team will get back to you shortly.
            </p>

            <div className="space-y-6 max-w-sm mx-auto lg:mx-0">
              <a href="mailto:contact@lavivenzia.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-[var(--color-border-gold)] flex items-center justify-center text-[#C6943B] group-hover:bg-[#C6943B] group-hover:text-[#080806] transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C6943B]">Email</p>
                  <p className="text-[var(--color-ivory)] font-light text-sm sm:text-base">contact@lavivenzia.com</p>
                </div>
              </a>
              
              <a href="tel:+917558360963" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-[var(--color-border-gold)] flex items-center justify-center text-[#C6943B] group-hover:bg-[#C6943B] group-hover:text-[#080806] transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C6943B]">Phone</p>
                  <p className="text-[var(--color-ivory)] font-light text-sm sm:text-base">+91 75583 60963</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#11110f] border border-[var(--color-border-subtle)] p-6 sm:p-8 rounded-sm shadow-2xl relative">
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1A1A18] border border-[var(--color-border-gold)] flex items-center justify-center text-[#C6943B] mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-serif text-[#E2BA5F]">Message Sent</h3>
                <p className="text-[var(--color-body-text)] text-sm font-light">Thank you for reaching out. Our team will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-6 text-[10px] font-sans tracking-[0.15em] uppercase text-[#C6943B] hover:text-[#E2BA5F] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-950/30 border border-red-900/50 rounded text-red-400 text-sm font-light text-center">
                    Something went wrong. Please try again.
                  </div>
                )}
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-[var(--color-body-text)] mb-2">
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#080806] border border-white/10 rounded-sm px-4 py-3 text-sm text-[var(--color-ivory)] font-light focus:outline-none focus:border-[#C6943B]/50 transition-colors"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-[var(--color-body-text)] mb-2">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#080806] border border-white/10 rounded-sm px-4 py-3 text-sm text-[var(--color-ivory)] font-light focus:outline-none focus:border-[#C6943B]/50 transition-colors"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-[var(--color-body-text)] mb-2">
                    Subject *
                  </label>
                  <input 
                    type="text" 
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-[#080806] border border-white/10 rounded-sm px-4 py-3 text-sm text-[var(--color-ivory)] font-light focus:outline-none focus:border-[#C6943B]/50 transition-colors"
                    placeholder="How can we help?"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-[var(--color-body-text)] mb-2">
                    Your Message *
                  </label>
                  <textarea 
                    required
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-[#080806] border border-white/10 rounded-sm px-4 py-3 text-sm text-[var(--color-ivory)] font-light focus:outline-none focus:border-[#C6943B]/50 transition-colors resize-none"
                    placeholder="Tell us about your inquiry..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #D4A843 0%, #C6943B 50%, #9A7030 100%)",
                    color: "#080806",
                    padding: "14px 24px",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-sans)",
                    boxShadow: "0 4px 15px rgba(198,148,59,0.25)",
                    transition: "all 0.3s ease",
                    border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
