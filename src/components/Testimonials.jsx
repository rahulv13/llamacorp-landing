import React, { useState, useEffect } from 'react';
import { Star, TrendingUp } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    quote: (
      <>
        The team delivered exactly what we were looking for. They <strong>understood our requirements</strong>, created a <strong>clean and professional website</strong> for Bansari Chemicals, and made the entire process <strong>smooth from start to finish</strong>. We're very happy with the final result.
      </>
    ),
    name: "Bansari",
    title: "Founder @ Bansari Chemicals",
    avatar: "/assets/testimonial_avatar.png",
    metrics: [
      { label: "Retention Increase", value: "10x" },
      { label: "Conversion Rate", value: "25%" }
    ]
  },
  {
    id: 2,
    quote: (
      <>
        Working with this team was a game-changer. They <strong>understood our needs</strong> and delivered an <strong>outstanding product</strong>. The new platform <strong>drives sales</strong> and <strong>engages users</strong> like never before.
      </>
    ),
    name: "Sarah Jenkins",
    title: "CEO @ TechFlow",
    avatar: "/assets/testimonial_avatar.png",
    metrics: [
      { label: "User Engagement", value: "3x" },
      { label: "Revenue Growth", value: "40%" }
    ]
  },
  {
    id: 3,
    quote: (
      <>
        Absolutely brilliant experience! From start to finish, the <strong>communication was stellar</strong> and the final delivery <strong>blew us away</strong>. Their attention to detail <strong>is unmatched</strong>.
      </>
    ),
    name: "Michael Chen",
    title: "Director @ InnovateCo",
    avatar: "/assets/testimonial_avatar.png",
    metrics: [
      { label: "Load Time Speed", value: "5x" },
      { label: "Bounce Rate", value: "-15%" }
    ]
  },
  {
    id: 4,
    quote: (
      <>
        They transformed our outdated site into a <strong>modern masterpiece</strong>. The transition was <strong>flawless</strong>, and we've seen a <strong>massive spike</strong> in daily active users since launch.
      </>
    ),
    name: "Elena Rodriguez",
    title: "CMO @ MarketPro",
    avatar: "/assets/testimonial_avatar.png",
    metrics: [
      { label: "Active Users", value: "8x" },
      { label: "Lead Generation", value: "50%" }
    ]
  },
  {
    id: 5,
    quote: (
      <>
        The best agency we've ever partnered with. They deliver <strong>high-quality code</strong>, beautiful designs, and the whole <strong>process feels effortless</strong>. We couldn't be happier!
      </>
    ),
    name: "David Kim",
    title: "Founder @ StartupX",
    avatar: "/assets/testimonial_avatar.png",
    metrics: [
      { label: "Development Time", value: "-30%" },
      { label: "Customer Satisfaction", value: "99%" }
    ]
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const length = testimonialsData.length;

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % length);
    }, 3500); // 3.5 seconds
    return () => clearInterval(interval);
  }, [isHovered, length]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const getCardStyles = (index) => {
    const isCenter = index === activeIndex;
    const isPrev = index === (activeIndex - 1 + length) % length;
    const isNext = index === (activeIndex + 1) % length;

    if (isCenter) {
      return 'scale-100 opacity-100 blur-0 shadow-xl z-20 translate-x-0 pointer-events-auto';
    }
    if (isPrev) {
      return 'scale-90 opacity-20 blur-[3px] shadow-sm z-10 -translate-x-[30%] md:-translate-x-[70%] pointer-events-none cursor-pointer';
    }
    if (isNext) {
      return 'scale-90 opacity-20 blur-[3px] shadow-sm z-10 translate-x-[30%] md:translate-x-[70%] pointer-events-none cursor-pointer';
    }
    // Hidden cards
    return 'scale-75 opacity-0 blur-md shadow-none z-0 translate-x-0 pointer-events-none';
  };

  return (
    <section className="w-full bg-[#f5f5f7] py-24 px-5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Header / Navbar Area */}
        <div className="flex flex-col items-center mb-16 text-center z-30 relative">
          <div className="inline-flex items-center gap-2 bg-[#111] text-white px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            TESTIMONIALS
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
          </div>
          
          <h2 className="text-[2.8rem] md:text-[4rem] font-bold text-[#111] tracking-tight leading-[1.1] mb-6">
            How we helped <br className="hidden md:block" /> our <span className="line-through text-gray-400 decoration-gray-400 decoration-4">clients</span> partners
          </h2>
          
          <p className="text-[#555] text-[1.1rem] md:text-[1.25rem] max-w-[600px] leading-relaxed">
            Fortunate to not just work together, but build connections that last a lifetime.
          </p>
        </div>

        {/* Testimonial Carousel Area */}
        <div 
          className="relative w-full flex items-center justify-center h-[500px] md:h-[600px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {testimonialsData.map((testimonial, index) => {
            const isCenter = index === activeIndex;
            return (
              <div 
                key={testimonial.id}
                className={`absolute top-1/2 -translate-y-1/2 w-full max-w-[90%] md:max-w-[580px] bg-white rounded-[32px] md:rounded-[40px] p-8 md:p-12 border border-black/[0.02] flex flex-col items-center transition-all duration-700 ease-in-out ${getCardStyles(index)}`}
                onClick={() => {
                  if (!isCenter) setActiveIndex(index);
                }}
              >
                {/* 5 Stars */}
                <div className="flex justify-center gap-1.5 mb-6 md:mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={22} className="fill-[#111] text-[#111]" />
                  ))}
                </div>

                {/* Block Quote */}
                <p className="text-center text-[1.15rem] md:text-[1.35rem] leading-[1.6] text-[#222] font-medium mb-8 md:mb-10">
                  "{testimonial.quote}"
                </p>

                {/* Profile */}
                <div className="flex flex-col items-center justify-center mb-8 md:mb-10">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover mb-4 shadow-sm" />
                  <h5 className="text-[1.1rem] font-bold text-[#111] mb-1">{testimonial.name}</h5>
                  <p className="text-[0.95rem] text-[#666]">{testimonial.title}</p>
                </div>

                {/* Metrics */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  {testimonial.metrics.map((metric, idx) => (
                    <div key={idx} className="flex-1 bg-[#f8f8f8] rounded-2xl p-5 flex items-center justify-between border border-black/[0.03]">
                      <div>
                        <div className="text-[1.5rem] font-bold text-[#111] mb-0.5">{metric.value}</div>
                        <div className="text-[12px] text-[#666] font-medium uppercase tracking-wide">{metric.label}</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-emerald-100/50 flex items-center justify-center shrink-0">
                        <TrendingUp size={16} className="text-emerald-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-2.5 mt-8 md:mt-10 z-30 relative">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                index === activeIndex ? 'bg-[#333]' : 'bg-[#ccc] hover:bg-[#999]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
