"use client";

import { usePathname, useRouter } from "next/navigation";

function FilterOptions({ styles, filterOptions, filterName, searchParams }) {
  const router = useRouter();
  const pathname = usePathname();
  const typeFilter = searchParams?.[filterName];

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(
      searchParams ? { ...searchParams } : undefined
    );
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className={styles}>
      {filterOptions.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => handleFilterChange(filterName, type)}
          className={`${
            typeFilter === type
              ? "bg-[#161616] text-white"
              : "bg-[#ffead0] text-[#4d4d4d] hover:bg-[#ffe0b8]"
          } rounded-xl px-4 py-2.5 capitalize transition md:px-5`}
        >
          {type}
        </button>
      ))}
      {typeFilter && (
        <button
          type="button"
          onClick={() => handleFilterChange(filterName, null)}
          className="underline underline-offset-4"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

export default FilterOptions;
