'use server';

import { connectDB } from "@/lib/mongodb";
import Booking from "@/database/booking.model";
import Event from "@/database/event.model";
import { revalidatePath } from "next/cache";

export interface CreateBookingParams {
  eventId: string;
  slug?: string;
  email: string;
}

export const createBooking = async ({ eventId, slug, email }: CreateBookingParams) => {
  try {
    const trimmedEmail = email?.trim().toLowerCase();

    if (!trimmedEmail) {
      return { success: false, error: "Email address is required" };
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return { success: false, error: "Please enter a valid email address" };
    }

    await connectDB();

    // Verify event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return { success: false, error: "Event not found" };
    }

    // Check if email already booked for this event
    const existingBooking = await Booking.findOne({
      eventId,
      email: trimmedEmail,
    });

    if (existingBooking) {
      return {
        success: false,
        error: "This email address is already registered for this event.",
      };
    }

    const newBooking = await Booking.create({
      eventId,
      email: trimmedEmail,
    });

    const targetSlug = slug || event.slug;

    revalidatePath("/");
    revalidatePath("/events");
    if (targetSlug) {
      revalidatePath(`/events/${targetSlug}`);
      revalidatePath(`/events/${targetSlug}/book`);
    }

    return {
      success: true,
      booking: JSON.parse(JSON.stringify(newBooking)),
    };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to process booking",
    };
  }
};

export const getBookingCount = async (eventId: string) => {
  try {
    await connectDB();
    const count = await Booking.countDocuments({ eventId });
    return count;
  } catch (error) {
    console.error("Failed to fetch booking count:", error);
    return 0;
  }
};
