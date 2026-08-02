import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Globe, Layout } from 'lucide-react';
import MagneticTopNavbar from '../components/MagneticTopNavbar';

const stats = [
  { label: 'Projects Completed', value: '40+' },
  { label: 'Industries', value: '12' },
  { label: 'Client Satisfaction', value: '99%' },
];

const categories = ['All', 'Web Design', 'Development', 'Branding', 'E-commerce'];

const projects = [
  {
    id: 1,
    title: "Metloop Landing Page",
    client: "Metloop",
    industry: "Technology",
    year: "2026",
    description: "Designed a high-converting landing page focusing on premium branding and clear user flows.",
    services: ["UI/UX Design", "Web Development"],
    tech: ["React", "Tailwind CSS"],
    mediaType: "image-scroll",
    url: "/assets/Mindloop.gif",
    category: "Web Design",
    link: "https://motion-site-sand.vercel.app/"
  },
  {
    id: 2,
    title: "Art Landing",
    client: "Art Co",
    industry: "Creative",
    year: "2026",
    description: "An elegant, motion-rich experience showcasing digital artwork and immersive storytelling.",
    services: ["Web Design", "Motion Graphics"],
    tech: ["Next.js", "Framer Motion"],
    mediaType: "video",
    url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/a/mezzanine%20(1).mp4",
    category: "Web Design",
    link: "https://art-landing.vercel.app/"
  },
  {
    id: 3,
    title: "Galaxy Home",
    client: "Galaxy Tech",
    industry: "Consumer Electronics",
    year: "2026",
    description: "A futuristic product launch page with 3D elements and engaging scroll interactions.",
    services: ["Product Design", "3D Web"],
    tech: ["Three.js", "React"],
    mediaType: "video",
    url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/uploaded/galaxyhome.mp4",
    category: "Development",
    link: "https://galaxy-website-theta.vercel.app/"
  },
  {
    id: 4,
    title: "Wisa Landing",
    client: "Wisa",
    industry: "Fintech",
    year: "2026",
    description: "A modern, scrolling landing page built to establish trust and simplify complex financial products.",
    services: ["UX Design", "Frontend Dev"],
    tech: ["Vue.js", "Tailwind"],
    mediaType: "image-loop",
    url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/hero%20sections/animated%20(47).webp",
    category: "Web Design",
    link: "https://wisa-seven.vercel.app/"
  },
  {
    id: 5,
    title: "Luxury Home",
    client: "Estate Lux",
    industry: "Real Estate",
    year: "2026",
    description: "A premium real estate portal presenting high-end properties with large, immersive visuals.",
    services: ["Web Design", "Development"],
    tech: ["React", "Next.js"],
    mediaType: "image-loop",
    url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/hero%20sections/animated%20(8).webp",
    category: "E-commerce",
    link: "https://real-estate-nu-pied.vercel.app/"
  },
  {
    id: 6,
    title: "Botanic Perfume",
    client: "Botanic",
    industry: "Beauty",
    year: "2026",
    description: "An elegant e-commerce experience for a luxury fragrance brand with fluid animations.",
    services: ["E-commerce", "Branding"],
    tech: ["Shopify", "Tailwind CSS"],
    mediaType: "image-loop",
    url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/hero%20sections/animated%20(36).webp",
    category: "E-commerce",
    link: "#"
  },
  {
    id: 7,
    title: "Luxury Brand",
    client: "Aura",
    industry: "Fashion",
    year: "2026",
    description: "A sophisticated brand showcase with seamless video integration and editorial typography.",
    services: ["Web Design", "Art Direction"],
    tech: ["React", "Framer Motion"],
    mediaType: "video",
    url: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/fe42Area.mp4",
    category: "Branding",
    link: "https://cursor-tracker-steel.vercel.app/"
  },
  {
    id: 8,
    title: "Duolingo Landing Page",
    client: "Duolingo",
    industry: "Education",
    year: "2026",
    description: "A fun and highly interactive landing page designed to increase user acquisition through gamified elements.",
    services: ["UI/UX Design", "Web Development"],
    tech: ["React", "Tailwind CSS"],
    mediaType: "image-scroll",
    url: "/assets/Duolingo.gif",
    category: "Web Design",
    link: "https://duolingo-landing-page.vercel.app/"
  }
];

const ScrollImage = ({ src }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current && imgRef.current) {
        const containerH = containerRef.current.clientHeight;
        const imgH = imgRef.current.clientHeight;
        setMaxTranslate(Math.max(0, imgH - containerH));
      }
    };
    
    // Slight delay to ensure image is painted
    const timeout = setTimeout(updateSize, 100);
    window.addEventListener('resize', updateSize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateSize);
    };
  }, [src]);

  return (
    <div ref={containerRef} className="w-full h-[400px] md:h-[600px] overflow-hidden relative group cursor-ns-resize bg-[#fafafa]">
      <img
        ref={imgRef}
        src={src}
        alt="Preview"
        className="w-full h-auto block transition-transform ease-in-out will-change-transform"
        style={{ 
          transitionDuration: '9s', 
          transform: `translateY(var(--scroll-y, 0px))` 
        }}
        onMouseEnter={(e) => e.currentTarget.style.setProperty('--scroll-y', `-${maxTranslate}px`)}
        onMouseLeave={(e) => e.currentTarget.style.setProperty('--scroll-y', `0px`)}
        onLoad={(e) => {
          if (containerRef.current) {
             const containerH = containerRef.current.clientHeight;
             const imgH = e.target.clientHeight;
             setMaxTranslate(Math.max(0, imgH - containerH));
          }
        }}
        loading="lazy"
      />
    </div>
  );
};

const AutoplayVideo = ({ src }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(e => console.log('Autoplay prevented:', e));
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[600px] overflow-hidden relative bg-[#fafafa]">
      <motion.video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full object-cover will-change-transform"
      />
    </div>
  );
};

const AnimatedWebP = ({ src }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-[400px] md:h-[600px] overflow-hidden relative bg-[#fafafa]">
      <motion.img
        src={src}
        alt="Preview"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full object-cover will-change-transform"
      />
    </div>
  );
};

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#111] font-sans selection:bg-[#111] selection:text-white">
      <MagneticTopNavbar />

      <main className="pt-32 pb-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-12 md:mt-24 mb-20 md:mb-32">
          <motion.a 
            href="/"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[14px] font-medium text-[#555] hover:text-[#111] transition-colors mb-8 border border-black/10 rounded-full px-4 py-2 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-300"
          >
            <ArrowLeft size={16} /> Go Back
          </motion.a>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] tracking-[-0.04em] font-bold text-[#111] mb-6"
          >
            Selected Work
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-[600px] text-[1.125rem] md:text-[1.25rem] text-[#555] leading-[1.6] mb-12"
          >
            A collection of websites and digital experiences we've designed and developed for ambitious businesses.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 md:gap-16"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#111]">{stat.value}</span>
                <span className="text-[13px] md:text-[14px] font-medium text-[#777] uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Categories */}
        <section className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 md:mb-24">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[#111] text-white shadow-md' 
                  : 'bg-white border border-black/10 text-[#555] hover:border-black/30 hover:text-[#111]'
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Projects Showcase */}
        <section className="flex flex-col gap-24 md:gap-40">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full relative group"
              >
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start">
                  
                  {/* Browser Mockup */}
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
                    className="w-full xl:w-[70%] bg-white rounded-[24px] border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_24px_80px_rgba(0,0,0,0.12)] will-change-transform"
                  >
                    {/* Browser Top Bar */}
                    <div className="bg-[#f8f8f8] border-b border-black/5 px-4 py-3 flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                      </div>
                      <div className="flex-1 flex justify-center px-4">
                        <div className="bg-white/80 border border-black/5 rounded-md px-32 py-1.5 flex items-center gap-2 max-w-sm w-full shadow-sm text-[#777]">
                          <Globe size={12} />
                          <span className="text-[11px] font-medium truncate">llamacorp.com/{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
                        </div>
                      </div>
                      <div className="w-12"></div> {/* Spacer for symmetry */}
                    </div>
                    
                    {/* Browser Media Content */}
                    {project.mediaType === 'image-scroll' && <ScrollImage src={project.url} />}
                    {project.mediaType === 'video' && <AutoplayVideo src={project.url} />}
                    {project.mediaType === 'image-loop' && <AnimatedWebP src={project.url} />}

                  </motion.div>

                  {/* Project Details */}
                  <div className="w-full xl:w-[30%] flex flex-col pt-4 xl:pt-8 xl:sticky xl:top-32">
                    <div className="inline-flex items-center gap-2 text-[#555] text-[12px] font-bold uppercase tracking-wider mb-3">
                      <Layout size={14} className="text-[#111]" /> {project.category}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111] mb-2">{project.title}</h2>
                    <p className="text-[16px] md:text-[18px] text-[#555] leading-relaxed mb-8">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10 border-t border-black/5 pt-6">
                      <div>
                        <span className="block text-[11px] text-[#777] uppercase font-bold tracking-wider mb-1">Client</span>
                        <span className="text-[14px] font-medium text-[#111]">{project.client}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-[#777] uppercase font-bold tracking-wider mb-1">Industry</span>
                        <span className="text-[14px] font-medium text-[#111]">{project.industry}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-[#777] uppercase font-bold tracking-wider mb-1">Year</span>
                        <span className="text-[14px] font-medium text-[#111]">{project.year}</span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <span className="block text-[11px] text-[#777] uppercase font-bold tracking-wider mb-3">Services Provided</span>
                      <ul className="flex flex-col gap-2">
                        {project.services.map((service, i) => (
                          <li key={i} className="flex items-center gap-2 text-[14px] text-[#333] font-medium">
                            <CheckCircle2 size={16} className="text-[#111]" /> {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-10">
                      <span className="block text-[11px] text-[#777] uppercase font-bold tracking-wider mb-3">Technologies</span>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                          <span key={i} className="bg-black/5 text-[#333] px-3 py-1 rounded-full text-[13px] font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 bg-[#111] text-white rounded-full py-3.5 px-6 font-medium text-[15px] transition-all hover:bg-[#333] hover:-translate-y-0.5 hover:shadow-lg group/btn">
                        View Live <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                      <a href="#" className="flex-1 flex justify-center items-center bg-transparent text-[#111] border border-black/10 rounded-full py-3.5 px-6 font-medium text-[15px] transition-all hover:bg-black/5">
                        Case Study
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* Bottom CTA */}
        <section className="mt-32 md:mt-48 mb-12 bg-white border border-black/5 rounded-[24px] md:rounded-[40px] p-10 md:p-20 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/[0.02] to-transparent pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-[#111] mb-4 leading-tight">
              Have an idea?
            </h2>
            <p className="text-[1.125rem] md:text-[1.25rem] text-[#555] mb-10">
              We'd love to build something amazing together. Let's discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:hello@llamacorp.com" className="flex justify-center items-center bg-[#111] text-white rounded-full py-4 px-8 font-medium text-[16px] transition-all hover:bg-[#333] hover:-translate-y-0.5 hover:shadow-lg">
                Start a Project
              </a>

            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
