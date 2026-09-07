import Image from 'next/image';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import SelectedWorkAnimated from './SelectedWorkAnimated.client';

const clients = ['Acme Corp', 'GlobalNet', 'Nexus AI', 'Lumina', 'Stark Ind', 'Quantum', 'Horizon', 'Vanguard'];

export default function SelectedWork() {
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
        <a href="#" className="inline-flex items-center gap-2 text-[#111] font-semibold text-[14px] md:text-[15px] hover:text-[#555] transition-colors border-b border-[#111]/20 hover:border-[#111]/50 pb-1">
          View all projects <ArrowUpRight size={18} strokeWidth={2.5} />
        </a>
      </div>

      {/* Visual Wall */}
      <SelectedWorkAnimated />
    </section>
  );
}
