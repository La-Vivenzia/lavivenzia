import { useState } from "react";
import Modal from "./Modal";
import { supabase } from "@/lib/supabase";
import { getErrorMessage } from "@/lib/errors";

interface HostRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HostRegistrationModal({ isOpen, onClose }: HostRegistrationModalProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    hostName: "",
    businessCategory: "",
    cityLocation: "",
    websiteUrl: "",
    instagramHandle: "",
    phoneNumber: "",
    emailAddress: "",
    yearsInBusiness: "",
    priceRange: "",
    shortDescription: "",
    reasonForJoining: "",
    contactMethod: "",
    agreeToTerms: false,
    otherCategory: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('host_registrations')
        .insert([
          { 
            business_name: formData.businessName,
            host_name: formData.hostName,
            business_category: formData.businessCategory === "Other" ? formData.otherCategory : formData.businessCategory,
            city_location: formData.cityLocation,
            website_url: formData.websiteUrl,
            instagram_handle: formData.instagramHandle,
            phone_number: formData.phoneNumber,
            email_address: formData.emailAddress,
            years_in_business: formData.yearsInBusiness,
            price_range: formData.priceRange,
            short_description: formData.shortDescription,
            reason_for_joining: formData.reasonForJoining,
            contact_method: formData.contactMethod
          }
        ]);

      if (error) throw error;
      
      setSubmitStatus('success');
      // Keep it open for 2 seconds to show success, then close
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
        setFormData({
          businessName: "",
          hostName: "",
          businessCategory: "",
          cityLocation: "",
          websiteUrl: "",
          instagramHandle: "",
          phoneNumber: "",
          emailAddress: "",
          yearsInBusiness: "",
          priceRange: "",
          shortDescription: "",
          reasonForJoining: "",
          contactMethod: "",
          agreeToTerms: false,
          otherCategory: "",
        });
      }, 2500);
    } catch (error) {
      console.error("Error submitting host registration:", getErrorMessage(error));
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full bg-[#080806] border border-[rgba(198,148,59,0.2)] rounded-lg px-3.5 py-2.5 text-[var(--color-ivory)] placeholder:text-[#5a5346] focus:outline-none focus:border-[var(--color-gold-primary)] transition-colors font-sans text-sm";
  const labelClasses =
    "block text-[var(--color-gold-primary)] text-[10px] font-semibold tracking-[0.15em] uppercase mb-1.5";

  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Become a founding host">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C6943B]" />
          <span className="eyebrow text-[9px] tracking-[0.3em]">By Application Only</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C6943B]" />
        </div>
        <h2 className="font-serif font-normal text-xl sm:text-2xl text-[var(--color-ivory)] tracking-wide mb-1">
          Founding Host Application
        </h2>
        <p className="text-[var(--color-muted-text)] text-xs font-sans">
          We review all applications within 3–5 business days.
        </p>
      </div>

      {submitStatus === 'success' ? (
        <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#1A1A18] border border-[var(--color-border-gold)] flex items-center justify-center text-[#C6943B] mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="text-xl font-serif text-[#E2BA5F]">Application Submitted</h3>
          <p className="text-[var(--color-body-text)] text-sm font-light">Thank you! We will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitStatus === 'error' && (
            <div className="p-3 bg-red-950/30 border border-red-900/50 rounded text-red-400 text-xs text-center font-sans">
              An error occurred. Please try again.
            </div>
          )}
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="businessName" className={labelClasses}>Business Name *</label>
            <input type="text" id="businessName" name="businessName" required placeholder="Whispering Pines Villa" value={formData.businessName} onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label htmlFor="hostName" className={labelClasses}>Host Name *</label>
            <input type="text" id="hostName" name="hostName" required placeholder="Your full name" value={formData.hostName} onChange={handleChange} className={inputClasses} />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <div>
              <label htmlFor="businessCategory" className={labelClasses}>Category *</label>
              <select id="businessCategory" name="businessCategory" required value={formData.businessCategory} onChange={handleChange} className={inputClasses}>
                <option value="">Select category</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Stay">Stay / Villa</option>
                <option value="Experience">Experience / Activity</option>
                <option value="Wellness">Wellness / Spa</option>
                <option value="Event">Event</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {formData.businessCategory === "Other" && (
              <div>
                <input type="text" id="otherCategory" name="otherCategory" required placeholder="Please specify..." value={formData.otherCategory} onChange={handleChange} className={inputClasses} />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="cityLocation" className={labelClasses}>City / Location *</label>
            <input type="text" id="cityLocation" name="cityLocation" required placeholder="e.g. Mulshi, Pune" value={formData.cityLocation} onChange={handleChange} className={inputClasses} />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="phoneNumber" className={labelClasses}>Phone *</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" required placeholder="+91 XXXXX XXXXX" value={formData.phoneNumber} onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label htmlFor="emailAddress" className={labelClasses}>Email *</label>
            <input type="email" id="emailAddress" name="emailAddress" required placeholder="host@example.com" value={formData.emailAddress} onChange={handleChange} className={inputClasses} />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="yearsInBusiness" className={labelClasses}>Years in Business *</label>
            <select id="yearsInBusiness" name="yearsInBusiness" required value={formData.yearsInBusiness} onChange={handleChange} className={inputClasses}>
              <option value="">Select</option>
              <option value="Less than 1 year">Less than 1 year</option>
              <option value="1-3 years">1–3 years</option>
              <option value="3-5 years">3–5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>
          <div>
            <label htmlFor="priceRange" className={labelClasses}>Price Range *</label>
            <select id="priceRange" name="priceRange" required value={formData.priceRange} onChange={handleChange} className={inputClasses}>
              <option value="">Select</option>
              <option value="Premium">Premium</option>
              <option value="Luxury">Luxury</option>
              <option value="Ultra-Luxury">Ultra-Luxury</option>
            </select>
          </div>
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="websiteUrl" className={labelClasses}>Website URL</label>
            <input type="url" id="websiteUrl" name="websiteUrl" placeholder="https://..." value={formData.websiteUrl} onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label htmlFor="instagramHandle" className={labelClasses}>Instagram</label>
            <input type="text" id="instagramHandle" name="instagramHandle" placeholder="@yourbusiness" value={formData.instagramHandle} onChange={handleChange} className={inputClasses} />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="shortDescription" className={labelClasses}>Short Description *</label>
          <textarea id="shortDescription" name="shortDescription" required rows={2} placeholder="Tell us about your space, table, or experience..." value={formData.shortDescription} onChange={handleChange} className={`${inputClasses} resize-none`} />
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reasonForJoining" className={labelClasses}>Why Join La Vivenzia? *</label>
          <textarea id="reasonForJoining" name="reasonForJoining" required rows={2} placeholder="Why do you want to become a Founding Host?" value={formData.reasonForJoining} onChange={handleChange} className={`${inputClasses} resize-none`} />
        </div>

        {/* Contact Method */}
        <div>
          <label htmlFor="contactMethod" className={labelClasses}>Preferred Contact *</label>
          <select id="contactMethod" name="contactMethod" required value={formData.contactMethod} onChange={handleChange} className={inputClasses}>
            <option value="">Select method</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 pt-1">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            required
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm border border-[rgba(198,148,59,0.4)] bg-transparent cursor-pointer accent-[#C6943B]"
          />
          <label htmlFor="agreeToTerms" className="text-[11px] text-[var(--color-muted-text)] font-sans leading-relaxed cursor-pointer">
            I confirm that all submitted details are accurate and consent to La Vivenzia contacting me regarding this application. *
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !formData.agreeToTerms}
          className="w-full btn-gold-primary disabled:opacity-40 disabled:cursor-not-allowed !py-3 mt-1"
        >
          {isSubmitting ? "Submitting…" : "Submit Application"}
        </button>
      </form>
      )}
    </Modal>
  );
}
