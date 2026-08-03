import { Navbar } from "./components/Navbar";
import { ArrowRight, ArrowUpRight, Check, Linkedin, Instagram, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import logoImg from './assets/Logo.png';
import { SERVICES } from './lib/data';

const ServicesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 lg:p-10 relative overflow-hidden">
          {/* Shimmer animation */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-800/20 to-transparent animate-[shimmer_1.5s_infinite]"></div>

          <div className="w-12 h-12 bg-zinc-800 rounded-xl mb-12"></div>

          <div className="space-y-4 mb-8">
             <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
             <div className="h-6 bg-zinc-800 rounded w-1/2"></div>
          </div>

          <div className="space-y-3 mb-16">
             <div className="h-4 bg-zinc-800 rounded w-full"></div>
             <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
             <div className="h-4 bg-zinc-800 rounded w-4/5"></div>
          </div>

          <div className="h-10 bg-zinc-800 rounded-full w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default function Services() {
  const [pageContent, setPageContent] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/services`);
        if (res.data && res.data.sections) {
          setPageContent(res.data.sections);
        }
      } catch (err) {
        console.error("Failed to load dynamic content", err);
      }
    };

    const fetchServices = async () => {
      setLoadingServices(true);
      setServicesError(null);

      const cachedServices = sessionStorage.getItem('services_cache');
      if (cachedServices) {
        try {
          const parsed = JSON.parse(cachedServices);
          if (parsed && parsed.length > 0) {
             setServices(parsed);
             setLoadingServices(false);
             return; // Skip network call if we have valid cache
          }
        } catch (e) {
          // parse failed, proceed to fetch
        }
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/services`);
        if (res.data && res.data.length > 0) {
          setServices(res.data);
          sessionStorage.setItem('services_cache', JSON.stringify(res.data));
        } else {
          setServices(SERVICES);
        }
      } catch (err) {
        console.error("Failed to load services", err);
        // setServicesError("Failed to load services. Please try again later.");
        setServices(SERVICES);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchContent();
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Header */}
      <main className="px-6 lg:px-12 pt-20 pb-20">
        <div className="max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight mb-8">
            {pageContent?.header?.title || "Our Services"}
          </h1>
          <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
            {pageContent?.header?.subtitle || "We offer a comprehensive suite of AI-driven design and development services tailored to elevate your digital presence."}
          </p>
        </div>
      </main>

      {/* Services List */}
      <section className="px-6 lg:px-12 py-12 border-t border-zinc-900">
        {loadingServices ? (
           <ServicesSkeleton />
        ) : servicesError ? (
           <div className="mt-8 text-center py-12 bg-zinc-900/50 rounded-3xl border border-zinc-800">
             <p className="text-red-400">{servicesError}</p>
           </div>
        ) : services.length === 0 ? (
           <div className="mt-8 text-center py-12 bg-zinc-900/50 rounded-3xl border border-zinc-800">
             <p className="text-zinc-400">No services available at the moment.</p>
           </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <div key={service._id || service.slug} className="group border border-zinc-800 rounded-[2rem] p-8 hover:bg-zinc-900/50 transition-colors">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl mb-6 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                <span className="font-serif text-xl">{(index + 1).toString().padStart(2, '0')}</span>
              </div>
              <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
              <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              {service.features && service.features.length > 0 && (
                <ul className="space-y-3">
                  {service.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-500">
                      <Check className="w-4 h-4 text-zinc-600" /> {feature}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors group">
                  Learn More <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}

          {/* CTA Box */}
          <div className="group border border-zinc-800 rounded-[2rem] p-8 bg-[#0a0a0a] flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-serif mb-4">Ready to start?</h3>
            <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6">
              Let's discuss how we can transform your digital presence.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Contact form opened!")}
              className="bg-white hover:bg-zinc-200 text-black transition-all duration-300 rounded-full px-8 py-3 font-medium text-sm"
            >
              Get in Touch
            </motion.button>
          </div>

        </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="border-t border-zinc-900 mt-20">
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
