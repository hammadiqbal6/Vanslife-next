import Link from "next/link";

export default function Home() {
  return (
    <section className="relative min-h-[calc(100vh-57px)] overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('/images/home-hero.png')] bg-cover bg-center"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-57px)] max-w-6xl flex-col justify-center px-4 py-16 md:px-6">
        <p className="animate-fade-up mb-3 font-display text-4xl font-bold uppercase tracking-tight text-white md:text-6xl lg:text-7xl">
          #VanLife
        </p>
        <h1 className="animate-fade-up-delay max-w-3xl text-2xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
          You got the travel plans, we got the travel vans.
        </h1>
        <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base text-white/90 md:text-lg">
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap gap-3">
          <Link
            href="/vans"
            className="rounded-lg bg-amber-550 px-6 py-3 text-center font-semibold text-white transition hover:bg-[#e67a28]"
          >
            Find your van
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-white/40 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
          >
            Our story
          </Link>
        </div>
      </div>
    </section>
  );
}
