export default function EventDetailLoading() {
  return (
    <section id="event" className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="header space-y-3 mb-10">
        <div className="h-10 w-2/3 max-w-md bg-dark-200 rounded-xl" />
        <div className="h-4 w-full max-w-2xl bg-dark-200/60 rounded-lg" />
        <div className="h-4 w-4/5 max-w-xl bg-dark-200/40 rounded-lg" />
      </div>

      {/* Main Content & Booking Sidebar Skeleton */}
      <div className="details flex flex-col lg:flex-row gap-12 items-start w-full">
        {/* Left Side Content Skeleton */}
        <div className="content flex-[2] flex flex-col gap-8 w-full">
          {/* Banner Skeleton */}
          <div className="w-full h-[350px] sm:h-[457px] bg-dark-200 rounded-2xl border border-border-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Overview Skeleton */}
          <div className="flex flex-col gap-3">
            <div className="h-7 w-36 bg-dark-200 rounded-lg" />
            <div className="h-4 w-full bg-dark-200/60 rounded" />
            <div className="h-4 w-11/12 bg-dark-200/60 rounded" />
            <div className="h-4 w-4/5 bg-dark-200/40 rounded" />
          </div>

          {/* Event Details Skeleton */}
          <div className="flex flex-col gap-3">
            <div className="h-7 w-40 bg-dark-200 rounded-lg mb-1" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-dark-200 rounded-full" />
                <div className="h-4 w-48 bg-dark-200/60 rounded" />
              </div>
            ))}
          </div>

          {/* Agenda Skeleton */}
          <div className="flex flex-col gap-3">
            <div className="h-7 w-32 bg-dark-200 rounded-lg" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-dark-200/60 rounded" />
              <div className="h-4 w-2/3 bg-dark-200/60 rounded" />
              <div className="h-4 w-4/5 bg-dark-200/60 rounded" />
            </div>
          </div>
        </div>

        {/* Right Side Booking Card Skeleton */}
        <aside className="booking flex-1 w-full">
          <div className="signup-card bg-dark-100 border border-dark-200 rounded-[10px] p-6 flex flex-col gap-6">
            <div className="h-7 w-44 bg-dark-200 rounded-lg" />
            <div className="h-4 w-full bg-dark-200/60 rounded" />
            <div className="h-10 w-full bg-dark-200 rounded-xl" />
            <div className="h-12 w-full bg-primary/20 rounded-xl" />
          </div>
        </aside>
      </div>
    </section>
  );
}
