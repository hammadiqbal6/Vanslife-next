import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrapper flex flex-col items-center justify-center text-center">
      <h1 className="font-display text-4xl font-bold">Page not found</h1>
      <p className="mt-2 text-[#4d4d4d]">
        That trail doesn&apos;t lead anywhere. Head back to camp.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-amber-550 px-5 py-3 font-semibold text-white"
      >
        Go home
      </Link>
    </div>
  );
}
