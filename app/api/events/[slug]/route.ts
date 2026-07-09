import { NextResponse } from "next/server";
import type { IEvent } from "@/database";
import { Event } from "@/database";
import { connectDB } from "@/lib/mongodb";

type RouteParams={
    params:Promise<{slug:string}>
}

// GET /api/events/:slug - returns event by slug
export async function GET(
  _req: Request,
  { params }: RouteParams
) {
  try {
    const slug = (await params)?.slug;

    // Validate slug presence and basic format
    if (!slug || typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json({ error: "Missing or invalid slug" }, { status: 400 });
    }

    // Connect to DB (idempotent)
    await connectDB();

    // Find event by slug. Use lean() to return a plain object and keep types strict.
    const event = await Event.findOne({ slug: slug.trim().toLowerCase() }).lean<IEvent>().exec();

    if (!event) {
      return NextResponse.json({ error: `Event with slug ${slug} found` }, { status: 404 });
    }

    // Remove internal fields if present and return clean JSON
    const { __v, ...payload } = event as unknown as Record<string, unknown>;

    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    // Unexpected errors
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Failed to fetch event: ${message}` }, { status: 500 });
  }
}
