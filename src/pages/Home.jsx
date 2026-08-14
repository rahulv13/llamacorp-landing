import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import SelectedWork from '../components/SelectedWork';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import '../index.css';

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

export default function Home() {
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
      <SEO 
        title="AI Web Design & Development Agency" 
        description="Llamacorp is a premium AI-powered web design and development agency building high-performance websites for startups and businesses."
        canonical="/" 
      />


      <main id="hero" className="relative w-full max-w-[1200px] px-4 md:px-6 lg:px-8 mx-auto flex flex-col items-center text-center pt-[120px] md:pt-[160px] pb-8 md:pb-10 overflow-hidden md:overflow-visible box-border">
        <a 
          href="mailto:llamacorp8@gmail.com?subject=Discovery%20Call" 
          className="inline-flex items-center p-[2px] pr-[8px] gap-[7px] rounded-[9px] bg-[#C4E88B] border-2 border-[rgba(90,130,45,0.45)] shadow-[0_1px_3px_rgba(40,70,20,0.08)] hover:shadow-[0_4px_12px_rgba(40,70,20,0.15)] hover:-translate-y-[1px] transition-all duration-[180ms] mb-7 md:mb-9 mx-auto cursor-pointer no-underline group"
        >
          <div className="bg-[#e4f4c8] text-[#161616] text-[12px] font-medium tracking-[-0.04em] leading-[20px] px-[9px] h-[22px] flex items-center justify-center rounded-[6px]">
            New
          </div>
          <div className="text-[13px] font-medium text-[#161616] tracking-[-0.04em] leading-[20px] whitespace-nowrap">
            Book a free discovery call today
          </div>
        </a>

        <h1 className="w-full max-w-[340px] md:max-w-[800px] mx-auto text-[clamp(2.35rem,10vw,3.25rem)] md:text-[clamp(2.375rem,8vw,5rem)] leading-[0.95] md:leading-[1.05] tracking-[-0.05em] break-words font-bold mb-6 md:mb-7 text-[#111] px-0">
          AI-driven web design<br className="hidden md:block"/>and development.
        </h1>
        
        <p className="w-full max-w-[320px] md:max-w-[540px] mx-auto text-[16px] md:text-[1.25rem] leading-6 md:leading-[1.6] text-[#555] mb-7 md:mb-8 font-normal px-0">
          Llamacorp is a premium agency crafting intelligent, high-performance websites and digital products for forward-thinking brands.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mx-auto px-0">
          <a href="mailto:llamacorp8@gmail.com?subject=New%20Project%20Inquiry%20from%20Llamacorp&body=Hi%20Llamacorp%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project.%0A%0AName%3A%0ACompany%3A%0AProject%20details%3A%0ABudget%3A%0ATimeline%3A" className="flex justify-center items-center bg-[#111] text-white rounded-full no-underline text-[15px] font-medium transition-all hover:bg-[#222] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] w-full max-w-[360px] md:w-auto mx-auto min-h-[52px] px-7">Start a Project</a>
          <a href="/work" className="flex justify-center items-center bg-transparent text-[#111] border border-black/10 rounded-full no-underline text-[15px] font-medium transition-all hover:border-[#111] hover:bg-black/5 w-full max-w-[360px] md:w-auto mx-auto min-h-[52px] px-7">Our Work</a>
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
