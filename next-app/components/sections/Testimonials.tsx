import Image from 'next/image';
import React from 'react';
import TestimonialsAnimated from './TestimonialsAnimated.client';

export default function Testimonials() {
  return (
    <section className="w-full bg-[#f5f5f7] py-24 px-5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Header / Navbar Area */}
        <div className="flex flex-col items-center mb-16 text-center z-30 relative">
          <div className="inline-flex items-center gap-2 bg-[#111] text-white px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            TESTIMONIALS
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
          </div>
          
          <h2 className="text-[2.8rem] md:text-[4rem] font-bold text-[#111] tracking-tight leading-[1.1] mb-6">
            How we helped <br className="hidden md:block" /> our <span className="line-through text-gray-400 decoration-gray-400 decoration-4">clients</span> partners
          </h2>
          
          <p className="text-[#555] text-[1.1rem] md:text-[1.25rem] max-w-[600px] leading-relaxed">
            Fortunate to not just work together, but build connections that last a lifetime.
          </p>
        </div>

        {/* Testimonial Carousel Area */}
        <TestimonialsAnimated />

      </div>
    </section>
  );
}
