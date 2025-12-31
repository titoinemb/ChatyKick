import React from "react";
import { AddProps } from "@types";

export const Add: React.FC<AddProps> = ({ transform, width, height }) => (
  <svg style={{ transform: transform }} width={width} height={height} viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 6.99204L25.008 4L16 12.9973L6.99204 4L4 6.99204L12.9973 16L4 25.008L6.99204 28L16 19.0027L25.008 28L28 25.008L19.0027 16L28 6.99204Z" fill="current"></path>
  </svg>
);