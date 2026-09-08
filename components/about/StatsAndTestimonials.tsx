import React from 'react';
import { HoverTestimonialsRow, TestimonialsColumn } from './StatsAndTestimonials.client';

const testimonials = [
  { text: "LlamaCorp didn't just build a website, they built our entire digital presence. The AI integration saved us months of work and fundamentally changed how we operate.", author: "Sarah Jenkins", role: "CEO, TechFlow", avatar: "https://i.pravatar.cc/150?img=12" },
  { text: "The attention to detail and premium design aesthetic elevated our brand instantly. Best agency we've ever worked with. I highly recommend them to any startup looking to scale.", author: "Marcus Thorne", role: "Founder, Minimalist", avatar: "https://i.pravatar.cc/150?img=33" },
  { text: "They understand the intersection of design, technology, and business better than anyone else in the industry.", author: "Elena Rodriguez", role: "CMO, Horizon", avatar: "https://i.pravatar.cc/150?img=47" },
  { text: "Incredible velocity. They delivered a complex platform in half the time we expected, without cutting any corners.", author: "David Chen", role: "Product Lead, Quantum", avatar: "https://i.pravatar.cc/150?img=11" },
  { text: "From the initial discovery call to the final launch, the process was seamless. The custom Framer Motion animations they added gave our site that 'Apple-like' feel we were aiming for.", author: "Jessica Wright", role: "Marketing Director", avatar: "https://i.pravatar.cc/150?img=5" },
  { text: "Their approach to SEO and programmatic content generation using AI is unparalleled. We saw a 300% increase in organic traffic within two months.", author: "Michael Chang", role: "Growth Hacker", avatar: "https://i.pravatar.cc/150?img=8" },
  { text: "Highly professional, communicative, and exceptionally talented.", author: "Rachel Adams", role: "Startup Founder", avatar: "https://i.pravatar.cc/150?img=9" },
  { text: "We were struggling to find an agency that truly understood modern SaaS aesthetics. LlamaCorp nailed it on the first iteration. The speed and quality are just phenomenal.", author: "James Peterson", role: "CTO, DataSync", avatar: "https://i.pravatar.cc/150?img=15" },
  { text: "A truly premium experience from start to finish. They act less like an external agency and more like an extension of your own product team.", author: "Nina Dobrev", role: "Creative Director", avatar: "https://i.pravatar.cc/150?img=43" }
];

export default function StatsAndTestimonials() {
  const third = Math.ceil(testimonials.length / 3);
  const col1 = testimonials.slice(0, third);
  const col2 = testimonials.slice(third, third * 2);
  const col3 = testimonials.slice(third * 2);

  return (
    <section className="w-full max-w-[1240px] mx-auto px-4 md:px-6 mb-32 pt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 px-4">
        <div className="flex flex-col gap-4">
          <div className="w-[52px] h-[52px] bg-[#111] rounded-2xl flex items-center justify-center shadow-lg relative transform rotate-[-5deg] mb-2">
             <div className="w-6 h-6 flex items-center justify-center relative z-10">
               <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#FF2A6D]">
                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
               </svg>
             </div>
          </div>
          <div>
            <h2 className="text-5xl md:text-[80px] font-bold tracking-tight text-[#111] leading-none mb-4">10+</h2>
            <p className="text-[#111] font-bold text-[16px] max-w-[200px]">Projects delivered for global brands</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 max-w-[320px]">
           <HoverTestimonialsRow testimonials={testimonials.slice(0, 4)} />
           <p className="text-[#111] font-bold text-[16px] leading-snug">
             Join 10+ brands and start scaling faster with AI-powered development
           </p>
           <button className="bg-[#111] hover:bg-black text-white text-[15px] font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg w-max">
             Start a Project
           </button>
        </div>
      </div>

      <div className="flex justify-center gap-6 overflow-hidden h-[700px] relative max-w-[1240px] mx-auto w-full" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
        <TestimonialsColumn className="flex-1 hidden md:block" testimonialsList={col1} duration={25} />
        <TestimonialsColumn className="flex-1 hidden sm:block" testimonialsList={col2} duration={32} />
        <TestimonialsColumn className="flex-1" testimonialsList={col3} duration={20} />
      </div>
    </section>
  );
}
