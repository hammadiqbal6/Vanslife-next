"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function HostError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="wrapper flex flex-col items-center justify-center text-center">
      <h2 className="font-display text-2xl font-bold">Host dashboard error</h2>
      <p className="mt-2 max-w-md text-[#4d4d4d]">
        Something went wrong loading your host area. Try again or sign in again.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-amber-550 px-5 py-3 font-semibold text-white"
        >
          Try again
        </button>
        <Link
          href="/login?callbackUrl=/host"
          className="rounded-lg border border-[#d6c4b0] px-5 py-3 font-semibold"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
