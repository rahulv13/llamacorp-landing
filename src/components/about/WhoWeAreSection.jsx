import React from 'react';
import { m } from 'framer-motion';

export default function WhoWeAreSection({ id }) {
  return (
    <section id={id} className="w-full max-w-7xl mx-auto py-32 px-6 flex flex-col md:flex-row items-center gap-16">
      
      {/* Left side text */}
      <m.div 
        className="flex-1 flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
          Small Team.<br/>Big Ideas.<br/>Smarter Execution.
        </h2>
        <p className="text-lg text-[#666666] leading-relaxed max-w-md">
          LlamaCorp combines premium creativity with advanced AI to deliver websites, branding, SEO, and automation that help businesses stand out in an increasingly crowded digital landscape.
        </p>
      </m.div>

      {/* Right side illustration */}
      <m.div 
        className="flex-1 relative w-full aspect-square md:aspect-[4/3]"
        initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F9FF] to-transparent rounded-3xl opacity-50 blur-3xl mix-blend-multiply"></div>
        
        <div className="absolute inset-4 glass-card rounded-3xl flex items-center justify-center group">
          <m.div 
            className="absolute inset-0 bg-noise opacity-[0.03] rounded-3xl"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          ></m.div>
          
          <div className="relative z-10 grid grid-cols-2 gap-4 p-8 w-full h-full">
            <div className="bg-white/60 rounded-2xl shadow-sm border border-white/80 p-4 transform transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
              <div className="w-8 h-8 rounded-full bg-[#C4F000]/40 mb-4"></div>
              <div className="w-full h-2 bg-[#111]/10 rounded-full mb-2"></div>
              <div className="w-2/3 h-2 bg-[#111]/10 rounded-full"></div>
            </div>
            
            <div className="bg-[#111111]/5 rounded-2xl border border-black/5 p-4 transform transition-transform group-hover:-translate-y-2 group-hover:translate-x-2 flex flex-col justify-end">
              <div className="w-full h-12 bg-white/50 rounded-xl"></div>
            </div>
            
            <div className="bg-gradient-to-tr from-[#E8F9FF] to-white rounded-2xl border border-white p-4 transform transition-transform group-hover:translate-y-2 group-hover:-translate-x-2">
               <div className="text-[10px] font-mono text-[#666]">AI NODE_01</div>
            </div>
            
            <div className="glass-card rounded-2xl border border-white p-4 transform transition-transform group-hover:translate-y-2 group-hover:translate-x-2 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-[#C4F000] border-dashed flex items-center justify-center animate-spin-slow">
                 <div className="w-2 h-2 rounded-full bg-[#111]"></div>
              </div>
            </div>
          </div>
        </div>
      </m.div>

    </section>
  );
}
