import React from "react";

export const OG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 16 16" xmlSpace="preserve">
    <defs>
      <linearGradient
        id="g1"
        x1="12.2"
        y1="-180"
        x2="12.2"
        y2="-165.2556"
        gradientTransform="matrix(1 0 0 -1 0 -164)"
      >
        <stop offset="0" stopColor="#00FFF2" />
        <stop offset="0.99" stopColor="#006399" />
      </linearGradient>
      <linearGradient
        id="g2"
        x1="3.7636"
        y1="-164.265"
        x2="4.0623"
        y2="-179.9352"
        gradientTransform="matrix(1 0 0 -1 0 -164)"
      >
        <stop offset="0" stopColor="#00FFF2" />
        <stop offset="0.99" stopColor="#006399" />
      </linearGradient>
    </defs>

    <path fill="url(#g1)" d="M16 16H9.2v-.8H8.4v-8h.8V6.4H16v3.2h-4.5v4.8H13v-1.6h-.8v-1.6H16z" />
    <path fill="url(#g2)" d="M6.8 8.8v.8h-6V8.8H0v-8h.8V0h6.1v.8h.8v8H6.8zM4.5 6.4V1.6H3v4.8H4.5z" />
    <path fill="#00FFF2" d="M6.8 15.2V16h-6v-.8H0V8.8h.8V8h6.1v.8h.8v6.4zM4.5 14.4V9.6H3v4.8z" />
    <path fill="#00FFF2" d="M16 8H9.2V7.2H8.4V.8h.8V0H16v1.6h-4.5v4.8H13V4.8h-.8V3.2H16z" />
  </svg>
);