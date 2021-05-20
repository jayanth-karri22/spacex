import * as React from "react";
import PxToRem from "../../utils/PxToRem";

function Filter(props) {
  return (
    <svg
      width={PxToRem(12)}
      height={PxToRem(13)}
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 .667V2h-.667L8 7v5.667H4V7L.667 2H0V.667h12zM2.27 2l3.063 4.596v4.737h1.334V6.596L9.73 2H2.269z"
        fill="#4B5563"
      />
    </svg>
  );
}

export default Filter;
