import React, { useRef, useState, useEffect } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';

export default function PhilosophyBanner() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#111111] py-40 px-6 relative overflow-hidden text-center my-32">
      {/* Interactive AI Field Background */}
      <div className="absolute inset-0 z-0">
        <m.div style={{ y, opacity }} className="absolute inset-0 flex items-center justify-center">
          {/* Neural lines */}
          <svg className="w-[150%] h-[150%] opacity-20" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666666" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </m.div>

        {/* Mouse follow glow */}
        <div 
          className="absolute w-96 h-96 bg-[#C4F000] rounded-full blur-[120px] opacity-10 pointer-events-none transition-transform duration-1000 ease-out z-10"
          style={{ transform: `translate(${mousePosition.x - 192}px, ${mousePosition.y - 192}px)` }}
        ></div>
        
        {/* Animated Particles (CSS based for performance) */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-30 mask-image-radial z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
        <m.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-10 leading-tight"
        >
          Technology Changes Fast.<br/>
          <span className="text-white/60">Great Design Never Stops Evolving.</span>
        </m.h2>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <a href="#contact" className="inline-block bg-[#C4F000] text-[#111111] px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(196,240,0,0.3)]">
            Let's Build Something Amazing
          </a>
        </m.div>
      </div>
    </section>
  );
}
