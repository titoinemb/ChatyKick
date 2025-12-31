import React from "react";

export const VIP: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 16 16" xmlSpace="preserve">
    <defs>
      <linearGradient
        id="g"
        x1="8"
        y1="-163.4867"
        x2="8"
        y2="-181.56"
        gradientTransform="matrix(1 0 0 -1 0 -164)"
      >
        <stop offset="0" stopColor="rgb(255,201,0)" />
        <stop offset="0.99" stopColor="rgb(255,149,0)" />
      </linearGradient>
    </defs>

    <path
      d="M13.9 2.4v1.1h-1.2v2.3h-1.1v1.1h-1.1V4.6H9.3V1.3H6.7v3.3H5.6v2.3H4.4V5.8H3.3V3.5H2.1V2.4H0v12.3h16V2.4H13.9z"
      fill="url(#g)"
    />
  </svg>
);