"use client";
import { MdKeyboardBackspace } from "react-icons/md";
import { useRouter } from "next/navigation";

function NavigateBack({ message }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="flex items-center gap-x-2 text-lg cursor-pointer"
    >
      <MdKeyboardBackspace /> {message}
    </div>
  );
}

export default NavigateBack;
