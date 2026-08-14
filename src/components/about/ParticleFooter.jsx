import React, { useMemo } from 'react';
import { m } from 'framer-motion';
import { NoiseBackground } from '../ui/NoiseBackground';


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
          <a href="#start" className="inline-flex items-center gap-2 bg-white text-[#111111] px-6 py-3.5 rounded-full font-bold text-[14px] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="text-xl leading-none">✨</span>
            Start Building Today
          </a>
        </m.div>
      </div>

      {/* Footer Strip matching main page */}
      <div className="w-full border-t border-white/10 relative z-10 bg-black/20 backdrop-blur-md">
        <div className="w-full px-6 md:px-12 lg:px-24 py-8 flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left text-white/50 text-sm">
            <span className="text-white font-semibold text-lg tracking-tight">Llamacorp</span>
            <span className="hidden md:inline text-white/20">•</span>
            <span>© 2026 Llamacorp. Built for ambitious ideas.</span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-white/50 font-medium">
            <a href="/work" className="hover:text-white transition-colors">Work</a>
            <a href="/#services" className="hover:text-white transition-colors">Services</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <a href="/#faqs" className="hover:text-white transition-colors">FAQ</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            
            <div className="flex items-center justify-center gap-4 ml-0 md:ml-2 border-l-0 md:border-l border-white/10 pl-0 md:pl-6 w-full md:w-auto mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://www.instagram.com/llamacorp1/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </NoiseBackground>
  );
}
