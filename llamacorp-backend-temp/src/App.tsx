import { ArrowRight, ArrowUpRight, Zap, Smartphone, Search, ChevronUp, ChevronDown, Check, Linkedin, Instagram, Twitter } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import axios from 'axios';
import heroVideo from './assets/Animate_this_delpmaspu_.mp4';
import { NumberTicker } from './components/NumberTicker';
import logoImg from './assets/Logo.png';
import { Navbar } from './components/Navbar';

const ScrollRevealText = ({ text, className }: { text: string; className: string }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const letters = text.split("");

  return (
    <h2 ref={containerRef} className={className}>
      {letters.map((char, index) => {
        const start = index / letters.length;
        const end = start + (0.5 / letters.length); // slightly overlap the fade
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        return (
          <motion.span key={index} style={{ opacity }}>
            {char}
          </motion.span>
        );
      })}
    </h2>
  );
};

export default function App() {
  const { scrollY } = useScroll();
  const videoOpacity = useTransform(scrollY, [0, 600], [1, 0.1]);
  const [activeAccordion, setActiveAccordion] = useState<number>(0);
  const [pageContent, setPageContent] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/home`);
        if (res.data && res.data.sections) {
          setPageContent(res.data.sections);
        }
      } catch (err) {
        console.error("Failed to load dynamic content", err);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Scrollable Video & Content Wrapper */}
      <div className="relative w-full">
        {/* Sticky Video Background that fading on scroll */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="sticky top-0 h-screen w-full overflow-hidden"
            style={{ opacity: videoOpacity }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-70 mix-blend-screen"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
          </motion.div>
        </div>

        {/* Hero & Second Section Content */}
        <div className="relative z-10">
          {/* Main Hero */}
          <main className="px-6 lg:px-12 pt-20 lg:pt-28 pb-32 min-h-screen flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <h1 className="font-serif text-7xl md:text-8xl lg:text-[11rem] leading-[0.85] tracking-tight uppercase mb-10 whitespace-pre-line">
                  {pageContent?.hero?.title ? pageContent.hero.title.replace(' ', '\n') : <>New<br />Era</>}<span className="text-zinc-500 text-4xl lg:text-6xl align-top ml-2">&reg;</span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-300 mb-12 font-light tracking-wide">
                  {pageContent?.hero?.subtitle || '/ We craft AI websites /'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth")}
                  className="bg-white hover:bg-zinc-200 text-black transition-all duration-300 rounded-full px-12 py-4 uppercase tracking-widest text-sm font-medium"
                >
                  {pageContent?.hero?.buttonText || 'Start'}
                </motion.button>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 relative mt-10 lg:mt-0">
                <div className="relative">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-10">
                    <button onClick={() => alert("Tag clicked: AI")} className="px-5 py-2 rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-xs uppercase tracking-wider">AI</button>
                    <button onClick={() => alert("Tag clicked: Design")} className="px-5 py-2 rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-xs uppercase tracking-wider">Design</button>
                    <button onClick={() => alert("Tag clicked: Web")} className="px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black transition-colors text-xs uppercase tracking-wider font-medium">Web</button>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-medium mb-4 leading-tight whitespace-pre-line">
                    {pageContent?.features?.heading || <>Intelligent design &<br />performance</>}
                  </h2>
                  <p className="text-zinc-400 font-light">
                    {pageContent?.features?.description || 'From prompt to production.'}
                  </p>
                </div>
              </div>
            </div>
          </main>

          {/* Second Section - Company Description ("About Us") */}
          <section className="px-6 lg:px-12 py-32 flex flex-col items-center justify-center text-center min-h-screen">
            <div className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-zinc-800 bg-black mb-10">
              <span className="text-sm font-medium tracking-wide text-zinc-300">Why llamacorp</span>
            </div>

            <ScrollRevealText
              text={pageContent?.about?.heading || "Design That Understands You"}
              className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight mb-8 max-w-4xl"
            />

            <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              {pageContent?.about?.text || "llamacorp is your AI-driven agency that listens, learns, and adapts, helping your brand find its digital rhythm every day."}
            </p>
          </section>
        </div>
      </div>

      {/* Third Section - Features / Integration */}
      <section className="px-6 lg:px-12 py-24 lg:py-32 border-t border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column - Text & Accordion */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-6">
              Production-Grade AI Architecture
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-16">
              Seamless Integration<br />
              <span className="italic text-zinc-400">with your brand</span>
            </h2>

            <div className="space-y-6">
              {/* Accordion Item 1 */}
              <div className="border-b border-zinc-800 pb-6">
                <div
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => setActiveAccordion(activeAccordion === 0 ? -1 : 0)}
                >
                  <div className="flex items-center gap-4">
                    <Zap className={`w-5 h-5 ${activeAccordion === 0 ? 'text-white' : 'text-zinc-500'}`} />
                    <h3 className={`text-lg font-medium transition-colors ${activeAccordion === 0 ? 'text-white group-hover:text-zinc-300' : 'text-zinc-500 group-hover:text-zinc-300'}`}>Engineered for performance</h3>
                  </div>
                  {activeAccordion === 0 ? <ChevronUp className="w-5 h-5 text-zinc-500" /> : <ChevronDown className="w-5 h-5 text-zinc-700" />}
                </div>
                <AnimatePresence>
                  {activeAccordion === 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pl-9">
                        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                          Never worry about site speed or page flicker with our AI-optimized rendering engine.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-3 text-sm text-zinc-500">
                            <Check className="w-4 h-4 text-zinc-600" />
                            Zero-bloat architecture
                          </li>
                          <li className="flex items-center gap-3 text-sm text-zinc-500">
                            <Check className="w-4 h-4 text-zinc-600" />
                            Sub-second load times
                          </li>
                          <li className="flex items-center gap-3 text-sm text-zinc-500">
                            <Check className="w-4 h-4 text-zinc-600" />
                            Automated asset optimization
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion Item 2 */}
              <div className="border-b border-zinc-800 pb-6">
                <div
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => setActiveAccordion(activeAccordion === 1 ? -1 : 1)}
                >
                  <div className="flex items-center gap-4">
                    <Smartphone className={`w-5 h-5 ${activeAccordion === 1 ? 'text-white' : 'text-zinc-500'}`} />
                    <h3 className={`text-lg font-medium transition-colors ${activeAccordion === 1 ? 'text-white group-hover:text-zinc-300' : 'text-zinc-500 group-hover:text-zinc-300'}`}>Responsive by default</h3>
                  </div>
                  {activeAccordion === 1 ? <ChevronUp className="w-5 h-5 text-zinc-500" /> : <ChevronDown className="w-5 h-5 text-zinc-700" />}
                </div>
                <AnimatePresence>
                  {activeAccordion === 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pl-9">
                        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                          Our designs adapt flawlessly to any screen size, ensuring a perfect user experience across all devices.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-3 text-sm text-zinc-500">
                            <Check className="w-4 h-4 text-zinc-600" />
                            Mobile-first methodology
                          </li>
                          <li className="flex items-center gap-3 text-sm text-zinc-500">
                            <Check className="w-4 h-4 text-zinc-600" />
                            Fluid typography and grids
                          </li>
                          <li className="flex items-center gap-3 text-sm text-zinc-500">
                            <Check className="w-4 h-4 text-zinc-600" />
                            Touch-optimized interfaces
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion Item 3 */}
              <div className="border-b border-zinc-800 pb-6">
                <div
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => setActiveAccordion(activeAccordion === 2 ? -1 : 2)}
                >
                  <div className="flex items-center gap-4">
                    <Search className={`w-5 h-5 ${activeAccordion === 2 ? 'text-white' : 'text-zinc-500'}`} />
                    <h3 className={`text-lg font-medium transition-colors ${activeAccordion === 2 ? 'text-white group-hover:text-zinc-300' : 'text-zinc-500 group-hover:text-zinc-300'}`}>SEO & Accessibility</h3>
                  </div>
                  {activeAccordion === 2 ? <ChevronUp className="w-5 h-5 text-zinc-500" /> : <ChevronDown className="w-5 h-5 text-zinc-700" />}
                </div>
                <AnimatePresence>
                  {activeAccordion === 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pl-9">
                        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                          Built with semantic markup and best practices to rank higher and serve everyone better.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-3 text-sm text-zinc-500">
                            <Check className="w-4 h-4 text-zinc-600" />
                            WCAG 2.1 AA compliant
                          </li>
                          <li className="flex items-center gap-3 text-sm text-zinc-500">
                            <Check className="w-4 h-4 text-zinc-600" />
                            Dynamic meta tags and structured data
                          </li>
                          <li className="flex items-center gap-3 text-sm text-zinc-500">
                            <Check className="w-4 h-4 text-zinc-600" />
                            Keyboard navigable
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Grid */}
          <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Background blurred grid elements */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-4 opacity-20 pointer-events-none">
              <div className="col-span-1 row-span-1 bg-zinc-900 rounded-2xl"></div>
              <div className="col-span-2 row-span-1 bg-zinc-800 rounded-2xl"></div>
              <div className="col-span-1 row-span-2 bg-zinc-900 rounded-2xl"></div>
              <div className="col-span-1 row-span-1 bg-zinc-800 rounded-2xl"></div>
              <div className="col-span-1 row-span-1 bg-zinc-900 rounded-2xl"></div>
              <div className="col-span-2 row-span-2 bg-zinc-800 rounded-2xl"></div>
              <div className="col-span-1 row-span-1 bg-zinc-900 rounded-2xl"></div>
            </div>

            {/* Highlighted Center Card */}
            <div className="relative z-10 bg-[#111] border border-zinc-700 rounded-3xl p-8 shadow-2xl w-72 backdrop-blur-xl">
              <div className="flex flex-col items-center justify-center">
                {/* Gauge visualization */}
                <div className="relative w-40 h-20 overflow-hidden mb-4">
                  <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[6px] border-zinc-800"></div>
                  <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[6px] border-white border-b-transparent border-r-transparent border-l-transparent rotate-45"></div>
                  {/* Dot indicator */}
                  <div className="absolute top-2 right-6 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                </div>

                <div className="text-4xl font-light tracking-tight mb-1">
                  <NumberTicker value={0.532} decimalPlaces={3} />
                  <span className="text-xl text-zinc-500">s</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">Site Performance</div>
              </div>
            </div>

            {/* Secondary Highlighted Card */}
            <div className="absolute z-0 right-0 bottom-10 lg:bottom-20 bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 shadow-xl w-64 opacity-80 hidden md:block">
              <div className="w-10 h-10 bg-zinc-900 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-4 h-4 border border-zinc-600 rounded-sm"></div>
              </div>
              <div className="h-2 w-24 bg-zinc-800 rounded-full mb-2"></div>
              <div className="h-2 w-16 bg-zinc-800 rounded-full mb-6"></div>
              <div className="flex gap-1 mb-4">
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
              </div>
              <div className="h-8 w-full bg-zinc-900 rounded-md"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Fourth Section - Portfolio / Work */}
      <section className="px-6 lg:px-12 py-24 lg:py-32 border-t border-zinc-900 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight max-w-2xl">
            Generated Precision,<br />Human Impact
          </h2>
          <p className="text-zinc-400 text-lg max-w-md font-light leading-relaxed">
            Explore the digital experiences we've crafted using advanced AI models—each designed to deliver real business impact.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-16">
          <button onClick={() => alert("Filter: All Projects")} className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-medium tracking-wide">All Projects</button>
          <button onClick={() => alert("Filter: AI Web Apps")} className="px-6 py-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors text-sm tracking-wide">AI Web Apps</button>
          <button onClick={() => alert("Filter: Generative UI")} className="px-6 py-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors text-sm tracking-wide">Generative UI</button>
          <button onClick={() => alert("Filter: E-Commerce")} className="px-6 py-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors text-sm tracking-wide">E-Commerce</button>
          <button onClick={() => alert("Filter: SaaS Platforms")} className="px-6 py-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors text-sm tracking-wide">SaaS Platforms</button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1: E-commerce website */}
          <div className="group cursor-pointer" onClick={() => window.open('https://cursor-tracker-steel.vercel.app/', '_blank')}>
            <div className="w-full aspect-[4/3] bg-[#0a0a0a] rounded-[2rem] mb-6 overflow-hidden relative border border-zinc-800">
              <iframe
                src="https://cursor-tracker-steel.vercel.app/"
                title="E-commerce website"
                className="w-full h-full border-0 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                scrolling="no"
              />
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-2xl font-medium mb-2">E-commerce website</h3>
                <p className="text-zinc-500 font-light text-sm leading-relaxed">Adaptive, personalized storefronts generated in real-time.</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Card 2: Landing Page */}
          <div className="group cursor-pointer" onClick={() => window.open('https://motion-site-sand.vercel.app/', '_blank')}>
            <div className="w-full aspect-[4/3] bg-[#0a0a0a] rounded-[2rem] mb-6 overflow-hidden relative border border-zinc-800">
              <iframe
                src="https://motion-site-sand.vercel.app/"
                title="Landing Page"
                className="w-full h-full border-0 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                scrolling="no"
              />
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-2xl font-medium mb-2">Landing Page</h3>
                <p className="text-zinc-500 font-light text-sm leading-relaxed">Intelligent conversational UI for seamless user support.</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Card 3: Anime Listing */}
          <div className="group cursor-pointer" onClick={() => window.open('https://chechdragon.vercel.app/', '_blank')}>
            <div className="w-full aspect-[4/3] bg-[#0a0a0a] rounded-[2rem] mb-6 overflow-hidden relative border border-zinc-800">
              <iframe
                src="https://chechdragon.vercel.app/"
                title="Anime Listing"
                className="w-full h-full border-0 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                scrolling="no"
              />
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-2xl font-medium mb-2">Anime Listing</h3>
                <p className="text-zinc-500 font-light text-sm leading-relaxed">Data-driven analytics platform with predictive UI.</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>

        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-zinc-900">
          <button onClick={() => alert("Previous Item")} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <button onClick={() => alert("Next Item")} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t border-zinc-900">
        {/* CTA Section */}
        <div className="bg-[#0a0a0a] px-6 py-24 lg:py-32 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Subtle background grid for CTA */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 relative z-10">
            From Prompt to Production in Days
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl font-light leading-relaxed mb-10 relative z-10">
            Accelerate your digital presence with our AI-driven design and development.
            Reduce time-to-market and optimize costs. Start your project today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Work With Us form opened!")}
            className="bg-white hover:bg-zinc-200 text-black transition-all duration-300 rounded-full px-8 py-3 font-medium text-sm relative z-10"
          >
            Work With Us
          </motion.button>
        </div>

        {/* Main Footer Content */}
        <div className="px-6 lg:px-12 py-16 bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

            {/* Logo & Description */}
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

            {/* Links Columns */}
            <div>
              <h4 className="text-white font-medium mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">About Us</Link></li>
                <li><a href="#" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Customers</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Newsroom</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Events</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6">Services</h4>
              <ul className="space-y-4">
                <li><Link to="/services" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">AI Web Design & Development</Link></li>
                <li><Link to="/services" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Social Media Management</Link></li>
                <li><Link to="/services" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">SEO</Link></li>
                <li><Link to="/services" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Brand & Creative</Link></li>
              </ul>
            </div>

            {/* Contact & Socials */}
            <div>
              <h4 className="text-white font-medium mb-6">Get In Touch</h4>
              <a href="mailto:hello@llamacorp.com" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light block mb-6">
                hello@llamacorp.com
              </a>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/llamacorp1/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-xs font-light">
              &copy; 2026 llamacorp. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-600 hover:text-zinc-300 hover:underline underline-offset-4 transition-all text-xs font-light">Terms & Conditions</a>
              <a href="#" className="text-zinc-600 hover:text-zinc-300 hover:underline underline-offset-4 transition-all text-xs font-light">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
