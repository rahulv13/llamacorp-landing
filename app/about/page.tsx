import React from 'react';
import type { Metadata } from 'next';
import AboutClientWrapper from '../../components/about/AboutClientWrapper';

// Import sections for replicated design
import HeroSection from '../../components/about/HeroSection';
import ServicesGrid from '../../components/about/ServicesGrid';
import DarkFounderSection from '../../components/about/DarkFounderSection';
import StatsAndTestimonials from '../../components/about/StatsAndTestimonials';
import ParticleFooter from '../../components/about/ParticleFooter';

export const metadata: Metadata = {
  title: 'About LlamaCorp | Premium AI-Powered Digital Agency',
  description: 'LlamaCorp is an AI-powered digital agency helping startups and businesses build premium digital experiences through AI.',
  alternates: {
    canonical: 'https://llamacorp.com/about',
  },
  openGraph: {
    title: 'About LlamaCorp',
    description: 'AI-powered websites, branding, automation, and marketing crafted to help ambitious businesses grow faster.',
    type: 'website',
  },
};

export default function About() {
  return (
    <AboutClientWrapper>
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
      <ParticleFooter />
    </AboutClientWrapper>
  );
}
