import * as React from 'react';
import PxToRem from '../../utils/PxToRem';

function Calendar(props) {
  return (
    <svg
      width={PxToRem(14)}
      height={PxToRem(14)}
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        d='M10.333 2H13a.667.667 0 01.666.667v10.666A.667.667 0 0113 14H1a.667.667 0 01-.667-.667V2.667A.667.667 0 011 2h2.666V.667H5V2h4V.667h1.333V2zM9 3.333H5v1.334H3.666V3.333h-2V6h10.667V3.333h-2v1.334H9V3.333zm3.333 4H1.666v5.334h10.667V7.333z'
        fill='#4B5563'
      />
    </svg>
  );
}

export default Calendar;
