import React from 'react';
import { m } from 'framer-motion';

const testimonials = [
  { text: "LlamaCorp didn't just build a website, they built our entire digital presence. The AI integration saved us months of work.", author: "Sarah Jenkins", role: "CEO, TechFlow", rating: 5 },
  { text: "The attention to detail and premium design aesthetic elevated our brand instantly. Best agency we've ever worked with.", author: "Marcus Thorne", role: "Founder, Minimalist", rating: 5 },
  { text: "They understand the intersection of design, technology, and business better than anyone else in the industry.", author: "Elena Rodriguez", role: "CMO, Horizon", rating: 5 },
  { text: "Incredible velocity. They delivered a complex platform in half the time we expected, without cutting any corners.", author: "David Chen", role: "Product Lead, Quantum", rating: 5 },
];

export default function TestimonialsSection({ id }) {
  return (
    <section id={id} className="w-full max-w-7xl mx-auto py-32 px-6">
      <m.div 
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111111]">What Our Clients Say</h2>
      </m.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <m.div
            key={index}
            className={`glass-card p-8 md:p-10 rounded-[2rem] border border-black/5 bg-white/50 ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
            initial={{ opacity: 0, scale: 0.9, rotate: 2, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
          >
            <div className="flex gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-[#C4F000] text-lg">★</span>
              ))}
            </div>
            
            <p className="text-lg md:text-xl text-[#111111] font-medium leading-relaxed mb-8">
              "{testimonial.text}"
            </p>
            
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E8F9FF] to-gray-200"></div>
              <div>
                <div className="font-semibold text-[#111111] text-sm">{testimonial.author}</div>
                <div className="text-xs text-[#666666]">{testimonial.role}</div>
              </div>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}
