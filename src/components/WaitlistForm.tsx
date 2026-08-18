"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  preferredDestinations: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function WaitlistForm() {
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

    if (!supabase) {
      setErrorMessage("Supabase is not configured. Please check your system configuration.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            name: data.fullName,
            email: data.email,
            phone: data.phone,
            preferences: { destinations: data.preferredDestinations || null },
            source: 'traveler_page_v1'
          }
        ]);

      if (error) {
        throw error;
      }
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Waitlist submission error:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[var(--color-surface-warm)] border border-[var(--color-border-gold)] p-8 text-center shadow-2xl relative overflow-hidden rounded-md">
        <h3 className="font-serif text-3xl sm:text-4xl text-[var(--color-ivory)] mb-4 font-normal">Welcome to VIP Waitlist</h3>
        <p className="text-sm sm:text-base text-[var(--color-body-text)] font-light leading-relaxed">
          Thank you for joining our exclusive VIP traveler waitlist. You will receive early access invitations prior to launch.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0C09]/95 backdrop-blur-xl border border-[var(--color-border-gold)] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden rounded-md">
      <div className="text-center mb-6 sm:mb-8 relative z-10">
        <p className="text-[var(--color-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase mb-3 font-sans">
          VIP Access Pass
        </p>
        <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-[34px] leading-tight text-[var(--color-ivory)] mb-3">
          Join VIP Traveler<br />Waitlist
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-muted-text)] font-light tracking-wide font-sans">
          Get exclusive priority reservations for Maharashtra's premier experiences.
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
            {...register("preferredDestinations")}
            type="text"
            placeholder="Preferred Destinations (e.g. Alibaug, Lonavala, Nashik)"
            className="w-full bg-[#100E0A] border border-[var(--color-border-subtle)] px-4 py-3.5 text-sm text-[var(--color-ivory)] placeholder-[var(--color-muted-text)] focus:outline-none focus:border-[var(--color-gold-muted)] transition-colors font-light tracking-wide rounded-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-light)] text-[#080806] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase py-4 transition-colors disabled:opacity-70 mt-4 rounded-sm shadow-md"
        >
          {isSubmitting ? "Joining..." : "Join VIP Traveler Waitlist"}
        </button>

        <div className="flex items-center justify-center gap-2 mt-5 text-xs text-[var(--color-muted-text)] tracking-wide font-light">
          <Lock className="w-3.5 h-3.5 text-[var(--color-gold-muted)]" strokeWidth={1.5} />
          <span>Curated Privileges. Priority Invites.</span>
        </div>
      </form>
    </div>
  );
}
