import React from "react";
import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <div className="wrapper flex flex-col justify-center items-center">
      <Oval color="green" height={100} width={100} strokeWidth={2} />
    </div>
  );
}

export default Loader;
