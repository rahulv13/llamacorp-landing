import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const allProjects = [
  { id: 1, type: "video", url: "https://player.vimeo.com/video/1126198767?muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1", aspect: "aspect-video", title: "AI Support Dashboard", category: "AI Platform" },
  { id: 2, type: "video", url: "https://player.vimeo.com/video/1126202556?muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1", aspect: "aspect-video", title: "SaaS Analytics Product", category: "SaaS" },
  { id: 3, type: "video", url: "https://player.vimeo.com/video/1126202431?muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1", aspect: "aspect-video", title: "Fintech Landing Page", category: "Web Design" },
  { id: 4, type: "video", url: "https://player.vimeo.com/video/1126202739?muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1", aspect: "aspect-video", title: "E-commerce Experience", category: "E-commerce" },
  { id: 5, type: "image", url: "/assets/1.avif", title: "Mobile App Interface", category: "App Design" },
  { id: 6, type: "image", url: "/assets/2.avif", title: "Startup Brand System", category: "Brand Identity" },
  { id: 7, type: "image", url: "/assets/3.avif", title: "Creative 3D Campaign", category: "3D Art" },
  { id: 8, type: "image", url: "/assets/4.avif", title: "Internal Operations Dashboard", category: "Dashboard" },
  { id: 9, type: "image", url: "/assets/5.avif", title: "Brand Evolution", category: "Brand Identity" },
  { id: 10, type: "image", url: "/assets/6.avif", title: "SaaS Marketing Site", category: "Web Design" },
  { id: 11, type: "image", url: "/assets/7.avif", title: "Digital Campaign", category: "Advertising" },
  { id: 12, type: "image", url: "/assets/8.avif", title: "Web3 Platform", category: "Product Design" },
  { id: 13, type: "image", url: "/assets/9.avif", title: "Healthcare App", category: "App Design" },
  { id: 14, type: "image", url: "/assets/10.avif", title: "Lifestyle E-commerce", category: "E-commerce" },
];

const col1 = [allProjects[0], allProjects[4], allProjects[8], allProjects[12]];
const col2 = [allProjects[5], allProjects[1], allProjects[9], allProjects[13]];
const col3 = [allProjects[10], allProjects[6], allProjects[2], allProjects[8]];
const col4 = [allProjects[3], allProjects[7], allProjects[11], allProjects[5]];

const columns = [
  { data: col1, animClass: "animate-scroll-up-slow" },
  { data: col2, animClass: "animate-scroll-down-medium" },
  { data: col3, animClass: "animate-scroll-up-medium" },
  { data: col4, animClass: "animate-scroll-down-fast" },
];

const clients = ['Acme Corp', 'GlobalNet', 'Nexus AI', 'Lumina', 'Stark Ind', 'Quantum', 'Horizon', 'Vanguard'];

export default function SelectedWork() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const renderCard = (project, idx, colIdx, isDuplicate) => (
    <a 
      key={`${colIdx}-${project.id}-${isDuplicate ? 'dup' : 'orig'}-${idx}`}
      href="#"
      aria-label={`View project: ${project.title}`}
      className="block relative group overflow-hidden rounded-[4px] md:rounded-[8px] bg-white md:bg-[#f4f4f4] border border-black/5 md:border-black/10 cursor-pointer w-full mb-[8px] md:mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
    >
      <div className={`relative w-full bg-white md:bg-[#f4f4f4] ${project.type === 'video' ? project.aspect : ''}`}>
        {project.type === 'video' ? (
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <iframe 
              src={project.url} 
              className="w-full h-full absolute top-0 left-0 pointer-events-none object-cover" 
              allow="autoplay; fullscreen" 
              title={project.title}
              frameBorder="0"
            ></iframe>
          </div>
        ) : (
          <img 
            src={project.url} 
            alt={project.title} 
            loading={isDuplicate ? "lazy" : "eager"}
            className="w-full h-auto block object-cover"
          />
        )}
        
        {/* Restrained Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out hidden md:flex flex-col justify-between p-5 md:p-6">
          <div className="flex justify-end">
            <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-sm">
              <ArrowUpRight size={18} strokeWidth={2} />
            </div>
          </div>
          <div>
            <span className="text-white/90 text-[12px] font-medium tracking-wide uppercase mb-1 block">{project.category}</span>
            <h3 className="text-white text-lg md:text-xl font-bold leading-tight">{project.title}</h3>
          </div>
        </div>
      </div>
    </a>
  );

  return (
    <section className="w-full bg-[#fcfcfc] pt-10 md:pt-14 lg:pt-16 pb-12 overflow-hidden box-border">
      
      {/* Client Strip */}
      <div className="relative w-full overflow-hidden mb-6 md:mb-8 py-2 md:py-4 border-y border-black/5 max-w-[1600px] mx-auto">
        <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#fcfcfc] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#fcfcfc] to-transparent z-10 pointer-events-none"></div>
        <div className="flex animate-marquee whitespace-nowrap items-center w-[max-content]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 md:gap-16 px-4 md:px-8">
              {clients.map((name, j) => (
                <div key={j} className="flex items-center gap-2 text-[#b0b0b0] font-medium text-[1rem] md:text-[1.1rem] tracking-tight">
                  <div className="w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-sm border-[1.5px] border-[#d0d0d0] opacity-80"></div>
                  {name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Showcase Wall Header */}
      <div className="w-full max-w-[1600px] mx-auto px-4 mb-4 md:mb-6 flex justify-end">
        <a href="#" className="inline-flex items-center gap-2 text-[#111] font-semibold text-[14px] md:text-[15px] hover:text-[#555] transition-colors border-b border-[#111]/20 hover:border-[#111]/50 pb-1">
          View all projects <ArrowUpRight size={18} strokeWidth={2.5} />
        </a>
      </div>

      {/* Visual Wall */}
      <div className="w-full px-[12px] md:px-4 max-w-[2000px] mx-auto">
        <div className="relative h-[720px] md:h-[900px] lg:h-[1000px] w-full overflow-hidden rounded-[4px] md:rounded-[16px] bg-[#fcfcfc] border border-black/5">
          {/* Gradient masks for top and bottom edges of the wall to make it fade cleanly */}
          <div className="absolute top-0 left-0 right-0 h-12 md:h-24 bg-gradient-to-b from-[#fcfcfc] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-12 md:h-24 bg-gradient-to-t from-[#fcfcfc] to-transparent z-10 pointer-events-none"></div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[8px] md:gap-4 h-full">
            {/* Animated Columns */}
            {columns.map((col, colIdx) => (
              <div 
                key={colIdx} 
                className={`relative h-full w-full overflow-hidden ${colIdx >= 2 ? 'hidden lg:block' : 'block'} ${colIdx % 2 !== 0 ? 'pt-16 md:pt-24' : ''}`}
              >
                {/* 
                  The inner scrolling container. 
                  If user prefers reduced motion, we disable the animation class.
                */}
                <div 
                  className={`w-full flex flex-col ${isReducedMotion ? '' : col.animClass} ${isReducedMotion ? '' : 'hover-pause'}`}
                >
                  {/* Original Set */}
                  <div className="w-full flex flex-col">
                    {col.data.map((project, idx) => renderCard(project, idx, colIdx, false))}
                  </div>
                  {/* Duplicated Set for Infinite Loop */}
                  {!isReducedMotion && (
                    <div className="w-full flex flex-col" aria-hidden="true">
                      {col.data.map((project, idx) => renderCard(project, idx, colIdx, true))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
