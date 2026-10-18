"use client";

import Link from "next/link";

function GuestNav() {
  return (
    <>
      <Link
        href="/login"
        className="text-[#4d4d4d] transition hover:text-[#161616]"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="rounded-lg bg-amber-550 px-3 py-1.5 font-semibold text-white transition hover:bg-[#e67a28]"
      >
        Register
      </Link>
    </>
  );
}

export default GuestNav;
