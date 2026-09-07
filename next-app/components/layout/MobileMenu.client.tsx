"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

interface LinkItem {
  label: string;
  index: number;
  href: string;
}

interface RightAction {
  type: string;
  label: string;
  bg?: string;
  index: number;
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  icon?: React.ReactNode;
}

interface MobileMenuProps {
  links: LinkItem[];
  actions: RightAction[];
}

export function MobileMenu({ links, actions }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-black/5 ml-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[80px] left-5 right-5 bg-white/95 backdrop-blur-xl border border-black/5 rounded-3xl p-6 shadow-xl pointer-events-auto md:hidden flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4 border-b border-black/5 pb-4">
              {links.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href || '#'} 
                  onClick={() => setIsOpen(false)} 
                  className="text-[16px] font-medium text-[#111]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-4 pt-2">
              {actions.filter(item => item.type === 'icon').map((item) => (
                <a 
                  key={item.label} 
                  href={item.href || '#'} 
                  target={item.target} 
                  rel={item.rel} 
                  aria-label={item.ariaLabel} 
                  onClick={() => setIsOpen(false)} 
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${item.bg}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
