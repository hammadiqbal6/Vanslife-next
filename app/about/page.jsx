import Link from "next/link";

function About() {
  return (
    <div className="wrapper flex flex-col justify-center gap-y-4 bg-opacity-60 bg-[url('/images/home-hero.png')] bg-cover bg-no-repeat">
      <div className="mx-auto flex max-w-screen-md flex-col gap-y-4 rounded-lg bg-white p-4 text-black shadow-sm">
        <div className="text-xl">
          <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
          <p>
            Our mission is to enliven your road trip with the perfect travel van
            rental. Our vans are recertified before each trip to ensure your
            travel plans can go off without a hitch. (Hitch costs extra 😉)
          </p>
          <p>
            Our team is full of vanlife enthusiasts who know firsthand the magic
            of touring the world on 4 wheels.
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2>
            Your destination is waiting.
            <br />
            Your van is ready.
          </h2>
          <Link
            className="w-full rounded-lg bg-amber-550 p-3 text-center text-black"
            href="/vans"
          >
            Explore our vans
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
