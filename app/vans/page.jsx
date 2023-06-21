import FilterOptions from "@/components/FilterOptions";
import VanView from "@/components/VanView";
import { headers } from "next/headers";

const filterOptions = ["simple", "rugged", "luxury"];

const fetchData = async () => {
  const host = headers().get("host");
  const response = await fetch(`http://${host}/api/vans`);
  const data = await response.json();
  return data;
};

async function Vans({ searchParams }) {
  const vans = await fetchData();

  const typeFilter = searchParams?.type;
  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold">Explore our vans Options</h1>
      <div className="relative flex flex-col sm:flex-row">
        <FilterOptions
          styles="self-start pr-0 sm:pr-4 py-3 flex flex-col gap-y-4 sm:gap-y-10"
          filterOptions={filterOptions}
          filterName="type"
          searchParams={searchParams}
        />
        <VanView
          vans={filteredVans}
          containerStyles={"mt-3 grid grid-cols-fluid gap-10 w-full"}
          detailStyles={
            "mt-4 flex flex-col gap-y-2 items-center md:items-start"
          }
          imageStyles={
            "mx-auto h-64 w-64 rounded-md object-contain md:mx-0 md:h-80 md:w-80"
          }
          bannerSize={{ width: 200, height: 200 }}
        />
      </div>
    </div>
  );
}

export default Vans;
