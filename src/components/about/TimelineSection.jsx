import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';

const milestones = [
  { year: '2022', title: 'Started LlamaCorp', description: 'Founded with a vision to redefine digital experiences.' },
  { year: '2023', title: 'First Client', description: 'Delivered our first premium web application.' },
  { year: '2024', title: 'AI Services', description: 'Integrated advanced AI workflows into our offerings.' },
  { year: '2025', title: 'Automation', description: 'Expanded into business process automation.' },
  { year: 'Beyond', title: 'Future', description: 'Building the next generation of digital products.' },
];

export default function TimelineSection({ id }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineWidth = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "100%"]);

  return (
    <section id={id} ref={containerRef} className="w-full max-w-7xl mx-auto py-32 px-6 overflow-hidden">
      <div className="text-center mb-24">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111111]">Our Journey</h2>
      </div>

      <div className="relative w-full hidden md:block mt-12 pb-20">
        {/* Background Line */}
        <div className="absolute top-[28px] left-0 w-full h-[1px] bg-black/10"></div>
        
        {/* Animated Fill Line */}
        <m.div 
          style={{ width: lineWidth }} 
          className="absolute top-[28px] left-0 h-[2px] bg-[#111111] shadow-[0_0_10px_rgba(17,17,17,0.3)] origin-left"
        ></m.div>

        <div className="relative flex justify-between w-full">
          {milestones.map((milestone, index) => (
            <m.div 
              key={index} 
              className="flex flex-col items-center w-48 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.15 }}
            >
              {/* Dot */}
              <div className="w-14 h-14 rounded-full bg-[#FBFBFB] border border-black/10 flex items-center justify-center z-10 shadow-sm relative group cursor-default">
                <div className="absolute inset-0 rounded-full bg-[#111111] scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <span className="text-sm font-semibold text-[#111111] group-hover:text-white transition-colors duration-300 relative z-10">{milestone.year}</span>
              </div>
              
              {/* Content */}
              <div className="mt-8 text-center">
                <h3 className="text-lg font-semibold text-[#111111] mb-2">{milestone.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{milestone.description}</p>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="md:hidden flex flex-col gap-12 relative pl-8">
        <div className="absolute top-0 bottom-0 left-[15px] w-[1px] bg-black/10"></div>
        <m.div 
          style={{ height: lineWidth }} 
          className="absolute top-0 left-[15px] w-[2px] bg-[#111111] shadow-[0_0_10px_rgba(17,17,17,0.3)] origin-top"
        ></m.div>

        {milestones.map((milestone, index) => (
          <m.div 
            key={index}
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
          >
            <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-[#FBFBFB] border border-black/10 flex items-center justify-center z-10 shadow-sm">
              <span className="text-xs font-semibold text-[#111111]">{milestone.year}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">{milestone.title}</h3>
              <p className="text-sm text-[#666666] leading-relaxed">{milestone.description}</p>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}
