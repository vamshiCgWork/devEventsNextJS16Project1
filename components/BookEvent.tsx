'use client';

import { useState } from "react";
import { createBooking } from "@/lib/actions/booking.actions";

interface BookEventProps {
  eventId: string;
  slug: string;
}

const BookEvent = ({ eventId, slug }: BookEventProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg("Email address is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createBooking({ eventId, slug, email: email.trim() });

      if (res.success) {
        setSubmitted(true);
        setEmail('');
      } else {
        setErrorMsg(res.error || 'Failed to complete booking.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <div className="flex flex-col gap-2 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-center">
          <p className="font-semibold text-base">🎉 Spot Booked Successfully!</p>
          <p className="text-xs text-light-200">
            Thank you for registering! We've saved your spot for this event.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errorMsg && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 p-2.5 rounded-md">
              {errorMsg}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-light-100">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
              required
              className="bg-dark-200 text-white rounded-[6px] px-5 py-2.5 text-sm border border-border-dark focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 w-full cursor-pointer items-center justify-center rounded-[6px] px-4 py-2.5 text-lg font-semibold text-black transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Booking..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;