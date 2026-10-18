"use client";

import { signOut } from "next-auth/react";

function AuthenticatedNav() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-[#4d4d4d] transition hover:text-[#161616]"
    >
      Logout
    </button>
  );
}

export default AuthenticatedNav;
