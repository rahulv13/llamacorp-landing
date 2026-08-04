import { Navbar } from "./components/Navbar";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';
import axios from 'axios';
import logoImg from './assets/Logo.png';
import { PricingCard, PricingPlan } from './components/PricingCard';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/pricing`);
        // Map backend schema to frontend component schema
        const mappedPlans = res.data.map((p: any) => ({
            name: p.name,
            description: p.description || '',
            monthlyPrice: p.interval === 'month' || p.interval === 'one-time' ? p.price : (p.price / 12).toFixed(2),
            annualPrice: p.interval === 'year' ? p.price : p.price * 12,
            features: p.features,
            isMostPopular: p.isPopular,
            isCustom: p.price === 0 // Assuming 0 implies custom
        }));
        setPlans(mappedPlans);
      } catch (error) {
        console.error('Error fetching pricing plans', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-zinc-800 selection:text-white">
      {/* Navigation */}
      <Navbar className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference" />

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif tracking-tight mb-6"
        >
          Simple, transparent pricing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl text-zinc-500 max-w-2xl font-light mb-12"
        >
          Choose the plan that best fits your needs. All plans include access to our core features.
        </motion.p>

        {/* Toggle */}
                <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black/5 p-1.5 rounded-full flex items-center gap-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] relative"
        >
          <button
            onClick={() => setIsAnnual(false)}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${!isAnnual ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            {!isAnnual && (
              <motion.div
                layoutId="pricing-thumb"
                className="absolute inset-0 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Monthly</span>
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${isAnnual ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            {isAnnual && (
              <motion.div
                layoutId="pricing-thumb"
                className="absolute inset-0 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Annual</span>
            <span className={`relative z-10 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors ${isAnnual ? 'bg-emerald-100 text-emerald-700' : 'bg-black/5 text-zinc-500'}`}>Save 20%</span>
          </button>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        {loading ? (
            <div className="flex justify-center items-center py-20 text-zinc-500">Loading plans...</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
                <PricingCard key={i} plan={plan} isAnnual={isAnnual} delay={(i + 1) * 0.1} />
              ))}
            </div>
        )}
      </section>

      {/* Trusted By Logos */}
      <section className="py-24 border-y border-zinc-900/50 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-zinc-500 tracking-widest uppercase mb-12">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             {/* Abstract Logo Placeholders */}
             <div className="text-2xl font-serif tracking-tighter font-bold">ACME Corp</div>
             <div className="text-2xl font-sans tracking-widest font-light">GLOBEX</div>
             <div className="text-2xl font-mono tracking-tight font-bold">Soylent</div>
             <div className="text-2xl font-serif italic">Initech</div>
             <div className="text-2xl font-sans font-black tracking-tighter">UMBRELLA</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-zinc-500">Everything you need to know about our pricing.</p>
        </div>

        <div className="space-y-4">
          {[
            { q: "Can I switch plans later?", a: "Absolutely. You can upgrade or downgrade your plan at any time. Prorated charges will be applied automatically." },
            { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans." },
            { q: "Is there a free trial?", a: "Yes, all plans come with a 14-day free trial. No credit card required to start." },
            { q: "What happens if I exceed my limits?", a: "We'll notify you when you're approaching your limits. Your service won't be interrupted, but we'll reach out to discuss upgrading your plan." }
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ backgroundColor: openFaq === i ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0)' }}
              className="border border-zinc-200 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-6 flex justify-between items-center text-left"
              >
                <span className="font-medium text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-zinc-500 font-light leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden text-white">
          {/* Subtle noise/grid bg */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6 relative z-10">Ready to transform your business?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Join thousands of teams who have already leveled up their workflow with llamacorp.
          </p>
          <button className="bg-white hover:bg-zinc-200 text-black transition-all duration-300 rounded-full px-8 py-4 font-medium relative z-10 flex items-center gap-2 mx-auto">
            Start your free trial <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoImg} alt="llamacorp logo" className="w-8 h-8 object-contain" />
              <span className="font-bold tracking-widest uppercase text-sm">llamacorp</span>
            </div>
            <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xs">
              Our AI-driven solutions make web development faster, smarter, and more scalable.
              Contact us to build the future.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-zinc-500 hover:text-white transition-all text-sm font-light">About Us</Link></li>
              <li><a href="#" className="text-zinc-500 hover:text-white transition-all text-sm font-light">Customers</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-white transition-all text-sm font-light">Newsroom</a></li>
            </ul>
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
          <div className="flex gap-6">
            <a href="#" className="text-zinc-600 hover:text-zinc-300 transition-all text-xs font-light">Terms & Conditions</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-300 transition-all text-xs font-light">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
