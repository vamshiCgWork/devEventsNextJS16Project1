import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/actions/events.actions";
import { getBookingCount } from "@/lib/actions/booking.actions";
import BookingForm from "@/components/BookingForm";

export const dynamic = "force-dynamic";

interface BookingPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventBookingPage({ params }: BookingPageProps) {
  const { slug } = await params;
  const data = await getEventBySlug(slug);

  if (!data) return notFound();

  const bookingCount = await getBookingCount(data._id);

  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col gap-8 py-6">
      {/* Back Link & Header */}
      <div className="flex flex-col gap-3">
        <Link
          href={`/events/${data.slug}`}
          className="text-xs font-semibold text-[#59deca] hover:underline flex items-center gap-1 w-fit"
        >
          ← Back to Event Details
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient">
          Book Event: {data.title}
        </h1>
        <p className="text-light-200 text-sm">
          Secure your pass for {data.title}. Complete the form below to confirm your spot.
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Event Card Summary */}
        <div className="lg:col-span-5 flex flex-col gap-6 bg-[#0D161A] border border-[#182830] rounded-2xl p-6 card-shadow">
          <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-[#182830]">
            <Image
              src={data.image || "/icons/logo.png"}
              alt={data.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <span className="absolute top-3 right-3 pill text-xs font-semibold uppercase bg-dark-100/80 backdrop-blur-md text-[#59deca]">
              {data.mode || "Online"}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-white leading-snug">
              {data.title}
            </h2>
            <p className="text-light-200 text-xs line-clamp-3 leading-relaxed">
              {data.overview || data.description}
            </p>
          </div>

          <hr className="border-border-dark" />

          {/* Quick Details List */}
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-light-100">
              <Image src="/icons/calendar.svg" alt="Calendar" width={16} height={16} />
              <span>{data.date}</span>
            </div>
            <div className="flex items-center gap-2.5 text-light-100">
              <Image src="/icons/clock.svg" alt="Clock" width={16} height={16} />
              <span>{data.time}</span>
            </div>
            <div className="flex items-center gap-2.5 text-light-100">
              <Image src="/icons/pin.svg" alt="Location" width={16} height={16} />
              <span>{data.location || data.venue || "Online"}</span>
            </div>
            <div className="flex items-center gap-2.5 text-light-100">
              <Image src="/icons/audience.svg" alt="Audience" width={16} height={16} />
              <span>{data.audience || "Developers & Tech Enthusiasts"}</span>
            </div>
          </div>

          <hr className="border-border-dark" />

          {/* Live Spot Stats */}
          <div className="flex items-center justify-between p-3.5 bg-[#182830]/60 rounded-xl border border-border-dark text-xs">
            <span className="text-gray-400">Total Booked Spots:</span>
            <span className="text-[#59deca] font-bold text-sm">
              {bookingCount} {bookingCount === 1 ? "Person" : "People"}
            </span>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="lg:col-span-7">
          <BookingForm
            eventId={data._id}
            slug={data.slug}
            eventTitle={data.title}
            eventDate={data.date}
            eventTime={data.time}
            eventLocation={data.location || data.venue || "Online"}
            eventImage={data.image || "/icons/logo.png"}
          />
        </div>
      </div>
    </section>
  );
}
