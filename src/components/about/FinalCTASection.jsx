import React from 'react';
import { m } from 'framer-motion';

export default function FinalCTASection({ id }) {
  return (
    <section id={id} className="w-full max-w-7xl mx-auto py-40 px-6 relative flex flex-col items-center">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 rounded-[3rem]">
        <m.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square rounded-full bg-gradient-to-tr from-[#E8F9FF] to-[#C4F000]/30 blur-[120px] opacity-50"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <m.div 
        className="text-center max-w-3xl flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111111] mb-6 leading-tight">
          Ready to build your next digital experience?
        </h2>
        <p className="text-xl text-[#666666] mb-12 max-w-2xl">
          Let's turn your ideas into exceptional digital products powered by creativity and AI.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a href="mailto:llamacorp8@gmail.com" className="bg-[#111111] text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-300 shadow-xl shadow-black/10">
            Start Project
          </a>
          <a href="https://cal.com/llamacorp" target="_blank" rel="noopener noreferrer" className="bg-white text-[#111111] border border-black/10 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-colors duration-300">
            Schedule Call
          </a>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1 text-[#C4F000] text-sm">
            ★★★★★
          </div>
          <div className="text-sm font-medium text-[#111111]">Usually replies within 24 hours</div>
          <div className="text-xs text-[#666666] uppercase tracking-wider mt-1">Trusted by startups & businesses</div>
        </div>
      </m.div>
    </section>
  );
}
