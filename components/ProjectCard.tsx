import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export type ProjectData = {
  id: number;
  type: string;
  url: string;
  aspect?: string;
  title: string;
  category: string;
};

interface ProjectCardProps {
  project: ProjectData;
  isDuplicate: boolean;
}

export default function ProjectCard({ project, isDuplicate }: ProjectCardProps) {
  return (
    <Link 
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
          <Image 
            src={project.url} 
            alt={project.title} 
            loading={isDuplicate ? "lazy" : "eager"}
            width={800}
            height={1000}
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
    </Link>
  );
}
