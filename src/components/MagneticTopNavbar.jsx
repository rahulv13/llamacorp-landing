import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function MagneticTopNavbar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getTranslateX = (index) => {
    if (hoveredIndex === null) return 0;
    const diff = index - hoveredIndex;
    if (diff === -1) return 12; // left neighbor moves right
    if (diff === 1) return -12; // right neighbor moves left
    if (diff === -2) return 6;
    if (diff === 2) return -6;
    return 0;
  };

  const getScale = (index) => {
    if (hoveredIndex === null) return 1;
    if (index === hoveredIndex) return 1.15;
    if (Math.abs(index - hoveredIndex) === 1) return 1.05;
    return 1;
  };

  const springConfig = {
    type: 'spring',
    stiffness: 450,
    damping: 25,
    mass: 1,
  };

  const centerLinks = [
    { label: 'Works', index: 0, href: '/work' },
    { label: 'About', index: 1, href: '/about' },
    { label: 'Services', index: 2, href: '/#services' },
    { label: 'Pricing', index: 3, href: '/#pricing' },
    { label: 'Blog', index: 4, href: '/blog' },
    { label: 'FAQs', index: 5, href: '/#faqs' },
  ];

  const rightActions = [
    { type: 'icon', label: 'WhatsApp', bg: 'bg-transparent', index: 5, href: 'https://wa.me/919769285318?text=Hi%20Llamacorp%2C%20I%27d%20like%20to%20discuss%20a%20project.', target: '_blank', rel: 'noopener noreferrer', ariaLabel: 'Chat with Llamacorp on WhatsApp', icon: (
      <svg className="w-full h-full" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" rx="13.28" fill="url(#paint0_linear_2303_1997)"/>
        <path d="M25.0719 21.0675L26.2879 24.7153C26.5024 25.359 26.376 26.0674 25.9522 26.5972L25.0888 27.6765C24.8167 28.0166 24.7965 28.4956 25.0411 28.8559C27.5412 32.5386 29.2614 34.3751 32.5056 35.5374C32.8824 35.6724 33.3009 35.5504 33.5615 35.2465L35.0778 33.4774C35.6924 32.7604 36.7249 32.571 37.554 33.0232L40.4537 34.6049C41.1664 34.9936 41.5944 35.7819 41.4069 36.5718C40.5955 39.9893 38.3135 40.9391 35.6319 40.7476C28.6319 40.2476 19.132 30.2476 19.1319 24.7476C19.1319 23.2247 19.4218 21.9917 20.4431 20.8279C21.1318 20.043 22.1964 19.7476 23.2406 19.7476C24.0715 19.7476 24.8092 20.2793 25.0719 21.0675Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.13194 52.2477L18.7542 49.6591C22.9076 52.0936 27.7558 53.1436 32.5867 52.6134C38.2849 51.9879 43.5295 49.2112 47.2498 44.85C50.9701 40.4888 52.8855 34.872 52.6049 29.1465C52.3244 23.4209 49.869 18.0184 45.7402 14.0418C41.6114 10.0652 36.1204 7.81449 30.3884 7.74914C24.6563 7.6838 19.1155 9.80875 14.8971 13.6902C10.6787 17.5716 8.1008 22.9168 7.68978 28.6344C7.35367 33.3101 8.48734 37.9465 10.8913 41.9119L8.13194 52.2477ZM20.777 46.2082L19.3802 45.3895L13.7357 46.765L15.1957 41.2962L14.3118 39.8382C12.3352 36.5778 11.4031 32.7656 11.6795 28.9212C12.0174 24.2201 14.137 19.8251 17.6055 16.6337C21.074 13.4423 25.6298 11.6952 30.3428 11.7489C35.0558 11.8026 39.5706 13.6532 42.9654 16.9228C46.3602 20.1925 48.379 24.6346 48.6097 29.3423C48.8404 34.0499 47.2655 38.6681 44.2066 42.254C41.1477 45.8399 36.8355 48.123 32.1503 48.6372C28.1783 49.0732 24.192 48.2099 20.777 46.2082Z" fill="white"/>
        <defs>
          <linearGradient id="paint0_linear_2303_1997" x1="30" y1="0" x2="30" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00FF68"/>
            <stop offset="1" stopColor="#00D624"/>
          </linearGradient>
        </defs>
      </svg>
    )},
    { type: 'icon', label: 'Telegram', bg: 'bg-transparent', index: 6, href: 'https://t.me/+919769285318', target: '_blank', rel: 'noopener noreferrer', ariaLabel: 'Chat with Llamacorp on Telegram', icon: (
      <svg className="w-full h-full" width="1150" height="1150" viewBox="0 0 1150 1150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 400C0 259.987 0 189.98 27.2484 136.502C51.2167 89.4619 89.4619 51.2167 136.502 27.2484C189.98 0 259.987 0 400 0H750C890.013 0 960.02 0 1013.5 27.2484C1060.54 51.2167 1098.78 89.4619 1122.75 136.502C1150 189.98 1150 259.987 1150 400V750C1150 890.013 1150 960.02 1122.75 1013.5C1098.78 1060.54 1060.54 1098.78 1013.5 1122.75C960.02 1150 890.013 1150 750 1150H400C259.987 1150 189.98 1150 136.502 1122.75C89.4619 1098.78 51.2167 1060.54 27.2484 1013.5C0 960.02 0 890.013 0 750V400Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M260.278 568.931C427.902 495.9 539.678 447.753 595.605 424.491C755.289 358.073 788.469 346.535 810.096 346.154C814.853 346.071 825.488 347.249 832.378 352.84C838.195 357.56 839.795 363.936 840.561 368.411C841.327 372.887 842.281 383.081 841.522 391.047C832.869 481.968 795.426 702.61 776.378 804.443C768.317 847.532 752.447 861.98 737.082 863.394C703.69 866.467 678.335 841.327 645.993 820.127C595.386 786.953 566.796 766.302 517.673 733.93C460.902 696.519 497.704 675.958 530.057 642.354C538.525 633.56 685.647 499.74 688.495 487.601C688.851 486.083 689.182 480.423 685.82 477.435C682.457 474.447 677.495 475.468 673.914 476.281C668.839 477.433 587.993 530.869 431.376 636.59C408.428 652.348 387.643 660.025 369.02 659.623C348.489 659.18 308.997 648.015 279.638 638.472C243.629 626.766 215.009 620.578 217.501 600.699C218.799 590.344 233.058 579.755 260.278 568.931Z" fill="url(#paint0_linear_9_480)"/>
        <defs>
          <linearGradient id="paint0_linear_9_480" x1="831.45" y1="349.6" x2="491.05" y2="719.9" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2AABEE"/>
            <stop offset="1" stopColor="#229ED9"/>
          </linearGradient>
        </defs>
      </svg>
    )},
    { type: 'button', label: "Let's Work", index: 7, href: "mailto:llamacorp8@gmail.com?subject=New%20Project%20Inquiry%20from%20Llamacorp&body=Hi%20Llamacorp%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project.%0A%0AName%3A%0ACompany%3A%0AProject%20details%3A%0ABudget%3A%0ATimeline%3A" }
  ];

  return (
    <header className="fixed top-4 md:top-6 left-0 w-full flex justify-center z-[100] px-4 md:px-5 pointer-events-none box-border">
      <nav 
        className="pointer-events-auto bg-white/70 backdrop-blur-xl border border-black/5 text-[#111] rounded-full p-2 md:p-2.5 flex items-center justify-between w-full max-w-[430px] md:max-w-[950px] shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        
        {/* Logo */}
        <a href="/" onMouseEnter={() => setHoveredIndex(null)} className="flex items-center gap-2 pl-2 md:pl-4 pr-2 md:pr-8 font-semibold text-[15px] cursor-pointer shrink-0 no-underline text-[#111]">
          <img src="/logo2.svg" alt="Llamacorp Logo" className="w-8 h-8 object-contain rounded-[5px] overflow-hidden" />
          <span className="hidden md:inline">Llamacorp</span>
        </a>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {centerLinks.map((item) => (
            <motion.a
              key={item.label}
              href={item.href || "#"}
              onMouseEnter={() => setHoveredIndex(item.index)}
              animate={{
                x: getTranslateX(item.index),
                scale: getScale(item.index),
              }}
              transition={springConfig}
              className="text-[#111] no-underline text-[14px] font-medium transition-colors hover:text-[#555] px-2 py-1 cursor-pointer block"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Right Actions & Mobile Toggle */}
        <div 
          className="flex items-center gap-2 md:gap-3 pl-4 md:pl-8 pr-1"
          onMouseEnter={() => setHoveredIndex(null)}
        >
          {rightActions.map((item) => {
            if (item.type === 'icon') {
              return (
                <a
                  key={item.label}
                  href={item.href || "#"}
                  target={item.target}
                  rel={item.rel}
                  aria-label={item.ariaLabel}
                  className={`hidden md:flex items-center justify-center w-[38px] h-[38px] rounded-full ${item.bg} cursor-pointer hover:scale-105 transition-transform`}
                >
                  {item.icon}
                </a>
              );
            }
            if (item.type === 'button') {
              return (
                <a
                  key={item.label}
                  href={item.href || "#"}
                  className="bg-[#111] text-white py-2.5 px-5 md:px-6 rounded-full no-underline text-[13px] md:text-[14px] font-medium cursor-pointer ml-1 block hover:bg-[#333] transition-colors"
                >
                  {item.label}
                </a>
              );
            }
          })}
          
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-black/5 ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[80px] left-5 right-5 bg-white/95 backdrop-blur-xl border border-black/5 rounded-3xl p-6 shadow-xl pointer-events-auto md:hidden flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4 border-b border-black/5 pb-4">
              {centerLinks.map((item) => (
                <a key={item.label} href={item.href || "#"} onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-medium text-[#111]">{item.label}</a>
              ))}
            </div>
            <div className="flex gap-4 pt-2">
              {rightActions.filter(item => item.type === 'icon').map((item) => (
                <a key={item.label} href={item.href || "#"} target={item.target} rel={item.rel} aria-label={item.ariaLabel} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center justify-center w-10 h-10 rounded-full ${item.bg}`}>
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
