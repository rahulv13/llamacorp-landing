import React from 'react';
import { m } from 'framer-motion';

const GradientBars = ({
  numBars = 15,
  gradientFrom = "rgb(255, 60, 0)",
  gradientTo = "transparent",
  animationDuration = 2,
  className = "",
}) => {
  const calculateHeight = (index, total) => {
    const position = index / (total - 1);
    const maxHeight = 100;
    const minHeight = 30;

    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);

    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  return (
    <>
      <style>{`
        @keyframes pulseBar {
          0% { transform: scaleY(var(--initial-scale)); }
          100% { transform: scaleY(calc(var(--initial-scale) * 0.7)); }
        }
      `}</style>

      <div className={`absolute inset-0 z-0 overflow-hidden opacity-30 ${className}`}>
        <div
          className="flex h-full items-end"
          style={{
            width: "100%",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {Array.from({ length: numBars }).map((_, index) => {
            const height = calculateHeight(index, numBars);
            return (
              <div
                key={index}
                style={{
                  flex: `1 0 calc(100% / ${numBars})`,
                  maxWidth: `calc(100% / ${numBars})`,
                  height: "100%",
                  background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
                  transform: `scaleY(${height / 100})`,
                  transformOrigin: "bottom",
                  transition: "transform 0.5s ease-in-out",
                  animation: `pulseBar ${animationDuration}s ease-in-out infinite alternate`,
                  animationDelay: `${index * 0.1}s`,
                  outline: "1px solid rgba(0, 0, 0, 0)",
                  boxSizing: "border-box",
                  "--initial-scale": height / 100,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] w-full pt-20 pb-8 px-6 text-white relative overflow-hidden min-h-[400px] flex flex-col justify-end">
      
      {/* Background Animated Gradient Bars */}
      <GradientBars numBars={15} animationDuration={3} />

      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"></div>
      
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="md:col-span-2 flex flex-col items-start">
            <a href="/" className="flex items-center gap-3 mb-6">
              <img src="/logo2.svg" alt="Llamacorp Logo" className="w-8 h-8 filter brightness-0 invert" />
              <span className="font-semibold text-lg tracking-tight">LlamaCorp</span>
            </a>
            <p className="text-white/60 text-sm max-w-sm leading-relaxed">
              We are an AI-powered digital agency crafting intelligent, high-performance websites and digital products for ambitious businesses.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Navigation</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li><a href="/" className="hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="/work" className="hover:text-white transition-colors duration-300">Works</a></li>
              <li><a href="/about" className="text-white">About Us</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors duration-300">Blog</a></li>
            </ul>
          </div>

          {/* Socials & Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Connect</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li><a href="https://twitter.com/llamacorp" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Twitter (X)</a></li>
              <li><a href="https://linkedin.com/company/llamacorp" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">LinkedIn</a></li>
              <li><a href="mailto:llamacorp8@gmail.com" className="hover:text-white transition-colors duration-300">Email Us</a></li>
              <li><a href="https://wa.me/919769285318" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <p>&copy; {currentYear} LlamaCorp. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
