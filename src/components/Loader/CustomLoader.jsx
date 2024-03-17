import React from "react";
import Loading from "react-loading";
function CustomLoader({ size, color,type="spin" }) {
  return (
    <span className="flex justify-center items-center">
      <Loading height={size} width={size} color={color} type={type} />
    </span>
  );
}

export default CustomLoader;
