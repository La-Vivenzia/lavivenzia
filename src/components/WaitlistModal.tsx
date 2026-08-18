import { useState } from "react";
import Modal from "./Modal";
import { supabase } from "@/lib/supabase";
import { getErrorMessage } from "@/lib/errors";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, source: 'vip_modal' }]);
        
      if (error) throw error;
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
        setEmail("");
      }, 2500);
    } catch (error) {
      console.error("Error submitting waitlist email:", getErrorMessage(error));
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Join the invite list">
      <div className="text-center mb-8">
        <h2 className="font-serif font-normal text-2xl sm:text-3xl text-[var(--color-ivory)] uppercase tracking-wide mb-2">
          JOIN THE INVITE LIST
        </h2>
        <p className="text-[var(--color-body-text)] text-sm sm:text-base font-sans">
          Be the first to know when we launch.
        </p>
      </div>

      {submitStatus === 'success' ? (
        <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#1A1A18] border border-[var(--color-border-gold)] flex items-center justify-center text-[#C6943B] mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="text-xl font-serif text-[#E2BA5F]">You&apos;re on the list</h3>
          <p className="text-[var(--color-body-text)] text-sm font-light">We will notify you as soon as we launch.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-6">
          {submitStatus === 'error' && (
            <div className="p-3 bg-red-950/30 border border-red-900/50 rounded text-red-400 text-xs text-center font-sans">
              An error occurred. You might already be on the list!
            </div>
          )}
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#080806] border border-[var(--color-border-gold)] rounded-md px-4 py-3 text-[var(--color-ivory)] placeholder:text-[var(--color-muted-text)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-colors font-sans text-sm"
              placeholder="Enter your email address"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-maroon-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Join Waitlist"}
          </button>
        </form>
      )}
    </Modal>
  );
}
