import Link from "next/link";
import Image from "next/image";

export default function GlobalNotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-12">
      <div className="glass max-w-md w-full p-8 md:p-10 rounded-2xl flex flex-col items-center gap-6 border border-border-dark card-shadow">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-dark-200 border border-border-dark">
          <Image
            src="/icons/logo.png"
            alt="DevEvent Logo"
            width={48}
            height={48}
            className="opacity-80"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="pill text-xs font-semibold text-primary uppercase tracking-widest self-center">
            404 Page Not Found
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mt-2">
            Lost in Code?
          </h1>
          <p className="text-light-200 text-sm md:text-base max-w-sm mt-1 leading-relaxed">
            The page you requested could not be found. Let's get you back to discover tech events!
          </p>
        </div>

        <Link
          href="/"
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
