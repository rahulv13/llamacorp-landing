import { useState, useEffect } from 'react';
import MagneticTopNavbar from './components/MagneticTopNavbar';
import SelectedWork from './components/SelectedWork';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import './index.css';

const testimonials = [
  {
      text: "“Llamacorp turned our idea into a polished product in days.”",
      avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
      text: "“The design feels premium and the site performs beautifully.”",
      avatar: "https://i.pravatar.cc/150?img=33"
  },
  {
      text: "“Fast, thoughtful, and far beyond a standard agency experience.”",
      avatar: "https://i.pravatar.cc/150?img=47"
  }
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const intervalId = setInterval(() => {
      setExitingIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      
      setTimeout(() => {
        setExitingIndex(null);
      }, 600); // Wait for exit animation
    }, 4500);

    return () => clearInterval(intervalId);
  }, [currentIndex, isReducedMotion]);

  return (
    <>
      <MagneticTopNavbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center pt-[120px] md:pt-[180px] px-4 md:px-5 pb-[80px] md:pb-[120px] w-full max-w-full md:max-w-[900px] mx-auto min-h-[calc(100vh-80px)] md:min-h-screen box-border overflow-hidden md:overflow-visible">
        <div className="relative h-12 flex justify-center items-center mb-6 md:mb-8 w-full max-w-full overflow-hidden md:overflow-visible" aria-live="polite">
          {testimonials.map((t, index) => {
            const isActive = index === currentIndex;
            const isExiting = index === exitingIndex;
            
            if (!isActive && !isExiting && !isReducedMotion) return null;
            if (isReducedMotion && index !== 0) return null;

            return (
              <div 
                key={index}
                className={`
                  absolute bg-white rounded-full py-1.5 pr-4 pl-1.5 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] pointer-events-none w-max max-w-[calc(100vw-32px)] md:max-w-[90vw]
                  ${isReducedMotion ? 'opacity-100 transform-none pointer-events-auto' : ''}
                  ${!isReducedMotion && isActive ? 'animate-in fade-in slide-in-from-bottom-6 duration-700 pointer-events-auto' : ''}
                  ${!isReducedMotion && isExiting ? 'animate-out fade-out slide-out-to-top-6 duration-500' : ''}
                `}
                style={!isReducedMotion && isActive ? { transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' } : {}}
              >
                <img src={t.avatar} alt="" className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover shrink-0" />
                <span className="text-[11px] md:text-[13px] font-medium text-[#555] truncate">{t.text}</span>
              </div>
            );
          })}
        </div>

        <h1 className="text-[clamp(2.35rem,10vw,3.25rem)] md:text-[clamp(2.5rem,7vw,5rem)] leading-[1.1] md:leading-[1.05] font-bold tracking-tight mb-5 md:mb-6 text-[#111] max-w-[340px] md:max-w-none mx-auto w-full">
          AI-driven web design<br className="hidden md:block"/> and development.
        </h1>
        
        <p className="text-[1rem] md:text-[clamp(1rem,4vw,1.25rem)] leading-[1.6] text-[#555] max-w-[320px] md:max-w-[540px] mb-8 md:mb-12 font-normal tracking-tight px-0 mx-auto w-full">
          Llamacorp is a premium agency crafting intelligent, high-performance websites and digital products for forward-thinking brands.
        </p>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto max-w-[360px] md:max-w-none mx-auto px-4 md:px-0">
          <a href="#" className="bg-[#111] text-white py-3.5 md:py-3.5 px-7 rounded-full no-underline text-[15px] font-medium transition-all hover:bg-[#222] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] w-full md:w-auto min-h-[52px] flex items-center justify-center">Start a Project</a>
          <a href="#" className="bg-transparent text-[#111] border border-black/10 py-3.5 md:py-3.5 px-7 rounded-full no-underline text-[15px] font-medium transition-all hover:border-[#111] hover:bg-black/5 w-full md:w-auto min-h-[52px] flex items-center justify-center">Our Work</a>
        </div>
      </main>

      <SelectedWork />

      <Services />

      <Testimonials />

      <Pricing />

      <FAQ />

      <CTA />
    </>
  )
}

export default App
