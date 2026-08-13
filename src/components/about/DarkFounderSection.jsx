import React, { useEffect } from 'react';
import { m } from 'framer-motion';

export default function DarkFounderSection() {
  useEffect(() => {
    // Dynamically load the spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const bullets = [
    <>We create premium websites using modern technologies and <strong className="text-white font-semibold">AI-powered workflows.</strong></>,
    <>We help startups and businesses establish a powerful online presence through <strong className="text-white font-semibold">branding and UI/UX design.</strong></>,
    <>Our <strong className="text-white font-semibold">SEO and GEO strategies</strong> improve visibility across traditional search engines and AI-powered search experiences.</>,
    <>We automate repetitive business processes with <strong className="text-white font-semibold">intelligent workflows, APIs, and AI agents</strong> to improve efficiency.</>,
    <>Every project is crafted with <strong className="text-white font-semibold">performance, accessibility, scalability, and long-term growth</strong> in mind.</>
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="w-full flex justify-center my-16 md:my-24">
      {/* Main Container */}
      <div 
        className="w-full min-h-[760px] rounded-[40px] md:rounded-[48px] p-[40px] md:p-[60px] lg:p-[80px] shadow-2xl overflow-hidden relative flex items-center justify-center bg-[#000000]"
      >
        <div className="w-full h-full max-w-[1500px] grid grid-cols-1 lg:grid-cols-[48%_52%] gap-[60px] lg:gap-[90px] items-center relative z-10">
          
          {/* Left Content */}
          <m.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-start w-full"
          >
            {/* Badge */}
            <m.div variants={itemVariants} className="inline-flex items-center gap-2 bg-[#3B82F6] text-white text-[11px] font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-white/40"></span>
              ABOUT LLAMACORP
            </m.div>
            
            {/* Heading */}
            <m.h2 variants={itemVariants} className="text-[36px] md:text-[42px] lg:text-[48px] leading-[1.2] font-bold text-white mb-10 tracking-tight max-w-[520px]">
              Helping businesses<br/>
              build smarter<br/>
              digital experiences
            </m.h2>

            {/* Bullet Points */}
            <div className="flex flex-col gap-6 w-full max-w-[600px]">
              {bullets.map((bullet, idx) => (
                <m.div key={idx} variants={itemVariants} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                  <p className="text-[15px] md:text-[16px] text-white/60 leading-relaxed tracking-wide font-normal">
                    {bullet}
                  </p>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Right Content: Spline Viewer in Fixed Wrapper */}
          <div className="flex justify-center items-center w-full h-full">
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="spline-wrapper -translate-y-[15px] translate-x-[20px]"
            >
              <spline-viewer 
                url="https://prod.spline.design/KaHc3cFTzewyKyFs/scene.splinecode"
              ></spline-viewer>
            </m.div>
          </div>

        </div>
      </div>
    </section>
  );
}
