"use client";

import React, { useMemo } from 'react';
import { m } from 'framer-motion';
import { NoiseBackground } from '../ui/NoiseBackground';
import rahulAvatar from "../../public/Rahul.png";
import Image from 'next/image';
import Link from 'next/link';
export default function ParticleFooter() {
  const currentYear = new Date().getFullYear();

  // Generate random particles for the background
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 80}%`, // Keep mostly in the upper 80%
      opacity: Math.random() * 0.5 + 0.1, // 0.1 to 0.6
      scale: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10, // 10 to 20s
    }));
  }, []);

  return (
    <NoiseBackground as="footer" className="pt-32 mt-10 rounded-t-[3rem] flex flex-col justify-between">
      

      {/* Blue Square Particles Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <m.div
            key={p.id}
            className="absolute w-2 h-2 bg-white/20"
            style={{ 
              left: p.left, 
              top: p.top,
              opacity: p.opacity,
              scale: p.scale
            }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: p.duration, 
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center mb-32 px-6">
        <m.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-white mb-8 leading-[1.1]"
        >
          Become a Design<br />
          Professional, Not<br />
          Just a Pixel Mover
        </m.h2>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.1 }}
        >
          <a 
            href="mailto:llamacorp8@gmail.com?subject=New%20Project%20Inquiry%20from%20Llamacorp&body=Hi%20Llamacorp%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project.%0A%0AName%3A%0ACompany%3A%0AProject%20details%3A%0ABudget%3A%0ATimeline%3A" 
            className="group flex items-center justify-center gap-3 bg-white text-[#111] py-4 px-8 rounded-full text-[15px] font-semibold transition-all hover:bg-neutral-100 hover:scale-[1.02] shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer no-underline"
          >
            <Image src={rahulAvatar} alt="Llamacorp avatar" className="w-6 h-6 rounded-full object-cover" />
            Start a project
          </a>
        </m.div>
      </div>

    </NoiseBackground>
  );
}
