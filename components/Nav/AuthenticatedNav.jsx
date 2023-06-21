import { signOut } from "next-auth/react";
import Link from "next/link";

function AuthenticatedNav() {
  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        signOut();
      }}
    >
      Logout
    </Link>
  );
}

export default AuthenticatedNav;
