import { Navbar } from "../components/Navbar";
import { ArrowUpRight, Linkedin, Instagram, Twitter, MessageCircle, Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import logoImg from '../assets/Logo.png';
import { SERVICES } from '../lib/data';

// Placeholders for task card and image clusters
const PLACEHOLDER_IMAGE_1 = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600";
const PLACEHOLDER_IMAGE_2 = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600";
const PLACEHOLDER_IMAGE_3 = "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600";

export default function ServicePage() {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/services`, { timeout: 2000 });
        const foundService = res.data.find((s: any) => s.slug === slug);
        if (foundService) {
          setService(foundService);
        } else {
          const fallback = SERVICES.find(s => s.slug === slug);
          setService(fallback || null);
        }
      } catch (err) {
        console.error("Failed to load service", err);
        const fallback = SERVICES.find(s => s.slug === slug);
        setService(fallback || null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif mb-4">Service Not Found</h1>
        <Link to="/services" className="text-zinc-400 hover:text-white underline underline-offset-4">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-zinc-800">
      <Navbar />

      {/* Hero Section */}
      <main className="relative pt-32 pb-16 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative">

          {/* Left Content */}
          <div className="w-full lg:w-1/2 relative z-10 flex flex-col items-start text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10">
              {service.description || "We provide end-to-end solutions that elevate your brand and drive results through strategic implementation and design excellence."}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to="/contact"
                className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2"
              >
                Schedule A Call
                <span className="bg-black text-white rounded-full p-1">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
              <a
                href="#process"
                className="px-8 py-4 rounded-full font-medium border border-zinc-800 text-white hover:bg-zinc-900 transition-colors flex items-center gap-2"
              >
                <div className="bg-white text-black rounded-full p-1">
                  <Play className="w-3 h-3 ml-0.5" />
                </div>
                See Our Process
              </a>
            </div>

            {/* Avatars below CTA */}
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                <img src={PLACEHOLDER_IMAGE_1} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
                <img src={PLACEHOLDER_IMAGE_2} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
                <img src={PLACEHOLDER_IMAGE_3} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
              </div>
              <p className="text-sm text-zinc-400">
                <span className="text-white font-semibold">10k+</span> World Class Client Over the World
              </p>
            </div>
          </div>

          {/* Right Visual / Card System */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">

            {/* The Main Task Card */}
            <div className="bg-[#111] border border-zinc-800/60 rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Our Process Checklist</h3>
                  <p className="text-xs text-zinc-500">Track the milestones of your project</p>
                </div>
                <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                  <MessageCircle className="w-5 h-5 text-zinc-400" />
                </div>
              </div>

              <div className="space-y-4">
                {/* Task Item */}
                <div className="flex justify-between items-center bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 transition-colors hover:bg-zinc-900">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border border-zinc-700 bg-zinc-800 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm"></div>
                    </div>
                    <span className="text-zinc-300 text-sm font-medium">Research & Discovery</span>
                  </div>
                  <span className="bg-zinc-800 text-zinc-400 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md">Week 1</span>
                </div>

                {/* Task Item */}
                <div className="flex justify-between items-center bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 transition-colors hover:bg-zinc-900">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border border-zinc-700 bg-zinc-800"></div>
                    <span className="text-zinc-300 text-sm font-medium">Strategic Planning</span>
                  </div>
                  <span className="bg-zinc-800 text-zinc-400 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md">Week 2</span>
                </div>

                {/* Task Item */}
                <div className="flex justify-between items-center bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 transition-colors hover:bg-zinc-900">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border border-zinc-700 bg-zinc-800"></div>
                    <span className="text-zinc-300 text-sm font-medium">Execution & Delivery</span>
                  </div>
                  <span className="bg-zinc-800 text-zinc-400 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md">Week 3+</span>
                </div>
              </div>

              {/* Progress Footer */}
              <div className="mt-6 pt-5 border-t border-zinc-800/60 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="flex -space-x-2">
                     <img src={PLACEHOLDER_IMAGE_1} className="w-6 h-6 rounded-full border border-black" />
                     <img src={PLACEHOLDER_IMAGE_2} className="w-6 h-6 rounded-full border border-black" />
                     <div className="w-6 h-6 rounded-full border border-black bg-zinc-800 flex items-center justify-center text-[8px]">+3</div>
                   </div>
                   <span className="text-xs text-zinc-500 ml-1">Team assigned</span>
                 </div>
                 <div className="text-xs text-blue-400 font-medium">33% Complete</div>
              </div>
            </div>

            {/* Decorative Floating Elements (mimicking the mockup's extra floating cards) */}
            <div className="absolute top-10 -left-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3 hidden md:flex animate-[pulse_4s_ease-in-out_infinite]">
              <div className="bg-green-500/20 text-green-500 p-2 rounded-lg">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Project ROI</p>
                <p className="text-sm font-semibold text-white">+145%</p>
              </div>
            </div>

            <div className="absolute -bottom-6 right-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-3 shadow-xl z-20 hidden md:flex">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                <span className="text-xs text-zinc-300 font-medium">Live Dashboard Sync</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Trusted By Section (From Mockup) */}
      <section className="px-6 lg:px-12 py-16 text-center border-y border-zinc-900 bg-[#050505]">
        <p className="text-zinc-500 text-sm font-medium tracking-wide mb-8">
          Trusted by the best creative teams and companies, globally
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-serif text-xl font-bold"><span className="w-6 h-6 rounded-sm bg-current rotate-45"></span> ZenZap</div>
          <div className="flex items-center gap-2 font-serif text-xl font-bold"><span className="w-6 h-6 rounded-full bg-current"></span> sparklë</div>
          <div className="flex items-center gap-2 font-sans text-xl font-bold"><span className="w-6 h-6 rounded-sm bg-green-500"></span> LumLabs</div>
          <div className="flex items-center gap-2 font-serif text-xl font-bold"><span className="w-6 h-6 rounded-tl-xl rounded-br-xl bg-cyan-500"></span> Craftgram</div>
          <div className="flex items-center gap-2 font-sans text-xl font-bold"><span className="w-2 h-6 bg-red-500"></span><span className="w-2 h-4 bg-red-500"></span><span className="w-2 h-8 bg-red-500"></span> Pulse</div>
        </div>
      </section>

      {/* Process / Benefits Section */}
      <section id="process" className="px-6 lg:px-12 py-24 max-w-7xl mx-auto">
        <div className="mb-16 md:flex justify-between items-end gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">Why Choose Our {service.title} Expertise</h2>
            <p className="text-zinc-400 text-lg font-light">
              We combine innovative thinking with proven methodologies to deliver exceptional value and unparalleled results.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
             <Link to={`/pricing/${service.slug}`} className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors rounded-full px-6 py-3 font-medium text-sm">
                View Pricing <ArrowUpRight className="w-4 h-4" />
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-[#0a0a0a] border border-zinc-800/60 rounded-3xl p-10 hover:border-zinc-700 transition-colors">
             <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-8">
               <span className="text-xl font-serif">01</span>
             </div>
             <h3 className="text-2xl font-medium mb-4">Strategic Planning</h3>
             <p className="text-zinc-400 font-light leading-relaxed mb-8">
                Develop robust strategies tailored to your business goals, ensuring long-term success and scalable growth. We map out every touchpoint.
             </p>
             <div className="aspect-[4/3] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/50 relative">
                <img src={PLACEHOLDER_IMAGE_1} alt="Planning" className="w-full h-full object-cover opacity-50 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
             </div>
           </div>

           <div className="bg-[#0a0a0a] border border-zinc-800/60 rounded-3xl p-10 hover:border-zinc-700 transition-colors">
             <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-8">
               <span className="text-xl font-serif">02</span>
             </div>
             <h3 className="text-2xl font-medium mb-4">Execution & Delivery</h3>
             <p className="text-zinc-400 font-light leading-relaxed mb-8">
                Flawless execution is at the core of what we do. Our team ensures that every deliverable meets the highest standards of quality.
             </p>
             <div className="aspect-[4/3] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/50 relative">
                <img src={PLACEHOLDER_IMAGE_2} alt="Support" className="w-full h-full object-cover opacity-50 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
             </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-12 py-24 mb-12">
        <div className="max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">Ready to elevate your brand?</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10">
              Join thousands of forward-thinking companies that have transformed their digital presence with our bespoke solutions.
            </p>
            <Link
              to="/contact"
              className="inline-flex bg-white text-black px-10 py-5 rounded-full font-medium hover:bg-zinc-200 transition-colors items-center gap-2 text-lg"
            >
              Start Your Project Today
              <span className="bg-black text-white rounded-full p-1.5 ml-2">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t border-zinc-900">
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
                <li><Link to="/services/ai-web-design" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">AI Web Design</Link></li>
                <li><Link to="/services/social-media" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Social Media</Link></li>
                <li><Link to="/services/seo" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">SEO</Link></li>
                <li><Link to="/services/branding" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Brand & Creative</Link></li>
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
