import React from 'react';
import { m } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] w-full pt-20 pb-8 px-6 text-white relative overflow-hidden">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto w-full">
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
