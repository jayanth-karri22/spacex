import * as React from "react";
import PxToRem from "../../utils/PxToRem";

function DownArrow(props) {
  return (
    <svg
      width={PxToRem(10)}
      height={PxToRem(6)}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 3.781l3.3-3.3.943.943L5 5.667.757 1.424 1.7.481l3.3 3.3z"
        fill="#4B5563"
      />
    </svg>
  );
}

export default DownArrow;
