import React, { useMemo } from 'react';
import { m } from 'framer-motion';

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
    <footer className="w-full bg-[#111111] pt-32 pb-8 px-6 relative overflow-hidden rounded-t-[3rem] mt-10">
      
      {/* Blue Square Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <m.div
            key={p.id}
            className="absolute w-2 h-2 bg-[#2A6BFF]"
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
        {/* Soft glow in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2A6BFF] blur-[150px] opacity-[0.08]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center mb-32">
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
          <a href="#start" className="inline-flex items-center gap-2 bg-white text-[#111111] px-6 py-3.5 rounded-full font-bold text-[14px] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="text-xl leading-none">✨</span>
            Start Building Today
          </a>
        </m.div>
      </div>

      {/* Bottom Footer Area */}
      <div className="relative z-10 max-w-[1240px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo / Company */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF2A6D] to-[#2A6BFF] flex items-center justify-center">
            <img src="/logo2.svg" alt="Llamacorp" className="w-5 h-5 filter brightness-0 invert" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-white font-bold text-[15px] leading-tight tracking-wide">LlamaCorp</span>
            <span className="text-white/40 text-[11px] uppercase tracking-widest font-semibold mt-0.5">Design & Code</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-semibold uppercase tracking-wider text-white/50">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/work" className="hover:text-white transition-colors">Our Work</a>
          <a href="/about" className="text-white">About Us</a>
          <a href="/services" className="hover:text-white transition-colors">Services</a>
          <a href="/blog" className="hover:text-white transition-colors">Web Design Blog</a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {['Tw', 'In', 'Wa', 'Li'].map((social, idx) => (
             <a key={idx} href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors text-[10px] font-bold">
               {social}
             </a>
          ))}
        </div>
        
      </div>
    </footer>
  );
}
