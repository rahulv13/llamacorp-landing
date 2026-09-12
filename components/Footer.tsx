import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0d0d] border-t border-white/[0.06] w-full">
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left: Logo + copyright */}
        <div className="flex items-center gap-3 text-white/40 text-[13px]">
          <span className="text-white font-semibold text-[14px] tracking-tight">Llamacorp</span>
          <span className="text-white/20">·</span>
          <span>© {currentYear} Llamacorp. Built for ambitious ideas.</span>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] text-white/50">
          <Link href="/work" className="hover:text-white transition-colors duration-200">Work</Link>
          <Link href="/services" className="hover:text-white transition-colors duration-200">Services</Link>
          <Link href="/blog" className="hover:text-white transition-colors duration-200">Blog</Link>
          <Link href="/#faq" className="hover:text-white transition-colors duration-200">FAQ</Link>
          <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy</Link>
        </nav>

        {/* Right: Social icons */}
        <div className="flex items-center gap-4 text-white/40">
          {/* Instagram */}
          <a href="https://www.instagram.com/llamacorp1/" target="_blank" rel="noopener noreferrer" aria-label="Visit Llamacorp on Instagram" className="hover:text-white transition-colors duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          {/* X (Twitter) */}
          <a href="https://x.com/llamacorp8" target="_blank" rel="noopener noreferrer" aria-label="Visit Llamacorp on X (Twitter)" className="hover:text-white transition-colors duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          {/* YouTube */}
          <a href="https://www.youtube.com/@Llamacorp-d3e" target="_blank" rel="noopener noreferrer" aria-label="Visit Llamacorp on YouTube" className="hover:text-white transition-colors duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          {/* Pinterest */}
          <a href="https://in.pinterest.com/llamacorp8/" target="_blank" rel="noopener noreferrer" aria-label="Visit Llamacorp on Pinterest" className="hover:text-white transition-colors duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.625 0 12.017 0z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
