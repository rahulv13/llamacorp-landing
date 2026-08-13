import React from 'react';
import { m } from 'framer-motion';

export default function FounderSection({ id }) {
  return (
    <section id={id} className="w-full max-w-7xl mx-auto py-40 px-6 flex flex-col items-center">
      
      <m.div 
        className="text-center mb-20 max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111]">Meet the Vision<br/>Behind LlamaCorp</h2>
      </m.div>

      <div className="flex flex-col items-center max-w-xl w-full">
        {/* Cinematic Portrait Card */}
        <m.div 
          className="relative w-48 h-64 md:w-56 md:h-72 mb-12 rounded-[2rem] overflow-hidden group shadow-2xl shadow-black/5"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[#F5F5F5]">
            <img src="/Rahul.png" alt="Founder Portrait" className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>
          
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
          
          <div className="absolute bottom-4 left-4 right-4 glass-card bg-white/20 border-white/40 p-3 rounded-xl backdrop-blur-md flex items-center justify-between">
            <span className="text-white text-xs font-medium tracking-wide">FOUNDER</span>
            <span className="text-white/80 text-[10px] uppercase font-mono tracking-widest">ID: 001</span>
          </div>
        </m.div>

        {/* Minimal Quote */}
        <m.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-[#111111] font-medium leading-snug mb-8">
            "Innovation isn't just about using new tools; it's about reshaping how we interact with the digital world. AI and design are the new canvas."
          </p>
          <div className="font-mono text-[#666666] text-sm uppercase tracking-widest mb-16">
            Rahul Vishwakarma
          </div>
        </m.div>

        {/* Achievements / Philosophy */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Focus', value: 'AI & Design' },
            { label: 'Philosophy', value: 'Less is More' },
            { label: 'Experience', value: '10+ Years' },
            { label: 'Products', value: 'Built to Last' }
          ].map((item, index) => (
            <m.div 
              key={index}
              className="text-center p-4 border-t border-black/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1), ease: "easeOut" }}
            >
              <div className="text-[10px] text-[#666666] uppercase tracking-widest mb-1">{item.label}</div>
              <div className="text-sm font-semibold text-[#111111]">{item.value}</div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
