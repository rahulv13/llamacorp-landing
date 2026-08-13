import React from 'react';
import { m } from 'framer-motion';

const testimonials = [
  { text: "LlamaCorp didn't just build a website, they built our entire digital presence. The AI integration saved us months of work and fundamentally changed how we operate.", author: "Sarah Jenkins", role: "CEO, TechFlow", avatar: "https://i.pravatar.cc/150?img=12" },
  { text: "The attention to detail and premium design aesthetic elevated our brand instantly. Best agency we've ever worked with. I highly recommend them to any startup looking to scale.", author: "Marcus Thorne", role: "Founder, Minimalist", avatar: "https://i.pravatar.cc/150?img=33" },
  { text: "They understand the intersection of design, technology, and business better than anyone else in the industry.", author: "Elena Rodriguez", role: "CMO, Horizon", avatar: "https://i.pravatar.cc/150?img=47" },
  { text: "Incredible velocity. They delivered a complex platform in half the time we expected, without cutting any corners.", author: "David Chen", role: "Product Lead, Quantum", avatar: "https://i.pravatar.cc/150?img=11" },
  { text: "From the initial discovery call to the final launch, the process was seamless. The custom Framer Motion animations they added gave our site that 'Apple-like' feel we were aiming for.", author: "Jessica Wright", role: "Marketing Director", avatar: "https://i.pravatar.cc/150?img=5" },
  { text: "Their approach to SEO and programmatic content generation using AI is unparalleled. We saw a 300% increase in organic traffic within two months.", author: "Michael Chang", role: "Growth Hacker", avatar: "https://i.pravatar.cc/150?img=8" },
  { text: "Highly professional, communicative, and exceptionally talented.", author: "Rachel Adams", role: "Startup Founder", avatar: "https://i.pravatar.cc/150?img=9" }
];

export default function StatsAndTestimonials() {
  return (
    <section className="w-full max-w-[1240px] mx-auto px-4 md:px-6 mb-32">
      
      {/* Top Stats & CTA Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-8 mb-16 px-4">
        
        {/* Left Stat */}
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 bg-[#111] rounded-xl flex items-center justify-center shadow-lg relative transform rotate-[-5deg]">
             {/* Small pink heart icon matching reference */}
             <div className="w-5 h-5 flex items-center justify-center relative">
               <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#FF2A6D] animate-pulse">
                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
               </svg>
             </div>
             {/* Pink glow behind icon */}
             <div className="absolute inset-0 bg-[#FF2A6D] blur-xl opacity-30"></div>
          </div>
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#111111]">150+</h2>
            <p className="text-[#111] font-semibold text-sm md:text-base mt-2">Projects delivered for global brands</p>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex flex-col gap-4 max-w-[280px] md:text-right md:items-end">
           <p className="text-[#111] font-semibold text-sm leading-snug">
             Ready to elevate your digital presence and outpace the competition?
           </p>
           <button className="bg-[#111] hover:bg-[#222] text-white text-[13px] font-semibold px-6 py-3 rounded-full transition-colors w-max">
             Start a Project
           </button>
        </div>

      </div>

      {/* Masonry Testimonials Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {testimonials.map((t, index) => (
          <m.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="break-inside-avoid bg-white border border-gray-200/80 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-300"
          >
            <p className="text-[13px] md:text-[14px] text-[#444] leading-relaxed mb-6 font-medium">
              "{t.text}"
            </p>
            
            <div className="flex items-center justify-between mt-4">
               <div>
                  <div className="flex gap-0.5 mb-1">
                    {[1,2,3,4,5].map(star => (
                      <span key={star} className="text-[#111] text-[10px]">★</span>
                    ))}
                  </div>
                  <h4 className="text-[11px] font-bold text-[#111] uppercase tracking-wide">{t.author}</h4>
                  <p className="text-[10px] text-[#888]">{t.role}</p>
               </div>
               
               <img src={t.avatar} alt={t.author} className="w-8 h-8 rounded-full border border-gray-200" />
            </div>
            
            {/* Some cards get the little colorful corner icon from the reference */}
            {index % 3 === 1 && (
              <div className="absolute bottom-4 right-4 w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center">
                 <span className="text-blue-500 text-xs">✌️</span>
              </div>
            )}
            {index === 4 && (
              <div className="absolute bottom-4 right-4 w-6 h-6 rounded-md bg-pink-500/10 flex items-center justify-center">
                 <span className="text-pink-500 text-xs">💖</span>
              </div>
            )}
          </m.div>
        ))}
      </div>
      
    </section>
  );
}
