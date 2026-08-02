export default function EventsDashboardLoading() {
  return (
    <section className="w-full flex flex-col gap-8 py-6 animate-pulse">
      {/* Top Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="h-10 w-64 bg-dark-200 rounded-xl" />
        <div className="h-12 w-40 bg-primary/20 rounded-xl" />
      </div>

      {/* Table Container Skeleton */}
      <div className="w-full bg-[#0D161A] border border-[#182830] rounded-2xl overflow-hidden card-shadow">
        <div className="p-6 border-b border-[#182830] flex justify-between">
          <div className="h-4 w-32 bg-dark-200 rounded" />
          <div className="h-4 w-24 bg-dark-200 rounded" />
          <div className="h-4 w-24 bg-dark-200 rounded" />
          <div className="h-4 w-24 bg-dark-200 rounded" />
        </div>
        <div className="divide-y divide-[#182830]/80">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-dark-200 shrink-0" />
                <div className="h-5 w-44 bg-dark-200/80 rounded" />
              </div>
              <div className="h-4 w-28 bg-dark-200/60 rounded hidden sm:block" />
              <div className="h-4 w-24 bg-dark-200/60 rounded hidden md:block" />
              <div className="h-4 w-20 bg-dark-200/60 rounded" />
              <div className="h-4 w-16 bg-dark-200/60 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
