"use client";

import Link from "next/link";
import { MdKeyboardBackspace } from "react-icons/md";
import { useRouter } from "next/navigation";

function NavigateBack({ message, href }) {
  const router = useRouter();

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex cursor-pointer items-center gap-x-2 text-lg text-[#161616] transition hover:text-amber-550"
      >
        <MdKeyboardBackspace /> {message}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex cursor-pointer items-center gap-x-2 text-lg text-[#161616] transition hover:text-amber-550"
    >
      <MdKeyboardBackspace /> {message}
    </button>
  );
}

export default NavigateBack;
