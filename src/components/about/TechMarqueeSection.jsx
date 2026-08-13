import React from 'react';

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Tailwind', category: 'Styling' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Framer', category: 'Motion' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'OpenAI', category: 'AI' },
  { name: 'Gemini', category: 'AI' },
  { name: 'Vercel', category: 'Hosting' },
];

export default function TechMarqueeSection() {
  return (
    <section className="w-full py-20 overflow-hidden relative">
      {/* Soft gradient masks for fading edges */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#FBFBFB] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#FBFBFB] to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-[200%] animate-marquee hover-pause">
        {/* Double the array for seamless infinite scrolling */}
        {[...technologies, ...technologies, ...technologies].map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 px-6 py-3 mx-3 rounded-full glass-card bg-white/60 border border-white whitespace-nowrap group hover:scale-105 transition-transform duration-300"
          >
            <span className="font-semibold text-[#111111] text-[15px]">{tech.name}</span>
            <span className="text-xs font-mono text-[#666666] uppercase tracking-wider flex items-center gap-1">
              <span className="text-[#C4F000]">⚡</span> {tech.category}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
