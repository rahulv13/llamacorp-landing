import React, { useState, useEffect } from 'react';
import { Calendar, PenTool, Layout, Code, LineChart, FileText, Timer, Banknote, Ruler, Palette, Wand2 } from 'lucide-react';
import ServiceExploreIcon from './ServiceExploreIcon';

export default function Services() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section className="w-full bg-[#fcfcfc] py-24 px-5">
      <div className="max-w-[1500px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 bg-[#222] text-white px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            Services
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
          </div>
          
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#111] tracking-tight leading-[1.1] max-w-[800px]">
            Short Overview of What We Can <br className="hidden md:block" />
            Do for <span className="italic font-medium">Your Business</span>
          </h2>
        </div>

        {/* Featured Service Outer Container */}
        <div className="w-full bg-[#f8f8f8] border border-black/[0.06] rounded-[38px] md:rounded-[40px] p-4 flex flex-col lg:flex-row gap-4 group cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-black/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          
          {/* Left Inner Panel */}
          <div className="w-full lg:w-1/2 bg-white rounded-[34px] md:rounded-[36px] border border-black/[0.04] p-6 md:p-10 lg:p-14 flex flex-col justify-start shadow-[inset_0_2px_10px_rgba(0,0,0,0.01),0_8px_30px_rgba(0,0,0,0.02)]">
            
            {/* Animated Folder Icon */}
            <div className="mb-8">
              <ServiceExploreIcon />
            </div>

            <h3 className="text-[clamp(1.75rem,4vw,2.2rem)] font-bold text-[#111] mb-5 tracking-tight leading-tight">Websites That Convert</h3>
            
            <p className="text-[#555] text-[1.15rem] leading-relaxed mb-10 max-w-[480px]">
              We design and build fast, high-performing websites that make your value clear and turn visitors into qualified leads.
            </p>

            {/* Capability Chips */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-[#f8f8f8] text-[#444] px-3.5 py-2 rounded-xl text-[13px] font-semibold border border-black/5 shadow-sm">
                <Calendar size={14} className="text-[#777]" />
                2–4 week launch
              </div>
              <div className="flex items-center gap-2 bg-[#f8f8f8] text-[#444] px-3.5 py-2 rounded-xl text-[13px] font-semibold border border-black/5 shadow-sm">
                <PenTool size={14} className="text-[#777]" />
                Strategy & Copy
              </div>
              <div className="flex items-center gap-2 bg-[#f8f8f8] text-[#444] px-3.5 py-2 rounded-xl text-[13px] font-semibold border border-black/5 shadow-sm">
                <Layout size={14} className="text-[#777]" />
                Modern UI/UX
              </div>
              <div className="flex items-center gap-2 bg-[#f8f8f8] text-[#444] px-3.5 py-2 rounded-xl text-[13px] font-semibold border border-black/5 shadow-sm">
                <Code size={14} className="text-[#777]" />
                Next.js Build
              </div>
              <div className="flex items-center gap-2 bg-[#f8f8f8] text-[#444] px-3.5 py-2 rounded-xl text-[13px] font-semibold border border-black/5 shadow-sm">
                <LineChart size={14} className="text-[#777]" />
                SEO Ready
              </div>
            </div>
            
            {/* Empty space below naturally provided by justify-start and remaining height */}
          </div>

          {/* Right Inner Panel (Image Visual) */}
          <div className="w-full lg:w-1/2 rounded-[34px] md:rounded-[36px] overflow-hidden relative border border-black/[0.04] min-h-[550px] lg:min-h-[750px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] bg-[#1a1a1a]">
            <img 
              src="/assets/service.avif" 
              alt="Services Overview UI" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Second Featured Service Outer Container */}
        <div className="w-full mt-6 bg-[#f8f8f8] border border-black/[0.06] rounded-[38px] md:rounded-[40px] p-4 flex flex-col lg:flex-row gap-4 group cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-black/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          
          {/* Left Inner Panel */}
          <div className="w-full lg:w-1/2 bg-white rounded-[34px] md:rounded-[36px] border border-black/[0.04] p-6 md:p-10 lg:p-14 flex flex-col justify-start shadow-[inset_0_2px_10px_rgba(0,0,0,0.01),0_8px_30px_rgba(0,0,0,0.02)]">
            
            {/* Folder Icon Placeholder */}
            <div className="mb-8">
              <ServiceExploreIcon />
            </div>

            <h3 className="text-[clamp(1.75rem,4vw,2.2rem)] font-bold text-[#111] mb-5 tracking-tight leading-tight">No-code Websites</h3>
            
            <p className="text-[#555] text-[1.15rem] leading-relaxed mb-10 max-w-[480px]">
              Get world-class, high-performing website that generate qualified leads 24/7 &amp; gains revenue - in 14 days or less.
            </p>

            {/* Capability Chips */}
            <div className="flex flex-wrap gap-2.5">
              <div className="flex items-center gap-2 bg-[#f4f4f4] text-[#444] px-3.5 py-1.5 rounded-xl text-[12.5px] font-medium border border-black/5">
                <Timer size={14} className="text-[#777]" />
                2 weeks
              </div>
              <div className="flex items-center gap-2 bg-[#f4f4f4] text-[#444] px-3.5 py-1.5 rounded-xl text-[12.5px] font-medium border border-black/5">
                <Banknote size={14} className="text-[#777]" />
                $4,000-$8,000
              </div>
              <div className="flex items-center gap-2 bg-[#f4f4f4] text-[#444] px-3.5 py-1.5 rounded-xl text-[12.5px] font-medium border border-black/5">
                <Ruler size={14} className="text-[#777]" />
                Research
              </div>
              <div className="flex items-center gap-2 bg-[#f4f4f4] text-[#444] px-3.5 py-1.5 rounded-xl text-[12.5px] font-medium border border-black/5">
                <FileText size={14} className="text-[#777]" />
                Storytelling + Copywriting
              </div>
              <div className="flex items-center gap-2 bg-[#f4f4f4] text-[#444] px-3.5 py-1.5 rounded-xl text-[12.5px] font-medium border border-black/5">
                <Palette size={14} className="text-[#777]" />
                Design
              </div>
              <div className="flex items-center gap-2 bg-[#f4f4f4] text-[#444] px-3.5 py-1.5 rounded-xl text-[12.5px] font-medium border border-black/5">
                <Code size={14} className="text-[#777]" />
                Development
              </div>
              <div className="flex items-center gap-2 bg-[#f4f4f4] text-[#444] px-3.5 py-1.5 rounded-xl text-[12.5px] font-medium border border-black/5">
                <Wand2 size={14} className="text-[#777]" />
                Easily Manage, Update &amp; Scale
              </div>
            </div>
          </div>

          {/* Right Inner Panel (Image Visual) */}
          <div className="w-full lg:w-1/2 rounded-[34px] md:rounded-[36px] overflow-hidden relative border border-black/[0.04] min-h-[550px] lg:min-h-[750px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] bg-[#1a1a1a]">
            <img 
              src="/assets/11.avif" 
              alt="Services Overview UI" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Secondary Services 3-Column Grid (User Provided) */}
        <div className="w-full mt-8 max-w-[1500px] mx-auto p-4 md:p-6 bg-[#f9f9f9] rounded-[40px] border border-white shadow-[inset_0_-4px_4px_-2px_rgba(0,0,0,0.12),_inset_0_4px_4px_-2px_rgba(0,0,0,0.12),_inset_0_0_3px_0_rgba(0,0,0,0.24),_0_0_0_1px_rgba(0,0,0,0.08),_0_7px_11.4px_-7px_rgba(31,28,28,0.15),_0_16px_24px_-7px_rgba(31,28,28,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

            {/* Card 1: Branding & Logos */}
            <div className="flex flex-col bg-white rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden min-h-[400px] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-['Plus_Jakarta_Sans'] tracking-tight">
                  Branding & Logos
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Craft a powerful brand identity that resonates with your audience and stands out in the market
                </p>
              </div>
              <div className="absolute bottom-[-5%] left-0 w-full h-[60%] flex justify-center items-end pointer-events-none">
                <img 
                  src="https://framerusercontent.com/images/JZGIVkpvVHPFQzoXSHxWiw2DGg.png" 
                  alt="Purple T Logo Icon 1" 
                  className="w-44 h-44 object-cover transform rotate-[15deg] absolute left-6 z-10 drop-shadow-xl" 
                />
                <img 
                  src="https://framerusercontent.com/images/HUyputh3EHJoJxAGT0IBOZjXkxg.png" 
                  alt="Purple T Logo Icon 2" 
                  className="w-32 h-32 object-cover transform -rotate-[15deg] absolute right-8 bottom-10 drop-shadow-lg" 
                />
              </div>
            </div>

            {/* Card 2: 2D & 3D Illustrations */}
            <div className="flex flex-col bg-white rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden min-h-[400px] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-['Plus_Jakarta_Sans'] tracking-tight">
                  2D & 3D Illustrations
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Create unforgettable brand experiences with unique & expertly crafted illustrations
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[55%] flex justify-center items-end pb-2 pointer-events-none">
                <div className="relative w-full h-full flex justify-center items-end">
                  {/* Extracted Illustration Assets */}
                  <img 
                    src="https://framerusercontent.com/images/RNWDYTawyvPomT6ibAIzePA2Cfk.png" 
                    alt="Character Illustration" 
                    className="w-32 h-auto transform rotate-[11deg] absolute left-10 bottom-12 rounded-2xl shadow-lg z-20" 
                  />
                  <img 
                    src="https://framerusercontent.com/images/Pe3lOPsLRF5vIhJbxCdCh4mKTYM.png" 
                    alt="Fantasy Illustration" 
                    className="w-28 h-auto transform -rotate-[7deg] absolute right-12 bottom-16 rounded-2xl shadow-lg z-10" 
                  />
                  {/* CSS representation of the 3D Box base */}
                  <div className="w-48 h-24 bg-gradient-to-br from-gray-200 to-gray-400 absolute bottom-0 shadow-inner z-30" style={{ clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)' }}>
                    <div className="w-full h-4 bg-gray-100 absolute top-0"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Motion Design */}
            <div className="flex flex-col bg-white rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden min-h-[400px] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="z-10 relative pointer-events-none">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-['Plus_Jakarta_Sans'] tracking-tight">
                  Motion Design
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Bring your brand to life with dynamic motion graphics that captivate & engage your audience.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[65%]">
                <iframe
                  src="https://my.spline.design/escapeanimatedlandingpage-b32e11f11ff6d3761195270209ae600a/"
                  loading="lazy"
                  className="w-full h-full border-0"
                  title="Motion Design Spline Keyboard Animation"
                  sandbox="allow-same-origin allow-scripts"
                ></iframe>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
