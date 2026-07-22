import Link from "next/link";
import Image from "next/image";

export default function EventNotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[65vh] text-center px-4 py-12">
      <div className="glass max-w-md w-full p-8 md:p-10 rounded-2xl flex flex-col items-center gap-6 border border-border-dark card-shadow">
        {/* Animated glowing icon container */}
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-dark-200 border border-border-dark shadow-inner">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl"></div>
          <Image
            src="/icons/calendar.svg"
            alt="Calendar icon"
            width={48}
            height={48}
            className="opacity-40"
          />
          <span className="absolute top-2 right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="pill text-xs font-semibold text-primary uppercase tracking-widest self-center">
            404 • Event Not Found
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mt-2">
            Event Not Found
          </h1>
          <p className="text-light-200 text-sm md:text-base max-w-sm mt-1 leading-relaxed">
            The event you are looking for doesn't exist, may have been removed, or the link is invalid.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
          <Link
            href="/"
            className="w-full sm:w-1/2 bg-primary hover:bg-primary/90 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            All Events
          </Link>
          <Link
            href="/events/create"
            className="w-full sm:w-1/2 bg-dark-200 hover:bg-dark-100 border border-border-dark text-light-100 font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            Create Event
          </Link>
        </div>
      </div>
    </section>
  );
}
