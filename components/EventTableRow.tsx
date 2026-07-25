"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EventTableActions from "@/components/EventTableActions";

interface EventTableRowProps {
  event: {
    _id: string;
    title: string;
    slug: string;
    image?: string;
    location?: string;
    venue?: string;
    date?: string;
    time?: string;
    bookedCount?: number;
  };
}

export default function EventTableRow({ event }: EventTableRowProps) {
  const router = useRouter();

  const handleRowClick = (e: React.MouseEvent) => {
    // If the click originated inside the actions cell (Edit/Delete), do not navigate via row click
    if ((e.target as HTMLElement).closest(".actions-cell")) {
      return;
    }
    router.push(`/events/${event.slug}`);
  };

  return (
    <tr
      onClick={handleRowClick}
      className="hover:bg-[#122027]/70 transition-colors text-sm text-light-100 cursor-pointer group"
    >
      {/* Events Title & Thumbnail */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-dark-200 shrink-0 border border-[#182830]">
            <Image
              src={event.image || "/icons/logo.png"}
              alt={event.title}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <Link
            href={`/events/${event.slug}`}
            className="font-semibold text-white group-hover:text-[#59deca] transition-colors line-clamp-1 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {event.title}
          </Link>
        </div>
      </td>

      {/* Location */}
      <td className="py-4 px-6 text-light-200">
        {event.location || event.venue || "Online"}
      </td>

      {/* Date */}
      <td className="py-4 px-6 text-light-200">
        {event.date || "TBD"}
      </td>

      {/* Time */}
      <td className="py-4 px-6 text-light-200">
        {event.time || "10:00 AM"}
      </td>

      {/* Booked Spot */}
      <td className="py-4 px-6 text-light-100 font-medium">
        {event.bookedCount ?? 400}
      </td>

      {/* Actions */}
      <td
        className="py-4 px-6 text-right actions-cell"
        onClick={(e) => e.stopPropagation()}
      >
        <EventTableActions
          eventId={event._id}
          slug={event.slug}
          title={event.title}
        />
      </td>
    </tr>
  );
}
