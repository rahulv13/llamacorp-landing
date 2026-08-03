import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../assets/Logo.png';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { UserProfileDialog } from './UserProfileDialog';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = "flex items-center justify-between px-6 py-8 lg:px-12" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // On mobile menu open, we need to ensure the nav has a higher z-index
  // so the logo and close button stay above the fixed overlay.
  // We can force a high z-index on the container if the menu is open.
  const containerClass = `${className} ${isMobileMenuOpen ? 'relative z-[60]' : ''}`;

  return (
    <>
      <nav className={containerClass}>
        <Link to="/" className="flex items-center gap-3 relative z-[60]">
          <img src={logoImg} alt="llamacorp logo" className="w-8 h-8 object-contain" />
          <span className="font-bold tracking-widest uppercase text-sm text-white">llamacorp</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm text-zinc-400">
          <Link
            to="/services"
            className="hover:text-white transition-colors"
            onMouseEnter={async () => {
              if (!sessionStorage.getItem('services_cache')) {
                try {
                  const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/services`);
                  const data = await res.json();
                  if (data && data.length > 0) {
                    sessionStorage.setItem('services_cache', JSON.stringify(data));
                  }
                } catch (e) {
                  // silent fail on prefetch
                }
              }
            }}
          >
            Services
          </Link>
          <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link to="/about" className="hover:text-white transition-colors">About us</Link>
          <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          <a href="#" className="hover:text-white transition-colors">Cases</a>
        </div>

        {/* Desktop Profile / Contact */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/contact" className="uppercase tracking-wider hover:text-white transition-colors text-zinc-400">Contact Us</Link>
          {user && (
            <button
              onClick={() => setIsProfileOpen(true)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all overflow-hidden"
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-medium text-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          className="md:hidden relative z-[60] text-white p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8"
          >
            <div className="flex flex-col gap-6 text-2xl font-medium mt-8">
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors">Services</Link>
              <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors">About us</Link>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors">Blog</Link>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors">Cases</a>
            </div>

            <div className="mt-auto flex flex-col gap-8">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="uppercase tracking-wider text-zinc-400 hover:text-white transition-colors w-max text-lg"
              >
                Contact Us
              </Link>

              <div className="h-px bg-zinc-800 w-full" />

              {user && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsProfileOpen(true);
                  }}
                  className="flex items-center gap-4 text-white hover:text-zinc-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-medium text-lg">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                  </div>
                  <span className="text-lg">My Profile</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <UserProfileDialog isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
