import React from 'react';
import { m } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto flex flex-col items-center text-center px-6 pb-12 pt-10">
      
      {/* Top Capsule Tags */}
      <m.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-3 mb-10 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#666] border-b border-black/10 pb-4"
      >
        <div className="flex items-center gap-2">
          <img src="/logo2.svg" alt="Logo" className="w-4 h-4 grayscale opacity-60" />
          <span>LlamaCorp</span>
        </div>
        <span className="text-black/20">•</span>
        <span>Premium Design</span>
        <span className="text-black/20">•</span>
        <span>AI-Powered</span>
        <span className="text-black/20">•</span>
        <span>Top Rated</span>
      </m.div>

      {/* Main Headline */}
      <m.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.04em] font-bold text-[#111111] max-w-[800px] mx-auto mb-6"
      >
        We Build Brands That Feel Ahead of Their Time
      </m.h1>

      {/* Subheadline & Tag */}
      <m.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        <p className="text-[#666666] text-sm md:text-base max-w-[480px] leading-relaxed">
          AI-powered websites, branding, automation, and marketing crafted to help ambitious businesses grow faster.
        </p>
        
        <div className="mt-6 flex justify-center w-full">
          <a 
            href="mailto:llamacorp8@gmail.com?subject=Discovery%20Call" 
            className="inline-flex items-center p-[2px] pr-[8px] gap-[7px] rounded-[9px] bg-[#C4E88B] border-2 border-[rgba(90,130,45,0.45)] shadow-[0_1px_3px_rgba(40,70,20,0.08)] hover:shadow-[0_4px_12px_rgba(40,70,20,0.15)] hover:-translate-y-[1px] transition-all duration-[180ms] cursor-pointer no-underline group"
          >
            <div className="bg-[#e4f4c8] text-[#161616] text-[12px] font-medium tracking-[-0.04em] leading-[20px] px-[9px] h-[22px] flex items-center justify-center rounded-[6px]">
              New
            </div>
            <div className="text-[13px] font-medium text-[#161616] tracking-[-0.04em] leading-[20px] whitespace-nowrap">
              Book a free discovery call today
            </div>
          </a>
        </div>
      </m.div>
      
    </section>
  );
}
