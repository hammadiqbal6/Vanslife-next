import Link from "next/link";

export default function VanNotFound() {
  return (
    <div className="wrapper flex flex-col items-center justify-center text-center">
      <h1 className="font-display text-3xl font-bold">Van not found</h1>
      <p className="mt-2 text-[#4d4d4d]">
        That listing may have been removed or never existed.
      </p>
      <Link
        href="/vans"
        className="mt-6 rounded-lg bg-amber-550 px-5 py-3 font-semibold text-white"
      >
        Browse vans
      </Link>
    </div>
  );
}
