import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'framer-motion';

// Import sections for replicated design
import HeroSection from '../components/about/HeroSection';
import ServicesGrid from '../components/about/ServicesGrid';
import DarkFounderSection from '../components/about/DarkFounderSection';
import StatsAndTestimonials from '../components/about/StatsAndTestimonials';
import ParticleFooter from '../components/about/ParticleFooter';

export default function About() {
  return (
    <LazyMotion features={domAnimation}>
      <Helmet>
        <title>About LlamaCorp | Premium AI-Powered Digital Agency</title>
        <meta name="description" content="LlamaCorp is an AI-powered digital agency helping startups and businesses build premium digital experiences through AI." />
        <link rel="canonical" href="https://llamacorp.com/about" />
        <meta property="og:title" content="About LlamaCorp" />
        <meta property="og:description" content="AI-powered websites, branding, automation, and marketing crafted to help ambitious businesses grow faster." />
        <meta property="og:type" content="website" />
      </Helmet>

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
    </LazyMotion>
  );
}
