"use client";

import { useState, useEffect } from 'react';

interface AnimatedColumnProps {
  animClass: string;
  originalChildren: React.ReactNode;
  duplicateChildren: React.ReactNode;
}

export default function AnimatedColumn({ animClass, originalChildren, duplicateChildren }: AnimatedColumnProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className={`w-full flex flex-col ${isReducedMotion ? '' : animClass} ${isReducedMotion ? '' : 'hover-pause'}`}>
      {/* Original Set */}
      <div className="w-full flex flex-col">
        {originalChildren}
      </div>
      {/* Duplicated Set for Infinite Loop */}
      {!isReducedMotion && (
        <div className="w-full flex flex-col" aria-hidden="true">
          {duplicateChildren}
        </div>
      )}
    </div>
  );
}
