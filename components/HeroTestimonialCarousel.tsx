"use client";

import { useState, useEffect } from 'react';

const testimonials = [
  {
      text: "“Llamacorp turned our idea into a polished product in days.”",
      avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
      text: "“The design feels premium and the site performs beautifully.”",
      avatar: "https://i.pravatar.cc/150?img=33"
  },
  {
      text: "“Fast, thoughtful, and far beyond a standard agency experience.”",
      avatar: "https://i.pravatar.cc/150?img=47"
  }
];

export default function HeroTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const intervalId = setInterval(() => {
      setExitingIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      
      setTimeout(() => {
        setExitingIndex(null);
      }, 600); // Wait for exit animation
    }, 4500);

    return () => clearInterval(intervalId);
  }, [currentIndex, isReducedMotion]);

  return (
    <>
      {testimonials.map((t, index) => {
        const isActive = index === currentIndex;
        const isExiting = index === exitingIndex;
        
        if (!isActive && !isExiting && !isReducedMotion) return null;
        if (isReducedMotion && index !== 0) return null;

        return (
          <div 
            key={index}
            className={`
              absolute bg-white rounded-full py-1.5 pr-4 pl-1.5 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] pointer-events-none w-max max-w-[calc(100vw-32px)] md:max-w-[90vw]
              ${isReducedMotion ? 'opacity-100 transform-none pointer-events-auto' : ''}
              ${!isReducedMotion && isActive ? 'animate-in fade-in slide-in-from-bottom-6 duration-700 pointer-events-auto' : ''}
              ${!isReducedMotion && isExiting ? 'animate-out fade-out slide-out-to-top-6 duration-500' : ''}
            `}
            style={!isReducedMotion && isActive ? { transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' } : {}}
          >
            <img src={t.avatar} alt="" className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover shrink-0" />
            <span className="text-[11px] md:text-[13px] font-medium text-[#555] truncate">{t.text}</span>
          </div>
        );
      })}
    </>
  );
}
