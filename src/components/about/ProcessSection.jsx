import React from 'react';
import { m } from 'framer-motion';

const steps = [
  { number: '01', title: 'Discover', description: 'Understand the business, audience, and goals.' },
  { number: '02', title: 'Design', description: 'Create beautiful interfaces and user experiences.' },
  { number: '03', title: 'Build', description: 'Develop high-performance websites with modern technologies.' },
  { number: '04', title: 'Grow', description: 'Optimize through SEO, AI, analytics, and continuous improvements.' }
];

export default function ProcessSection({ id }) {
  return (
    <section id={id} className="w-full max-w-7xl mx-auto py-32 px-6">
      <m.div 
        className="text-center mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111111]">Our Process</h2>
      </m.div>

      <div className="relative">
        {/* Connecting Line Desktop */}
        <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <m.div 
              key={index}
              className="relative flex flex-col items-center lg:items-start group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.15 }}
            >
              {/* Number Circle */}
              <div className="w-16 h-16 rounded-full bg-white border border-[#111111]/10 flex items-center justify-center mb-8 relative z-10 shadow-sm group-hover:scale-110 group-hover:border-[#C4F000] transition-all duration-500">
                <span className="text-xl font-bold text-[#111111]">{step.number}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E8F9FF] to-[#C4F000] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>
              
              <div className="glass-card bg-white/50 w-full rounded-2xl p-6 text-center lg:text-left transform group-hover:-translate-y-2 transition-transform duration-500 border border-white">
                <h3 className="text-xl font-semibold text-[#111111] mb-3">{step.title}</h3>
                <p className="text-[15px] text-[#666666] leading-relaxed">{step.description}</p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
