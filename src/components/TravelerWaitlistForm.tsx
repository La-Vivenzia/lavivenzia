"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { getErrorMessage } from "@/lib/errors";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  city: z.string().min(2, "City / Location is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function TravelerWaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          preferences: { city: data.city },
          source: 'traveler_page_v2',
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Request failed');
      }
      setIsSuccess(true);
    } catch (error) {
      console.error("Waitlist submission error:", getErrorMessage(error));
      setErrorMessage(getErrorMessage(error) || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[var(--color-surface-warm)] border border-[var(--color-border-gold)] p-8 text-center shadow-2xl relative overflow-hidden rounded-md">
        <h3 className="font-serif text-3xl sm:text-4xl text-[var(--color-ivory)] mb-4 font-normal">Welcome Aboard</h3>
        <p className="text-sm sm:text-base text-[var(--color-body-text)] font-light leading-relaxed">
          You are officially on the VIP Traveler Waitlist. We will notify you as soon as early access opens.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0C09]/95 backdrop-blur-xl border border-[var(--color-border-gold)] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden rounded-md">
      <div className="text-center mb-6 sm:mb-8 relative z-10">
        <p className="text-[var(--color-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase mb-3 font-sans">
          VIP Traveler Access
        </p>
        <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-[34px] leading-tight text-[var(--color-ivory)] mb-3">
          Join the VIP<br />Traveler Waitlist
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-muted-text)] font-light tracking-wide font-sans">
          Gain priority access to Maharashtra&apos;s most exclusive stays, tables, and experiences.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-900/20 border border-red-500/50 p-3 mb-6 text-center text-red-200 text-xs sm:text-sm font-sans">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10 font-sans">
        <div>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Your Full Name *"
            className="w-full bg-[#100E0A] border border-[var(--color-border-subtle)] px-4 py-3.5 text-sm text-[var(--color-ivory)] placeholder-[var(--color-muted-text)] focus:outline-none focus:border-[var(--color-gold-muted)] transition-colors font-light tracking-wide rounded-sm"
          />
          {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email Address *"
            className="w-full bg-[#100E0A] border border-[var(--color-border-subtle)] px-4 py-3.5 text-sm text-[var(--color-ivory)] placeholder-[var(--color-muted-text)] focus:outline-none focus:border-[var(--color-gold-muted)] transition-colors font-light tracking-wide rounded-sm"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Phone Number *"
            className="w-full bg-[#100E0A] border border-[var(--color-border-subtle)] px-4 py-3.5 text-sm text-[var(--color-ivory)] placeholder-[var(--color-muted-text)] focus:outline-none focus:border-[var(--color-gold-muted)] transition-colors font-light tracking-wide rounded-sm"
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <input
            {...register("city")}
            type="text"
            placeholder="City / Primary Location *"
            className="w-full bg-[#100E0A] border border-[var(--color-border-subtle)] px-4 py-3.5 text-sm text-[var(--color-ivory)] placeholder-[var(--color-muted-text)] focus:outline-none focus:border-[var(--color-gold-muted)] transition-colors font-light tracking-wide rounded-sm"
          />
          {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#B8860B] hover:bg-[#D4AF37] text-black font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase py-4 transition-colors disabled:opacity-70 mt-4 rounded-sm shadow-md"
        >
          {isSubmitting ? "Joining Waitlist..." : "Join VIP Traveler Waitlist"}
        </button>
      </form>
    </div>
  );
}
