import { Navbar } from "../components/Navbar";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';
import logoImg from '../assets/Logo.png';
import { PricingCard, PricingPlan } from '../components/PricingCard';

const plans: PricingPlan[] = [
  {
    name: 'Brand Refresh',
    description: 'Update your current look to stay modern.',
    monthlyPrice: '999',
    annualPrice: '999',
    features: ['Logo Refresh', 'Updated Color Palette', 'Basic Typography Selection', '1 Revision Round'],
  },
  {
    name: 'Full Identity',
    description: 'Complete brand creation from scratch.',
    monthlyPrice: '2999',
    annualPrice: '2999',
    isMostPopular: true,
    features: ['Full Logo Suite', 'Comprehensive Brand Guidelines', 'Typography & Color Systems', 'Social Media Assets', '3 Revision Rounds'],
  },
  {
    name: 'Creative Partner',
    description: 'Ongoing design and brand strategy support.',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    isCustom: true,
    ctaText: 'Contact Sales',
    features: ['Retainer-based Support', 'Campaign Creation', 'Video Production', 'Custom Illustrations', 'Dedicated Art Director'],
  }
];

export default function PricingBranding() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[#000] text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
      <Navbar className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference" />

      <section className="pt-48 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 bg-zinc-900/50 border border-zinc-800 text-zinc-300 text-sm px-4 py-1.5 rounded-full"
        >
          Brand & Creative
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif tracking-tight mb-6"
        >
          Branding Pricing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl text-zinc-400 max-w-2xl font-light mb-12"
        >
          Establish a strong, memorable identity that resonates with your target audience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-zinc-900/50 p-1.5 rounded-full flex items-center gap-1 border border-zinc-800/50"
        >
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isAnnual ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-300'}`}
          >
            One-time
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isAnnual ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-300'}`}
          >
            Packages
          </button>
        </motion.div>
      </section>

      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} isAnnual={isAnnual} delay={(i + 1) * 0.1} />
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6 relative z-10">Need something else?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Let's discuss how we can build a custom digital experience for your brand.
          </p>
          <button className="bg-white hover:bg-zinc-200 text-black transition-all duration-300 rounded-full px-8 py-4 font-medium relative z-10 flex items-center gap-2 mx-auto">
            Contact Us <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <footer className="border-t border-zinc-900 bg-black px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoImg} alt="llamacorp logo" className="w-8 h-8 object-contain" />
              <span className="font-bold tracking-widest uppercase text-sm">llamacorp</span>
            </div>
            <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xs">
              Our AI-driven solutions make web development faster, smarter, and more scalable.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-zinc-500 hover:text-white transition-all text-sm font-light">AI Web Design & Development</Link></li>
              <li><Link to="/services" className="text-zinc-500 hover:text-white transition-all text-sm font-light">Social Media Management</Link></li>
              <li><Link to="/services" className="text-zinc-500 hover:text-white transition-all text-sm font-light">SEO</Link></li>
              <li><Link to="/services" className="text-zinc-500 hover:text-white transition-all text-sm font-light">Brand & Creative</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-6">Get In Touch</h4>
            <a href="mailto:hello@llamacorp.com" className="text-zinc-500 hover:text-white transition-all text-sm font-light block mb-6">
              hello@llamacorp.com
            </a>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/llamacorp1/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-300">
                  <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs font-light">
            &copy; 2026 llamacorp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
