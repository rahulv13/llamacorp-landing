import { constructMetadata } from '@/lib/metadata';
import dynamic from 'next/dynamic';
import LazyMotionWrapper from './LazyMotionWrapper.client';

// Import sections for replicated design
import HeroSection from '@/components/sections/about/HeroSection';
import ServicesGrid from '@/components/sections/about/ServicesGrid';
import DarkFounderSection from '@/components/sections/about/DarkFounderSection';
import StatsAndTestimonials from '@/components/sections/about/StatsAndTestimonials';
import ParticleFooterWrapper from './ParticleFooterWrapper.client';

export const metadata = constructMetadata({
  title: "About Us | Llamacorp",
  description: "Learn about Llamacorp, our mission, and the team behind our innovative digital solutions.",
  path: "/about",
});

export default function About() {
  return (
    <LazyMotionWrapper>
      <main className="bg-[#FBFBFB] min-h-screen relative overflow-hidden flex flex-col items-center pt-[140px]">
        {/* Sections Wrapper */}
        <div className="w-full relative z-10 flex flex-col items-center">
          <HeroSection />
          <ServicesGrid />
          <DarkFounderSection />
          <StatsAndTestimonials />
        </div>
      </main>
      
      {/* Footer is part of the replicated design (dark section with particles) */}
      <ParticleFooterWrapper />
    </LazyMotionWrapper>
  );
}
