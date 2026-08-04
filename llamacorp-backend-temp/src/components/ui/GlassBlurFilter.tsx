import React from 'react';

export const GlassBlurFilter = () => (
  <svg className="hidden pointer-events-none absolute w-0 h-0" aria-hidden="true">
    <defs>
      <filter
        id="glass-blur"
        x="0"
        y="0"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.003 0.007"
          numOctaves="1"
          result="turbulence"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="12"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacement"
        />
        <feGaussianBlur in="displacement" stdDeviation="1" />
      </filter>
    </defs>
  </svg>
);
