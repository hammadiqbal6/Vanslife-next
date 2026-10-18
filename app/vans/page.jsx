import FilterOptions from "@/components/FilterOptions";
import VanView from "@/components/VanView";
import { listVans } from "@/lib/store";

const filterOptions = ["simple", "rugged", "luxury"];

async function Vans({ searchParams }) {
  const vans = listVans();
  const typeFilter = searchParams?.type;
  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  return (
    <div className="wrapper">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-[#161616] md:text-4xl">
          Explore our van options
        </h1>
        <p className="mt-2 text-[#4d4d4d]">
          Filter by vibe and find the perfect ride for your next trip.
        </p>
      </div>

      <div className="relative mt-6 flex flex-col gap-6 lg:flex-row">
        <FilterOptions
          styles="self-start flex flex-row flex-wrap gap-3 lg:flex-col lg:gap-y-4 lg:pr-4 lg:sticky lg:top-20"
          filterOptions={filterOptions}
          filterName="type"
          searchParams={searchParams}
        />
        {filteredVans.length ? (
          <VanView
            vans={filteredVans}
            basePath="/vans"
            containerStyles="grid grid-cols-fluid gap-8 w-full"
            detailStyles="mt-4 flex flex-col gap-y-2"
            imageStyles="h-64 w-full rounded-2xl object-cover md:h-72"
            bannerSize={{ width: 400, height: 300 }}
            itemStyles="block transition hover:-translate-y-1"
          />
        ) : (
          <div className="w-full rounded-2xl border border-dashed border-[#d6c4b0] bg-white/70 p-10 text-center">
            <p className="font-semibold">No vans match this filter</p>
            <p className="mt-1 text-sm text-[#4d4d4d]">
              Clear the filter to see the full fleet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vans;
