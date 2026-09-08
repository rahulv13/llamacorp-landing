import React from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '../blog/FadeIn';

// --- Image Visual Component ---
const ImageVisual = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className="relative w-full h-[260px] bg-[#F8F9FA] overflow-hidden flex items-center justify-center">
      <FadeIn 
        className="w-full h-full relative"
        duration={0.8}
        yOffset={0}
      >
        <Image 
          src={imageSrc} 
          alt="Service visual"
          fill
          className="object-cover"
        />
      </FadeIn>
    </div>
  );
};


// --- Main Card Component ---
const ServiceCard = ({ 
  title, 
  description, 
  highlights, 
  bottomText, 
  ctaText, 
  imageSrc, 
  index 
}: {
  title: string;
  description: string;
  highlights: string[];
  bottomText: string;
  ctaText: string;
  imageSrc: string;
  index: number;
}) => {
  return (
    <FadeIn
      duration={0.7} 
      delay={index * 0.12} 
      yOffset={40}
      className="bg-white rounded-[32px] border border-[#E5E5E5] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
    >
      
      {/* Top Visual Area */}
      <ImageVisual imageSrc={imageSrc} />

      {/* Bottom Content Area */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-bold text-[#111] mb-3">{title}</h3>
        <p className="text-[#555] leading-relaxed mb-6 text-sm">
          {description}
        </p>

        {/* Highlights Stack */}
        <ul className="flex flex-col gap-3.5 mb-8 flex-1">
          {highlights.map((highlight, hIdx) => (
            <li key={hIdx} className="flex items-center gap-3 text-[14px] text-[#333]">
              <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-black" />
              </div>
              {highlight}
            </li>
          ))}
        </ul>

        <div>
          <Link href="/work" className="block text-center w-full bg-[#111] text-white py-3.5 px-6 rounded-full font-medium transition-colors hover:bg-black/80">
            {ctaText}
          </Link>
          <p className="text-[13px] text-center text-[#777] mt-3 hover:text-black cursor-pointer transition-colors">
            {bottomText} &rarr;
          </p>
        </div>
      </div>
    </FadeIn>
  );
};


// --- Main Section Export ---
export default function ServicesGrid() {
  const services = [
    {
      title: 'AI Web Design & Development',
      description: 'Beautiful, fast, AI-powered websites built to convert visitors into customers.',
      highlights: ['Responsive Websites', 'React + Vite', 'Lightning Fast', 'SEO Ready'],
      bottomText: '120+ websites delivered',
      ctaText: 'View Projects',
      imageSrc: '/assets/1.avif'
    },
    {
      title: 'AI Automation',
      description: 'Automate repetitive work using intelligent workflows that save time and scale your business.',
      highlights: ['AI Agents', 'n8n Workflows', 'API Integrations', 'Business Automation'],
      bottomText: 'Automation success',
      ctaText: 'Explore Automation',
      imageSrc: '/assets/3d_cloud_dial.png'
    },
    {
      title: 'Branding & Creative',
      description: 'Build memorable brands with modern identities designed to stand out.',
      highlights: ['Logo Design', 'UI/UX Design', 'Brand Systems', 'Social Media Assets'],
      bottomText: 'Client approved',
      ctaText: 'View Branding',
      imageSrc: '/assets/3d_headset.png'
    },
    {
      title: 'SEO + AI Growth',
      description: 'Increase visibility with technical SEO, AI search optimization, and growth strategies.',
      highlights: ['Technical SEO', 'GEO Optimization', 'Google Search', 'Analytics'],
      bottomText: 'Growth accelerated',
      ctaText: 'Grow Your Business',
      imageSrc: '/assets/4.avif'
    }
  ];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-24 md:py-32 bg-transparent relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <FadeIn 
          duration={0.5} yOffset={20}
          className="mb-5"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight leading-[1.1]">
            Everything You Need to Build, Launch & Grow Online
          </h2>
        </FadeIn>
        
        <FadeIn 
          duration={0.5} yOffset={20} delay={0.1}
        >
          <p className="text-[16px] text-gray-500 leading-relaxed">
            From premium websites to AI automation and growth marketing, LlamaCorp combines design, technology, and intelligence into one seamless digital partner.
          </p>
        </FadeIn>
      </div>

      {/* Services Container Frame (Matches Pricing Plans) */}
      <div className="w-full bg-[#EAEAEA] border border-[#D1D1D1] p-[10px] md:p-[14px] rounded-[40px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} index={index} {...service} />
          ))}
        </div>
      </div>
      
    </section>
  );
}
