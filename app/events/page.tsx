import Link from "next/link";
import Image from "next/image";
import { getDashboardEventsAction } from "@/lib/actions/events.actions";
import EventTableActions from "@/components/EventTableActions";

export const dynamic = "force-dynamic";

interface DashboardPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function EventDashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const ITEMS_PER_PAGE = 10;

  const res = await getDashboardEventsAction();
  const allEvents = res.events || [];

  const totalEvents = allEvents.length;
  const totalPages = Math.max(1, Math.ceil(totalEvents / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);

  const paginatedEvents = allEvents.slice(
    (validPage - 1) * ITEMS_PER_PAGE,
    validPage * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full flex flex-col gap-8 py-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gradient">
          Event Management
        </h1>
        <Link
          href="/events/create"
          className="bg-[#59deca] hover:bg-[#59deca]/90 text-black font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-md flex items-center gap-2"
        >
          Add New Event
        </Link>
      </div>

      {/* Table Container */}
      <div className="w-full bg-[#0D161A] border border-[#182830] rounded-2xl overflow-hidden card-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-[#182830] text-gray-400 text-sm font-medium">
                <th className="py-4 px-6 w-[28%]">Events</th>
                <th className="py-4 px-6 w-[20%]">Location</th>
                <th className="py-4 px-6 w-[20%]">Date</th>
                <th className="py-4 px-6 w-[18%]">Time</th>
                <th className="py-4 px-6 w-[14%]">Booked spot</th>
                <th className="py-4 px-6 w-[12%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#182830]/80">
              {paginatedEvents.length > 0 ? (
                paginatedEvents.map((event) => (
                  <tr
                    key={event._id}
                    className="hover:bg-[#122027]/50 transition-colors text-sm text-light-100"
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
                        <span className="font-semibold text-white line-clamp-1">
                          {event.title}
                        </span>
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
                    <td className="py-4 px-6 text-right">
                      <EventTableActions
                        eventId={event._id}
                        slug={event.slug}
                        title={event.title}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-gray-400 text-base"
                  >
                    No events found. Click <strong>"Add New Event"</strong> to create your first event!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href={validPage > 1 ? `/events?page=${validPage - 1}` : "#"}
          className={`bg-[#182830] text-light-100 border border-[#233844] px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            validPage <= 1
              ? "opacity-40 cursor-not-allowed pointer-events-none"
              : "hover:bg-[#20343f]"
          }`}
        >
          Previous
        </Link>

        <span className="text-light-200 text-sm font-medium">
          Page {validPage} of {totalPages}
        </span>

        <Link
          href={validPage < totalPages ? `/events?page=${validPage + 1}` : "#"}
          className={`bg-[#182830] text-light-100 border border-[#233844] px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            validPage >= totalPages
              ? "opacity-40 cursor-not-allowed pointer-events-none"
              : "hover:bg-[#20343f]"
          }`}
        >
          Next
        </Link>
      </div>
    </section>
  );
}
