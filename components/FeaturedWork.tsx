import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard, { ProjectData } from './ProjectCard';
import AnimatedColumn from './AnimatedColumn';

const allProjects: ProjectData[] = [
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

export default function FeaturedWork() {
  return (
    <section id="works" className="w-full bg-[#fcfcfc] pt-10 md:pt-14 lg:pt-16 pb-12 overflow-hidden box-border">
      
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
        <Link href="#" className="inline-flex items-center gap-2 text-[#111] font-semibold text-[14px] md:text-[15px] hover:text-[#555] transition-colors border-b border-[#111]/20 hover:border-[#111]/50 pb-1">
          View all projects <ArrowUpRight size={18} strokeWidth={2.5} />
        </Link>
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
                <AnimatedColumn 
                  animClass={col.animClass}
                  originalChildren={
                    col.data.map((project, idx) => (
                      <ProjectCard key={`orig-${colIdx}-${project.id}-${idx}`} project={project} isDuplicate={false} />
                    ))
                  }
                  duplicateChildren={
                    col.data.map((project, idx) => (
                      <ProjectCard key={`dup-${colIdx}-${project.id}-${idx}`} project={project} isDuplicate={true} />
                    ))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
