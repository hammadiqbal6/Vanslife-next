"use client";

import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <div className="wrapper flex flex-col items-center justify-center">
      <Oval
        color="#ff8c38"
        secondaryColor="#ffead0"
        height={72}
        width={72}
        strokeWidth={3}
      />
      <p className="mt-4 text-sm text-[#4d4d4d]">Loading…</p>
    </div>
  );
}

export default Loader;
