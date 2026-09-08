import React from 'react';
import Script from 'next/script';
import { VerifiedBadge } from '../ui/verified-badge';
import FadeIn from '../blog/FadeIn';

export default function DarkFounderSection() {
  const bullets = [
    <React.Fragment key="1">We create premium websites using modern technologies and <strong className="text-white font-semibold">AI-powered workflows.</strong></React.Fragment>,
    <React.Fragment key="2">We help startups and businesses establish a powerful online presence through <strong className="text-white font-semibold">branding and UI/UX design.</strong></React.Fragment>,
    <React.Fragment key="3">Our <strong className="text-white font-semibold">SEO and GEO strategies</strong> improve visibility across traditional search engines and AI-powered search experiences.</React.Fragment>,
    <React.Fragment key="4">We automate repetitive business processes with <strong className="text-white font-semibold">intelligent workflows, APIs, and AI agents</strong> to improve efficiency.</React.Fragment>,
    <React.Fragment key="5">Every project is crafted with <strong className="text-white font-semibold">performance, accessibility, scalability, and long-term growth</strong> in mind.</React.Fragment>
  ];

  return (
    <section className="w-full flex justify-center my-16 md:my-24">
      <Script src="https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js" strategy="lazyOnload" type="module" />
      
      {/* Main Container */}
      <div 
        className="w-full min-h-[760px] rounded-[40px] md:rounded-[48px] p-[40px] md:p-[60px] lg:p-[80px] shadow-2xl overflow-hidden relative flex items-center justify-center bg-[#000000]"
      >
        <div className="w-full h-full max-w-[1500px] grid grid-cols-1 lg:grid-cols-[48%_52%] gap-[60px] lg:gap-[90px] items-center relative z-10">
          
          {/* Left Content */}
          <div className="flex flex-col items-start w-full">
            {/* Badge */}
            <FadeIn duration={0.6} yOffset={15} className="inline-flex items-center gap-2 bg-[#3B82F6] text-white text-[11px] font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-white/40"></span>
              ABOUT LLAMACORP
            </FadeIn>
            
            {/* Heading */}
            <FadeIn duration={0.6} yOffset={15} delay={0.1}>
              <h2 className="text-[36px] md:text-[42px] lg:text-[48px] leading-[1.2] font-bold text-white mb-10 tracking-tight max-w-[520px]">
                Helping businesses<br/>
                build smarter<br/>
                digital experiences
              </h2>
            </FadeIn>

            {/* Bullet Points */}
            <div className="flex flex-col gap-6 w-full max-w-[600px]">
              {bullets.map((bullet, idx) => (
                <FadeIn key={idx} duration={0.6} yOffset={15} delay={0.2 + (idx * 0.1)} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 flex items-center justify-center text-blue-400">
                    <VerifiedBadge variant="shimmer" size={22} className="text-[#60A5FA]" />
                  </div>
                  <p className="text-[15px] md:text-[16px] text-white/60 leading-relaxed tracking-wide font-normal">
                    {bullet}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right Content: Spline Viewer in Fixed Wrapper */}
          <div className="flex justify-center items-center w-full h-full">
            <FadeIn 
              duration={1} yOffset={20} delay={0.2}
              className="spline-wrapper -translate-y-[15px] -translate-x-[40px] md:-translate-x-[60px]"
            >
              {/* @ts-expect-error - spline-viewer is a custom element */}
              <spline-viewer 
                url="https://prod.spline.design/KaHc3cFTzewyKyFs/scene.splinecode"
              ></spline-viewer>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
