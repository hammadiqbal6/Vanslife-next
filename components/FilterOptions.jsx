"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function FilterOptions({ styles, filterOptions, filterName, searchParams }) {
  const router = useRouter();
  const pathname = usePathname();

  const typeFilter = searchParams[filterName];

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
    // router.refresh();
  };

  const filterButtonElements = filterOptions.map((type, index) => {
    return (
      <button
        key={index}
        onClick={() => handleFilterChange("type", type)}
        className={
          (typeFilter === type ? "!bg-green-800 " : "") +
          "rounded-xl bg-amber-200 p-3 md:px-6 md:py-3"
        }
      >
        {type}
      </button>
    );
  });

  return (
    <div className={"sticky top-0 " + styles}>
      {filterButtonElements}
      {typeFilter && (
        <button
          onClick={() => handleFilterChange("type", null)}
          className="underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

export default FilterOptions;
