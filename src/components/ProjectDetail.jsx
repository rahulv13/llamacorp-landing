import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Globe, Layout, X } from 'lucide-react';

const transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

const blurTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

export default function ProjectDetail({ project, onClose }) {
  // Lock scroll on mount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, backgroundColor: 'rgba(252, 252, 252, 0)' }}
      animate={{ opacity: 1, backgroundColor: 'rgba(252, 252, 252, 1)' }}
      exit={{ opacity: 0, backgroundColor: 'rgba(252, 252, 252, 0)' }}
      transition={transition}
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#fcfcfc] text-[#111]"
      style={{ perspective: '1000px' }}
    >
      {/* Top Persistent Nav Crossfade */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ ...transition, delay: 0.1 }}
        className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-white"
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[14px] font-medium transition-transform hover:-translate-y-0.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="font-bold tracking-tight">Llamacorp</div>
      </motion.div>

      <main className="w-full min-h-screen relative">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[80vh] bg-[#f8f8f8] overflow-hidden origin-top">
          <motion.div
            layoutId={`project-image-container-${project.id}`}
            transition={transition}
            className="w-full h-full absolute inset-0 bg-[#f8f8f8] overflow-hidden"
            style={{ borderRadius: 0 }} // Will animate from 24px in list to 0px here
            initial={{ borderRadius: 24, filter: 'blur(4px)' }}
            animate={{ borderRadius: 0, filter: 'blur(0px)' }}
            exit={{ borderRadius: 24, filter: 'blur(4px)' }}
          >
            {/* The Image inside morphs and overscales slightly then settles */}
            <motion.div
              layoutId={`project-media-${project.id}`}
              initial={{ scale: 1.05, filter: 'blur(8px)' }}
              animate={{ scale: 1, filter: 'blur(0px)' }}
              exit={{ scale: 1.05, filter: 'blur(8px)' }}
              transition={transition}
              className="w-full h-full"
            >
              {project.mediaType === 'image-scroll' || project.mediaType === 'image-loop' ? (
                <img
                  src={project.url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={project.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30, translateZ: -50 }}
          animate={{ opacity: 1, y: 0, translateZ: 0 }}
          exit={{ opacity: 0, y: 20, translateZ: -50 }}
          transition={transition}
          className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-24"
        >
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-24">
            {/* Left Content (Title, Description, Buttons) */}
            <div className="xl:w-2/3 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ ...transition, delay: 0.15 }} // Hero title: 150ms delay
              >
                <div className="inline-flex items-center gap-2 text-[#555] text-[12px] font-bold uppercase tracking-wider mb-4">
                  <Layout size={14} className="text-[#111]" /> {project.category}
                </div>
                <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight font-bold text-[#111] mb-6">
                  {project.title}
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ ...transition, delay: 0.22 }} // Subtitle: 220ms delay
                className="text-[1.125rem] md:text-[1.5rem] text-[#555] leading-relaxed mb-10 max-w-3xl"
              >
                {project.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ ...transition, delay: 0.28 }} // Buttons: 280ms delay
                className="flex flex-col sm:flex-row gap-4 mb-16"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-[#111] text-white rounded-full py-4 px-8 font-medium text-[16px] transition-all hover:bg-[#333] hover:-translate-y-1 shadow-lg group/btn"
                >
                  Visit Website <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </motion.div>

              {/* Case Study Content Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ ...transition, delay: 0.34 }} // Remaining sections: 60ms stagger (0.28 + 0.06)
                className="prose prose-lg prose-neutral max-w-none text-[#444]"
              >
                <h3 className="text-2xl font-bold text-[#111] mb-4">The Challenge</h3>
                <p className="mb-8">
                  Creating a seamless digital experience that aligns with the brand's premium identity. The goal was to build a highly performant, visually striking interface that captures attention without sacrificing usability. We focused on fluid motion, deep optimization, and robust architecture to deliver a best-in-class product.
                </p>
                <h3 className="text-2xl font-bold text-[#111] mb-4">The Solution</h3>
                <p className="mb-8">
                  We engineered a custom frontend architecture utilizing modern web standards. By heavily leveraging hardware-accelerated animations and strict layout management, we ensured that every interaction feels incredibly smooth and responsive across all devices.
                </p>
              </motion.div>
            </div>

            {/* Right Content (Details) */}
            <div className="xl:w-1/3 flex flex-col gap-10 border-t xl:border-t-0 xl:border-l border-black/10 pt-10 xl:pt-0 xl:pl-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ ...transition, delay: 0.34 }}
              >
                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                  <div>
                    <span className="block text-[11px] text-[#777] uppercase font-bold tracking-wider mb-2">Client</span>
                    <span className="text-[15px] font-medium text-[#111]">{project.client}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#777] uppercase font-bold tracking-wider mb-2">Industry</span>
                    <span className="text-[15px] font-medium text-[#111]">{project.industry}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#777] uppercase font-bold tracking-wider mb-2">Year</span>
                    <span className="text-[15px] font-medium text-[#111]">{project.year}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ ...transition, delay: 0.40 }}
              >
                <span className="block text-[11px] text-[#777] uppercase font-bold tracking-wider mb-4">Services Provided</span>
                <ul className="flex flex-col gap-3">
                  {project.services.map((service, i) => (
                    <li key={i} className="flex items-center gap-3 text-[15px] text-[#333] font-medium">
                      <CheckCircle2 size={18} className="text-[#111]" /> {service}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ ...transition, delay: 0.46 }}
              >
                <span className="block text-[11px] text-[#777] uppercase font-bold tracking-wider mb-4">Technologies</span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="bg-black/5 text-[#333] px-4 py-1.5 rounded-full text-[14px] font-medium border border-black/5">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
