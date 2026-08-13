import React from 'react';
import { m } from 'framer-motion';
import { Sparkles, Target, Brain, HeartHandshake } from 'lucide-react';

const values = [
  {
    title: 'Innovation First',
    description: 'We constantly explore the edge of what is possible, bringing the latest technologies to your brand.',
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    title: 'Design with Purpose',
    description: 'Every pixel, animation, and interaction is crafted to serve your business goals and delight users.',
    icon: <Target className="w-5 h-5" />
  },
  {
    title: 'AI as a Creative Partner',
    description: 'We integrate AI into our workflow to work faster, smarter, and deliver unparalleled digital experiences.',
    icon: <Brain className="w-5 h-5" />
  },
  {
    title: 'Long-Term Relationships',
    description: 'We build partnerships, not just projects. Your long-term growth is the true measure of our success.',
    icon: <HeartHandshake className="w-5 h-5" />
  }
];

export default function CoreValuesSection({ id }) {
  return (
    <section id={id} className="w-full max-w-7xl mx-auto py-32 px-6">
      <m.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111111]">Our Core Values</h2>
      </m.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => (
          <m.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.15 }}
            className="group relative"
          >
            {/* Hover Glow Behind Card */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#E8F9FF] to-[#C4F000] rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md pointer-events-none"></div>
            
            {/* The Layered Glass Card */}
            <div className="glass-card relative h-full bg-white/70 rounded-3xl p-8 flex flex-col items-start gap-4 transform transition-all duration-500 hover:-translate-y-3 border border-white group-hover:border-transparent z-10 overflow-hidden">
              
              {/* Noise Texture */}
              <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              {/* Icon Container */}
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-[#FBFBFB] border border-black/5 flex items-center justify-center text-[#111111] shadow-sm mb-2 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {value.icon}
              </div>
              
              <h3 className="relative z-10 text-xl font-semibold text-[#111111]">{value.title}</h3>
              <p className="relative z-10 text-[15px] text-[#666666] leading-relaxed">
                {value.description}
              </p>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}
