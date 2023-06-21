import Link from "next/link";

export default function Home() {
  return (
    <div className="wrapper flex flex-col items-center justify-center bg-[url('/images/home-hero.png')] bg-cover bg-no-repeat">
      <div className="flex flex-col gap-y-4 text-white">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-6xl">
          You got the travel plans, we got the travel vans.
        </h1>
        <p className="text-lg">
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <Link href="/vans" className="rounded-lg bg-amber-550 py-3 text-center">
          Find your van
        </Link>
      </div>
    </div>
  );
}
