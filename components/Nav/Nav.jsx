"use client";
import Link from "next/link";
import GuestNav from "./GuestNav";
import AuthenticatedNav from "./AuthenticatedNav";
import { useSession } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between border-b px-2 py-3 text-sm shadow-sm md:text-base md:px-4">
      <Link href="/" className="text-sm mr-2 font-bold uppercase md:text-2xl">
        #VanLife
      </Link>
      <nav className="flex items-center gap-2 md:gap-8">
        <Link href="/host">Host</Link>
        <Link href="/about">About</Link>
        <Link href="/vans">Vans</Link>
        {!session?.user ? <GuestNav /> : <AuthenticatedNav />}
      </nav>
    </div>
  );
}

export default Nav;
