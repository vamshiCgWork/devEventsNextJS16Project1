'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createBooking } from "@/lib/actions/booking.actions";

interface BookingFormProps {
  eventId: string;
  slug: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventImage: string;
}

export default function BookingForm({
  eventId,
  slug,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  eventImage,
}: BookingFormProps) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg("Email address is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createBooking({
        eventId,
        slug,
        email: email.trim(),
      });

      if (res.success) {
        setBookingSuccess(true);
      } else {
        setErrorMsg(res.error || "Failed to complete booking. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="w-full bg-[#0D161A] border border-[#182830] rounded-2xl p-6 sm:p-8 card-shadow flex flex-col items-center text-center gap-6">
        {/* Ticket / Pass Header Badge */}
        <div className="w-16 h-16 rounded-full bg-[#59deca]/10 border border-[#59deca]/30 flex items-center justify-center text-2xl text-[#59deca] shadow-lg animate-bounce">
          ✓
        </div>

        <div className="flex flex-col gap-2 max-w-md">
          <span className="pill text-xs font-semibold text-[#59deca] uppercase tracking-widest self-center">
            Booking Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            You're All Set!
          </h2>
          <p className="text-light-200 text-sm leading-relaxed">
            Your spot for <strong className="text-white">{eventTitle}</strong> has been successfully reserved under <span className="text-[#59deca] font-medium">{email}</span>.
          </p>
        </div>

        {/* Mini Digital Ticket Pass */}
        <div className="w-full max-w-md bg-[#182830]/80 border border-border-dark rounded-xl p-5 flex flex-col gap-4 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#59deca]/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center gap-3 pb-3 border-b border-border-dark">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-border-dark">
              <Image
                src={eventImage}
                alt={eventTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <h3 className="text-sm font-semibold text-white truncate">
                {eventTitle}
              </h3>
              <p className="text-xs text-light-200">{eventLocation}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-gray-400 block uppercase tracking-wider text-[10px]">Date</span>
              <span className="text-white font-medium">{eventDate}</span>
            </div>
            <div>
              <span className="text-gray-400 block uppercase tracking-wider text-[10px]">Time</span>
              <span className="text-white font-medium">{eventTime}</span>
            </div>
            {fullName && (
              <div className="col-span-2">
                <span className="text-gray-400 block uppercase tracking-wider text-[10px]">Attendee</span>
                <span className="text-white font-medium">{fullName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mt-2">
          <Link
            href={`/events/${slug}`}
            className="w-full bg-[#59deca] hover:bg-[#59deca]/90 text-black font-semibold py-3 px-4 rounded-xl text-sm transition-colors text-center"
          >
            View Event Details
          </Link>
          <Link
            href="/events"
            className="w-full bg-[#182830] hover:bg-[#20343f] border border-border-dark text-light-100 font-semibold py-3 px-4 rounded-xl text-sm transition-colors text-center"
          >
            Explore More Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-[#0D161A] border border-[#182830] rounded-2xl p-6 sm:p-8 card-shadow flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-white">Reserve Your Spot</h2>
        <p className="text-xs text-light-200">
          Enter your details below to confirm your registration for this event.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-medium">
          {errorMsg}
        </div>
      )}

      {/* Name Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="text-xs font-medium text-light-100">
          Full Name <span className="text-gray-500">(Optional)</span>
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Jane Doe"
          className="bg-[#182830] border border-border-dark rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#59deca] transition-colors"
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xs font-medium text-light-100">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="bg-[#182830] border border-border-dark rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#59deca] transition-colors"
        />
      </div>

      {/* Terms Notice */}
      <p className="text-[11px] text-gray-400 leading-normal">
        By clicking Confirm Booking, you agree to receive event updates and confirmation details at the email provided.
      </p>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#59deca] hover:bg-[#59deca]/90 text-black font-semibold py-3.5 px-6 rounded-xl text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? "Processing Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
}
