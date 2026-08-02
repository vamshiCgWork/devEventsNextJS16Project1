export default function GlobalLoading() {
  return (
    <section className="w-full flex flex-col gap-10 py-6 animate-pulse">
      {/* Hero Skeleton */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-14 w-3/4 max-w-xl bg-dark-200 rounded-2xl" />
        <div className="h-5 w-1/2 max-w-md bg-dark-200/60 rounded-xl" />
        <div className="h-12 w-44 bg-dark-200 rounded-full mt-4" />
      </div>

      {/* Featured Events Grid Skeleton */}
      <div className="mt-10 space-y-7">
        <div className="h-8 w-48 bg-dark-200 rounded-xl" />
        <div className="grid md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="h-[300px] w-full bg-dark-200 rounded-lg" />
              <div className="h-4 w-1/3 bg-dark-200/60 rounded" />
              <div className="h-6 w-3/4 bg-dark-200 rounded" />
              <div className="h-4 w-1/2 bg-dark-200/40 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
