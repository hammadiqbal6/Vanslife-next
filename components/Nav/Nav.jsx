"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import GuestNav from "./GuestNav";
import AuthenticatedNav from "./AuthenticatedNav";

const links = [
  { href: "/host", label: "Host" },
  { href: "/about", label: "About" },
  { href: "/vans", label: "Vans" },
];

function Nav() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 border-b border-[#ead9c8] bg-[#fff7ed]/95 px-3 py-3 text-sm shadow-sm backdrop-blur md:px-6 md:text-base">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link
          href="/"
          className="font-display text-lg font-bold uppercase tracking-tight text-[#161616] md:text-2xl"
        >
          #VanLife
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-3 md:gap-7">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "font-semibold text-[#161616] underline underline-offset-4"
                    : "text-[#4d4d4d] transition hover:text-[#161616]"
                }
              >
                {link.label}
              </Link>
            );
          })}
          {!session?.user ? <GuestNav /> : <AuthenticatedNav />}
        </nav>
      </div>
    </div>
  );
}

export default Nav;
