"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="wrapper flex flex-col items-center justify-center text-center">
      <h2 className="font-display text-2xl font-bold">Something went wrong</h2>
      <p className="mt-2 max-w-md text-[#4d4d4d]">
        We could not load the vans right now. Try again in a moment.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-amber-550 px-5 py-3 font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
