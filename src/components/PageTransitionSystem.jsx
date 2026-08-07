import React, { useState, useEffect, useRef } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';

const routesOrder = ['/', '/work', '/blog'];

export default function PageTransitionSystem({ children }) {
  const location = useLocation();
  const [renderedLocation, setRenderedLocation] = useState(location);
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();
  const isAnimating = useRef(false);

  useEffect(() => {
    if (location.pathname !== renderedLocation.pathname) {
      if (shouldReduceMotion) {
        setRenderedLocation(location);
        return;
      }

      // Determine direction
      const prevIndex = routesOrder.indexOf(renderedLocation.pathname);
      const currIndex = routesOrder.indexOf(location.pathname);
      
      let dir = 'right';
      if (prevIndex !== -1 && currIndex !== -1) {
        dir = currIndex > prevIndex ? 'right' : 'left';
      } else if (location.pathname.startsWith('/blog/')) {
        dir = 'bottom';
      } else {
        dir = 'top';
      }

      const wipeTransition = async () => {
        if (isAnimating.current) return; // Prevent overlapping transitions
        isAnimating.current = true;
        
        // 1. Snap overlay to start edge (hidden)
        let startClip = '';
        switch(dir) {
          case 'right': startClip = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'; break;
          case 'left': startClip = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'; break;
          case 'bottom': startClip = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'; break;
          case 'top': startClip = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'; break;
          default: startClip = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';
        }
        await controls.set({ clipPath: startClip, opacity: 1, display: 'block' });

        // 2. Animate to full screen (covering old page)
        await controls.start({ 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } 
        });

        // 3. Change Route (React unmounts old, mounts new)
        setRenderedLocation(location);

        // 4. Delay slightly to allow the DOM to paint the new route before we uncover it
        await new Promise(resolve => setTimeout(resolve, 50));

        // 5. Animate away (uncovering new page)
        let endClip = '';
        switch(dir) {
          case 'right': endClip = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'; break; // wipes to left
          case 'left': endClip = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'; break; // wipes to right
          case 'bottom': endClip = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'; break; // wipes to top
          case 'top': endClip = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'; break; // wipes to bottom
          default: endClip = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
        }

        await controls.start({ 
          clipPath: endClip,
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } 
        });

        // Hide the overlay completely to prevent pointer-events issues just in case
        controls.set({ display: 'none' });
        isAnimating.current = false;
      };

      wipeTransition();
    }
  }, [location, renderedLocation.pathname, controls, shouldReduceMotion]);

  // Page Content Animation Variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.9, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.3 // Stagger starts slightly before the wipe finishes
      } 
    }
  };

  return (
    <>
      <motion.div
        key={renderedLocation.pathname}
        variants={pageVariants}
        initial="hidden"
        animate="show"
        className="w-full h-full"
      >
        <Routes location={renderedLocation}>
          {children}
        </Routes>
      </motion.div>

      {/* Fullscreen Transition Overlay */}
      <motion.div
        animate={controls}
        initial={{ opacity: 0, clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', display: 'none' }}
        style={{ willChange: 'clip-path, transform', position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}
      >
        {/* Premium background design: Soft Glass + Gradient + Noise */}
        <div className="absolute inset-0 bg-[#fcfcfc]/40 backdrop-blur-3xl"></div>
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] via-transparent to-black/[0.04]"></div>
      </motion.div>
    </>
  );
}
