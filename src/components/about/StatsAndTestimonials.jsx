import React, { useState, useEffect, useRef, useCallback } from 'react';
import { m, motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { text: "LlamaCorp didn't just build a website, they built our entire digital presence. The AI integration saved us months of work and fundamentally changed how we operate.", author: "Sarah Jenkins", role: "CEO, TechFlow", avatar: "https://i.pravatar.cc/150?img=12" },
  { text: "The attention to detail and premium design aesthetic elevated our brand instantly. Best agency we've ever worked with. I highly recommend them to any startup looking to scale.", author: "Marcus Thorne", role: "Founder, Minimalist", avatar: "https://i.pravatar.cc/150?img=33" },
  { text: "They understand the intersection of design, technology, and business better than anyone else in the industry.", author: "Elena Rodriguez", role: "CMO, Horizon", avatar: "https://i.pravatar.cc/150?img=47" },
  { text: "Incredible velocity. They delivered a complex platform in half the time we expected, without cutting any corners.", author: "David Chen", role: "Product Lead, Quantum", avatar: "https://i.pravatar.cc/150?img=11" },
  { text: "From the initial discovery call to the final launch, the process was seamless. The custom Framer Motion animations they added gave our site that 'Apple-like' feel we were aiming for.", author: "Jessica Wright", role: "Marketing Director", avatar: "https://i.pravatar.cc/150?img=5" },
  { text: "Their approach to SEO and programmatic content generation using AI is unparalleled. We saw a 300% increase in organic traffic within two months.", author: "Michael Chang", role: "Growth Hacker", avatar: "https://i.pravatar.cc/150?img=8" },
  { text: "Highly professional, communicative, and exceptionally talented.", author: "Rachel Adams", role: "Startup Founder", avatar: "https://i.pravatar.cc/150?img=9" },
  { text: "We were struggling to find an agency that truly understood modern SaaS aesthetics. LlamaCorp nailed it on the first iteration. The speed and quality are just phenomenal.", author: "James Peterson", role: "CTO, DataSync", avatar: "https://i.pravatar.cc/150?img=15" },
  { text: "A truly premium experience from start to finish. They act less like an external agency and more like an extension of your own product team.", author: "Nina Dobrev", role: "Creative Director", avatar: "https://i.pravatar.cc/150?img=43" }
];

export default function StatsAndTestimonials() {
  // Split testimonials into three columns for masonry/marquee
  const third = Math.ceil(testimonials.length / 3);
  const col1 = testimonials.slice(0, third);
  const col2 = testimonials.slice(third, third * 2);
  const col3 = testimonials.slice(third * 2);

  return (
    <section className="w-full max-w-[1240px] mx-auto px-4 md:px-6 mb-32 pt-20">
      
      {/* Top Stats & CTA Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 px-4">
        
        {/* Left Stat */}
        <div className="flex flex-col gap-4">
          <div className="w-[52px] h-[52px] bg-[#111] rounded-2xl flex items-center justify-center shadow-lg relative transform rotate-[-5deg] mb-2">
             <div className="w-6 h-6 flex items-center justify-center relative z-10">
               <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#FF2A6D]">
                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
               </svg>
             </div>
          </div>
          <div>
            <h2 className="text-5xl md:text-[80px] font-bold tracking-tight text-[#111] leading-none mb-4">150+</h2>
            <p className="text-[#111] font-bold text-[16px] max-w-[200px]">Projects delivered for global brands</p>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex flex-col gap-5 max-w-[320px]">
           {/* Interactive Hover Testimonials Row */}
           <HoverTestimonialsRow testimonials={testimonials.slice(0, 4)} />

           <p className="text-[#111] font-bold text-[16px] leading-snug">
             Join 150+ brands and start scaling faster with AI-powered development
           </p>
           <button className="bg-[#111] hover:bg-black text-white text-[15px] font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg w-max">
             Start a Project
           </button>
        </div>

      </div>

      {/* Animated Vertical Marquee Columns */}
      <div className="flex justify-center gap-6 overflow-hidden h-[700px] relative max-w-[1240px] mx-auto w-full" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
        
        {/* Column 1 - Scrolling up */}
        <TestimonialsColumn 
          className="flex-1 hidden md:block" 
          testimonialsList={col1} 
          duration={25} 
        />

        {/* Column 2 - Scrolling slightly slower */}
        <TestimonialsColumn 
          className="flex-1 hidden sm:block" 
          testimonialsList={col2} 
          duration={32} 
        />

        {/* Column 3 - Scrolling fastest */}
        <TestimonialsColumn 
          className="flex-1" 
          testimonialsList={col3} 
          duration={20} 
        />
        
      </div>
      
    </section>
  );
}

const TestimonialCard = ({ testimonial, index }) => {
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
         
         {/* Heart Shaped Avatar matching the reference */}
         <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 drop-shadow-sm ml-2">
           {/* White heart background/border */}
           <div 
             className="absolute inset-0 bg-white" 
             style={{ 
               WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\'/%3E%3C/svg%3E")', 
               WebkitMaskSize: 'contain', 
               WebkitMaskRepeat: 'no-repeat', 
               WebkitMaskPosition: 'center' 
             }}
           ></div>
           {/* Inner Image masked to a slightly smaller heart */}
           <div 
             className="absolute inset-[3px] bg-gray-100" 
             style={{ 
               WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\'/%3E%3C/svg%3E")', 
               WebkitMaskSize: 'contain', 
               WebkitMaskRepeat: 'no-repeat', 
               WebkitMaskPosition: 'center' 
             }}
           >
              <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
           </div>
         </div>
      </div>
    </div>
  );
};

const TestimonialsColumn = ({ className, testimonialsList, duration = 15 }) => {
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
                <TestimonialCard key={i} testimonial={t} index={i} />
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const HoverTestimonialsRow = ({ testimonials }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const audioPlayerRef = useRef(null); 
  const [hasBeenHovered, setHasBeenHovered] = useState(new Array(testimonials.length).fill(false));
  const [typedText, setTypedText] = useState('');
  const typewriterTimeoutRef = useRef(null);
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

  const startTypewriter = useCallback((text) => {
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

  const handleMouseEnter = useCallback((index) => {
    stopAudio(); 
    setHoveredIndex(index);
  
    // Audio playback logic (disabled since no local audio files, but kept structure)
    // const newAudio = new Audio(`/audio/${testimonials[index].audio}`);
    // audioPlayerRef.current = newAudio; 
    // newAudio.play().catch(e => console.warn(e));
    
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
      {/* Overlapping avatars logic */}
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
            <motion.img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="w-[42px] h-[42px] rounded-full border-2 hover:animate-pulse object-cover bg-white"
              animate={{ 
                borderColor: (hoveredIndex === index || hasBeenHovered[index]) ? '#111' : '#fff'
              }}
              transition={{ duration: 0.3 }}
            />
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
                  {/* Tail of the speech bubble */}
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
