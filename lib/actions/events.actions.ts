'use server'

import { connectDB } from "@/lib/mongodb";
import Event from "@/database/event.model"

export const getEventBySlug = async (slug: string) => {
    if (!slug || typeof slug !== "string" || !slug.trim()) {
        return null;
    }

    await connectDB();
    const event = await Event.findOne({ slug: slug.trim() }).lean().exec();

    if (!event) {
        return null;
    }
    return JSON.parse(JSON.stringify(event));
}

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB()
        const event = await Event.findOne({ slug })
        if (!event) return [];
        const similarEvents = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean().exec();
        return JSON.parse(JSON.stringify(similarEvents));
    }
    catch (error) {
        return []
    }
}

export interface CreateEventParams {
    title: string;
    date: string;
    time: string;
    location: string;
    mode: "online" | "offline" | "hybrid";
    image: string;
    tags: string[];
    description: string;
    overview?: string;
    audience?: string;
    organizer?: string;
    agenda?: string[];
}

export const createEventAction = async (params: CreateEventParams) => {
    try {
        await connectDB();

        // Format time to HH:MM if standard string passed (e.g., "10:00" or "10:30")
        let formattedTime = params.time.trim();
        if (formattedTime.includes(" ")) {
            // handle "10:00 AM" if user entered 12-hour format
            const [timeStr, modifier] = formattedTime.split(" ");
            let [hours, minutes] = timeStr.split(":");
            if (hours === "12") hours = "00";
            if (modifier?.toUpperCase() === "PM") hours = (parseInt(hours, 10) + 12).toString();
            formattedTime = `${hours.padStart(2, "0")}:${minutes || "00"}`;
        }
        if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formattedTime)) {
            formattedTime = "10:00"; // fallback valid time
        }

        const newEvent = await Event.create({
            title: params.title.trim(),
            description: params.description.trim(),
            overview: params.overview?.trim() || params.description.trim(),
            image: params.image.trim() || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop",
            venue: params.location.trim() || "Online",
            location: params.location.trim() || "Online",
            date: params.date.trim(),
            time: formattedTime,
            mode: params.mode || "online",
            audience: params.audience?.trim() || "Developers & Tech Enthusiasts",
            agenda: params.agenda && params.agenda.length > 0 ? params.agenda : ["Keynote", "Technical Presentation", "Networking & Q&A"],
            organizer: params.organizer?.trim() || "DevEvent Community",
            tags: params.tags && params.tags.length > 0 ? params.tags : ["Developer", "Tech"],
        });

        return { success: true, event: JSON.parse(JSON.stringify(newEvent)) };
    } catch (error) {
        console.error("Failed to create event:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to create event" };
    }
}