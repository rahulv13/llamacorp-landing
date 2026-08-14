import React, { useEffect, useState, useRef } from 'react';
import { m, useInView } from 'framer-motion';

// Simple counter hook for stats
function useCounter(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end); // Ensure we end exactly on the number
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, end, duration, start]);

  return { count, ref };
}

export default function StatsSection({ id }) {
  const stat1 = useCounter(10, 2500);
  const stat2 = useCounter(98, 2000);
  const stat3 = useCounter(24, 1500); // For 24/7
  const stat4 = useCounter(5, 1000); // For 5★

  const stats = [
    { value: stat1.count, suffix: '+', label: 'Projects Delivered', ref: stat1.ref },
    { value: stat2.count, suffix: '%', label: 'Client Satisfaction', ref: stat2.ref },
    { value: stat3.count, suffix: '/7', label: 'AI-Powered Support', ref: stat3.ref },
    { value: stat4.count, suffix: '★', label: 'Average Rating', ref: stat4.ref },
  ];

  return (
    <section id={id} className="w-full max-w-7xl mx-auto py-32 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#E8F9FF] rounded-full blur-[100px] opacity-30 pointer-events-none -z-10"></div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
        {stats.map((stat, index) => (
          <m.div 
            key={index}
            ref={stat.ref}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            className="flex flex-col items-center justify-center p-6 rounded-3xl group hover:bg-white/40 transition-colors duration-500"
          >
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#111111] mb-2 group-hover:scale-105 transition-transform duration-500">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-sm md:text-base font-medium text-[#666666] tracking-wide uppercase">
              {stat.label}
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}
