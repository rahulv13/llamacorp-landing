"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LinkItem {
  label: string;
  index: number;
  href: string;
}

interface NavigationLinksProps {
  links: LinkItem[];
}

export function NavigationLinks({ links }: NavigationLinksProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getTranslateX = (index: number) => {
    if (hoveredIndex === null) return 0;
    const diff = index - hoveredIndex;
    if (diff === -1) return 12;
    if (diff === 1) return -12;
    if (diff === -2) return 6;
    if (diff === 2) return -6;
    return 0;
  };

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    if (index === hoveredIndex) return 1.15;
    if (Math.abs(index - hoveredIndex) === 1) return 1.05;
    return 1;
  };

  const springConfig = {
    type: 'spring' as const,
    stiffness: 450,
    damping: 25,
    mass: 1,
  };

  return (
    <div 
      className="hidden md:flex items-center gap-6 flex-1 justify-center"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {links.map((item) => (
        <motion.div
          key={item.label}
          onMouseEnter={() => setHoveredIndex(item.index)}
          animate={{
            x: getTranslateX(item.index),
            scale: getScale(item.index),
          }}
          transition={springConfig}
        >
          <Link
            href={item.href || '#'}
            className="text-[#111] no-underline text-[14px] font-medium transition-colors hover:text-[#555] px-2 py-1 cursor-pointer block"
          >
            {item.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
