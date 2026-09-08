"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
  return (
    <div className="bg-white rounded-[24px] p-7 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col mb-6">
      <p className="text-[15px] md:text-[16px] text-[#161616] leading-[1.75] mb-6 font-normal font-sans">
        “{testimonial.text}”
      </p>
      
      {/* 5 Stars SVG */}
      <div className="flex gap-1 mb-8">
        {[1,2,3,4,5].map(star => (
          <svg key={star} viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-black">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* User Info */}
      <div className="flex items-center justify-between mt-auto">
         <div className="flex flex-col items-start">
            <h4 className="text-[15px] md:text-[16px] font-bold text-[#111] leading-tight mb-0.5">{testimonial.author}</h4>
            <p className="text-[13px] md:text-[14px] text-[#757575] leading-relaxed">{testimonial.role}</p>
         </div>
         
         {/* Heart Shaped Avatar */}
         <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 drop-shadow-sm ml-2">
           <div 
             className="absolute inset-0 bg-white" 
             style={{ 
               WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\'/%3E%3C/svg%3E")', 
               WebkitMaskSize: 'contain', 
               WebkitMaskRepeat: 'no-repeat', 
               WebkitMaskPosition: 'center' 
             }}
           ></div>
           <div 
             className="absolute inset-[3px] bg-gray-100" 
             style={{ 
               WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\'/%3E%3C/svg%3E")', 
               WebkitMaskSize: 'contain', 
               WebkitMaskRepeat: 'no-repeat', 
               WebkitMaskPosition: 'center' 
             }}
           >
              <Image src={testimonial.avatar} alt={testimonial.author} width={56} height={56} className="w-full h-full object-cover" />
           </div>
         </div>
      </div>
    </div>
  );
};

export const TestimonialsColumn = ({ className, testimonialsList, duration = 15 }: { className?: string, testimonialsList: any[], duration?: number }) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonialsList.map((t, i) => (
                <TestimonialCard key={i} testimonial={t} />
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export const HoverTestimonialsRow = ({ testimonials }: { testimonials: any[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null); 
  const [hasBeenHovered, setHasBeenHovered] = useState<boolean[]>(new Array(testimonials.length).fill(false));
  const [typedText, setTypedText] = useState('');
  const typewriterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentTextRef = useRef('');

  const stopAudio = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause(); 
      audioPlayerRef.current.currentTime = 0; 
      audioPlayerRef.current.src = ''; 
      audioPlayerRef.current.load(); 
      audioPlayerRef.current = null; 
    }
  }, []); 

  const startTypewriter = useCallback((text: string) => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
    setTypedText('');
    currentTextRef.current = text;
    
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
        typewriterTimeoutRef.current = setTimeout(type, 30);
      }
    };
    type();
  }, []);

  const stopTypewriter = useCallback(() => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
      typewriterTimeoutRef.current = null;
    }
    setTypedText('');
    currentTextRef.current = '';
  }, []); 

  const handleMouseEnter = useCallback((index: number) => {
    stopAudio(); 
    setHoveredIndex(index);
    
    setHasBeenHovered(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    startTypewriter(testimonials[index].text);
  }, [testimonials, stopAudio, startTypewriter]); 

  const handleMouseLeave = useCallback(() => {
    stopAudio(); 
    setHoveredIndex(null);
    stopTypewriter();
  }, [stopAudio, stopTypewriter]);

  useEffect(() => {
    return () => {
      stopAudio(); 
      stopTypewriter(); 
    };
  }, [stopAudio, stopTypewriter]); 

  return (
    <div className="flex justify-start items-center flex-wrap z-50">
      <div className="flex -space-x-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center"
            onMouseEnter={() => handleMouseEnter(index)} 
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05, zIndex: 50 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-[42px] h-[42px] rounded-full border-2 hover:animate-pulse bg-white relative overflow-hidden"
              animate={{ 
                borderColor: (hoveredIndex === index || hasBeenHovered[index]) ? '#111' : '#fff'
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={testimonial.avatar}
                alt={testimonial.author}
                fill
                className="object-cover"
              />
            </motion.div>
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: -20 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-10 -ml-16 sm:ml-0 bg-white border border-gray-100 text-black px-4 py-3 rounded-2xl shadow-xl w-56 z-50 pointer-events-none"
                >
                  <div className="h-auto max-h-24 overflow-hidden text-[12px] leading-relaxed">
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </div>
                  <div className="mt-2 text-right">
                    <p className="font-bold text-[12px]">{testimonial.author}</p>
                    <p className="text-[#888] text-[10px]">{testimonial.role}</p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-4 h-4 bg-white border-b border-r border-gray-100 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
