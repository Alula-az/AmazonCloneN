import React from "react";
import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <div 
    style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50vh",
}
    }>
      <PulseLoader color="#f79b34" />
    </div>
  );
};

export default Loader;
