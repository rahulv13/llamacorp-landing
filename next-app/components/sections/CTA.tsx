import Image from 'next/image';
import { DarkGradientBg } from "./DarkGradientBg";
import CTAAnimatedContent from './CTAAnimatedContent.client';
import Link from 'next/link';

const CTA = () => {
  return (
    <div className="w-full bg-white relative z-10 pt-6 md:pt-10 lg:pt-12">
      <DarkGradientBg className="rounded-t-[32px] md:rounded-t-[100px] lg:rounded-t-[120px] w-full flex flex-col justify-between items-center relative z-20 min-h-[850px] md:min-h-[950px] overflow-hidden">
        
        {/* Radial dark gradient overlay to ensure text readability */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-90"
          style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)' }}
        />

        {/* Main CTA Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-5 max-w-[700px] mx-auto pt-32 pb-20 relative z-30">
          <CTAAnimatedContent />
        </div>

        {/* Footer Strip */}
        <footer className="w-full border-t border-white/10 relative z-30 bg-black/20 backdrop-blur-md">
          <div className="w-full px-6 md:px-12 lg:px-24 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left text-white/50 text-sm">
              <span className="text-white font-semibold text-lg tracking-tight">Llamacorp</span>
              <span className="hidden md:inline text-white/20">•</span>
              <span>© 2026 Llamacorp. Built for ambitious ideas.</span>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-white/50 font-medium">
              <a href="/work" className="hover:text-white transition-colors">Work</a>
              <a href="/#services" className="hover:text-white transition-colors">Services</a>
              <a href="/blog" className="hover:text-white transition-colors">Blog</a>
              <a href="/#faqs" className="hover:text-white transition-colors">FAQ</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              
              <div className="flex items-center justify-center gap-4 ml-0 md:ml-2 border-l-0 md:border-l border-white/10 pl-0 md:pl-6 w-full md:w-auto mt-2 md:mt-0">
                <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://www.instagram.com/llamacorp1/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </DarkGradientBg>
    </div>
  );
};

export default CTA;
