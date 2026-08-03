export default function EventBookingLoading() {
  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col gap-8 py-6 animate-pulse">
      {/* Back Link & Header Skeleton */}
      <div className="flex flex-col gap-3">
        <div className="h-4 w-36 bg-dark-200 rounded-md" />
        <div className="h-10 w-2/3 max-w-md bg-dark-200 rounded-xl" />
        <div className="h-4 w-96 max-w-full bg-dark-200/60 rounded-md" />
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Summary Card Skeleton */}
        <div className="lg:col-span-5 flex flex-col gap-6 bg-[#0D161A] border border-[#182830] rounded-2xl p-6">
          <div className="w-full h-52 bg-dark-200 rounded-xl" />
          <div className="h-6 w-3/4 bg-dark-200 rounded-md" />
          <div className="h-4 w-full bg-dark-200/60 rounded-md" />
          <div className="h-4 w-4/5 bg-dark-200/40 rounded-md" />
          <hr className="border-border-dark" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 w-1/2 bg-dark-200/60 rounded-md" />
            ))}
          </div>
        </div>

        {/* Right Column Booking Form Skeleton */}
        <div className="lg:col-span-7 bg-[#0D161A] border border-[#182830] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
          <div className="h-6 w-44 bg-dark-200 rounded-md" />
          <div className="h-4 w-full bg-dark-200/60 rounded-md" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-dark-200/60 rounded-md" />
            <div className="h-12 w-full bg-[#182830] rounded-xl" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-28 bg-dark-200/60 rounded-md" />
            <div className="h-12 w-full bg-[#182830] rounded-xl" />
          </div>
          <div className="h-12 w-full bg-primary/20 rounded-xl" />
        </div>
      </div>
    </section>
  );
}
