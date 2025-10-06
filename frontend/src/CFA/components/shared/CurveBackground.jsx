import React from "react";

function CurveBackground() {
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full object-cover z-10 pointer-events-none"
      viewBox="0 0 100 10"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF6B6B" />
          <stop offset="100%" stop-color="#A8272C" />
        </linearGradient>

        <filter id="waveBlur" x="-20%" y="-50%" width="150%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>

      <path
        d="M0 10 Q 20 -2, 50 4.5 T 100 0"
        fill="none"
        stroke="url(#waveGradient)"
        stroke-width="1.5"
        filter="url(#waveBlur)"
      />
    </svg>
  );
}

export default CurveBackground;