"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";

function GuestNav() {
  return (
    <>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </>
  );
}

export default GuestNav;
