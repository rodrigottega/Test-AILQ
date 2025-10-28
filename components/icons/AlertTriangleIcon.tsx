import * as React from 'react';

export const AlertTriangleIcon: React.FC = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    aria-hidden="true"
    className="text-[#BA7C00]"
  >
    <path 
      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    ></path>
    <line 
      x1="12" y1="9" x2="12" y2="13" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    ></line>
    <line 
      x1="12" y1="17" x2="12.01" y2="17" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    ></line>
  </svg>
);