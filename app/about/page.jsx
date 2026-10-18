import Image from "next/image";
import Link from "next/link";

function About() {
  return (
    <div className="wrapper mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-2xl border border-[#ead9c8] bg-white shadow-sm">
        <Image
          src="/images/about-hero.png"
          alt="People enjoying van life outdoors"
          width={1200}
          height={520}
          className="h-56 w-full object-cover md:h-80"
          priority
        />
        <div className="space-y-5 p-6 md:p-10">
          <h1 className="font-display text-3xl font-bold text-[#161616] md:text-4xl">
            Don&apos;t squeeze in a sedan when you could relax in a van.
          </h1>
          <p className="leading-relaxed text-[#4d4d4d]">
            Our mission is to enliven your road trip with the perfect travel van
            rental. Our vans are recertified before each trip to ensure your
            travel plans can go off without a hitch.
          </p>
          <p className="leading-relaxed text-[#4d4d4d]">
            Our team is full of vanlife enthusiasts who know firsthand the magic
            of touring the world on 4 wheels.
          </p>
          <div className="rounded-2xl bg-[#ffead0] p-6">
            <h2 className="font-display text-2xl font-bold text-[#161616]">
              Your destination is waiting.
              <br />
              Your van is ready.
            </h2>
            <Link
              className="mt-4 inline-flex rounded-lg bg-[#161616] px-5 py-3 font-semibold text-white transition hover:bg-[#333]"
              href="/vans"
            >
              Explore our vans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
