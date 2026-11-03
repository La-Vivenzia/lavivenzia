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
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          preferences: { city: data.city },
          source: "traveler_page_v2",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Request failed");
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
      <div className="bg-[#100F0C] border border-[#D7AE63]/40 p-8 sm:p-12 rounded-2xl text-center shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-[#181612] border border-[#D7AE63] text-[#D7AE63] flex items-center justify-center mx-auto mb-4 text-xl">
          ✓
        </div>
        <h3 
          className="text-2xl font-normal text-[#FAF8F5] mb-2"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          Priority Request Received
        </h3>
        <p className="text-xs sm:text-sm font-sans text-[#A8A398] max-w-md mx-auto leading-relaxed">
          Thank you for joining our private traveler circle. We will reach out with your exclusive member credentials as launch slots open.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#100F0C] border border-white/[0.08] p-8 sm:p-12 rounded-2xl shadow-2xl text-left">
      <div className="mb-8">
        <span className="text-[10px] font-sans font-bold tracking-[0.22em] text-[#D7AE63] uppercase block mb-2">
          EXCLUSIVE ACCESS INVITATION
        </span>
        <h3 
          className="text-2xl sm:text-3xl font-normal text-[#FAF8F5]"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          Request Priority Member Access
        </h3>
        <p className="text-xs sm:text-sm font-sans font-light text-[#9E988D] mt-2">
          Join our pre-launch list to receive curated invites, unlisted properties, and private tasting experiences.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-[11px] font-sans tracking-wider uppercase text-[#C5C0B6] mb-1.5">
            Full Name *
          </label>
          <input
            {...register("fullName")}
            type="text"
            placeholder="e.g. Karan Patil"
            className="w-full px-4 py-3 rounded-xl bg-[#161411] border border-white/[0.08] text-sm text-[#FAF8F5] placeholder-[#6E6A62] focus:outline-none focus:border-[#D7AE63] transition-colors"
          />
          {errors.fullName && (
            <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-sans tracking-wider uppercase text-[#C5C0B6] mb-1.5">
              Email Address *
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="karan@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#161411] border border-white/[0.08] text-sm text-[#FAF8F5] placeholder-[#6E6A62] focus:outline-none focus:border-[#D7AE63] transition-colors"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-sans tracking-wider uppercase text-[#C5C0B6] mb-1.5">
              Phone Number *
            </label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl bg-[#161411] border border-white/[0.08] text-sm text-[#FAF8F5] placeholder-[#6E6A62] focus:outline-none focus:border-[#D7AE63] transition-colors"
            />
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-sans tracking-wider uppercase text-[#C5C0B6] mb-1.5">
            Current City / Location *
          </label>
          <input
            {...register("city")}
            type="text"
            placeholder="e.g. Mumbai, Pune, Alibaug"
            className="w-full px-4 py-3 rounded-xl bg-[#161411] border border-white/[0.08] text-sm text-[#FAF8F5] placeholder-[#6E6A62] focus:outline-none focus:border-[#D7AE63] transition-colors"
          />
          {errors.city && (
            <p className="text-xs text-red-400 mt-1">{errors.city.message}</p>
          )}
        </div>

        {errorMessage && (
          <p className="text-xs text-red-400">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-full bg-[#E4DCD1] hover:bg-white text-[#14120E] text-xs font-semibold tracking-wider uppercase font-sans transition-all duration-300 shadow-md hover:translate-y-[-1px] mt-2"
        >
          {isSubmitting ? "Submitting..." : "Request Exclusive Access"}
        </button>
      </form>
    </div>
  );
}
