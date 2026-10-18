import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavigateBack from "@/components/NavigateBack";
import { getVanById } from "@/lib/store";

async function VanDetails({ params }) {
  const van = getVanById(params.id);
  if (!van) notFound();

  return (
    <div className="wrapper">
      <NavigateBack message="Back to all vans" href="/vans" />
      <div className="mt-4 overflow-hidden rounded-2xl border border-[#ead9c8] bg-white shadow-sm">
        <Image
          src={van.image}
          alt={van.name}
          width={900}
          height={560}
          priority
          className="max-h-[32rem] w-full object-cover"
        />
        <div className="space-y-4 p-5 md:p-8">
          <i className={`van-type-${van.type}`}>{van.type}</i>
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            {van.name}
          </h1>
          <p className="text-xl">
            <span className="font-bold">${van.price}</span>/day
          </p>
          <p className="max-w-3xl leading-relaxed text-[#4d4d4d]">
            {van.description}
          </p>
          <Link
            href="/login?callbackUrl=/host"
            className="inline-flex rounded-lg bg-amber-550 px-5 py-3 font-semibold text-white transition hover:bg-[#e67a28]"
          >
            Rent this van
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VanDetails;
