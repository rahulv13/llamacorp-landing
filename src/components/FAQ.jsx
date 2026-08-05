import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import rahulAvatar from '../Rahul.png';
import { OriginButton } from './OriginButton';

const faqData = [
  {
    question: "What is the best way to start?",
    answer: "Book a short discovery call or send us your goals. We’ll recommend the right scope, timeline, and engagement model."
  },
  {
    question: "Do you work with early-stage startups?",
    answer: "Yes. We work with founders, early product teams, and established businesses that need a sharper digital presence."
  },
  {
    question: "Can you redesign an existing website or product?",
    answer: "Absolutely. We can improve strategy, UX, visual design, performance, and conversion without rebuilding everything unnecessarily."
  },
  {
    question: "How long does a website project take?",
    answer: "Most focused marketing websites take two to four weeks. Larger product and AI projects are scoped around the actual requirements."
  },
  {
    question: "Can you build with our existing developers?",
    answer: "Yes. We can collaborate with your team, deliver a polished design system, or handle design and development end to end."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes. Our Design Partnership is built for continuous design, landing-page, product, and growth work."
  },
  {
    question: "Will we own the final work?",
    answer: "Yes. Once the project is complete and paid for, your business owns the agreed final deliverables."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="w-full bg-[#f9f9f8] pt-12 md:pt-20">
      <section className="w-full bg-white rounded-t-[40px] md:rounded-t-[60px] px-5 py-16 md:py-24 shadow-[0_-8px_40px_rgba(0,0,0,0.02)] flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column */}
        <div className="w-full lg:w-5/12 flex flex-col items-start">
          <div className="bg-[#111] text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span> FAQS <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
          </div>
          <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-bold text-[#111] tracking-tight mb-12">
            Questions before we build?<br />We’ve got answers.
          </h2>
          
          <div className="group bg-white rounded-[36px] p-8 w-full max-w-[420px] relative transition-all duration-500 hover:-translate-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.03),0_8px_32px_rgba(0,0,0,0.04),inset_0_0_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04),0_16px_48px_rgba(0,0,0,0.06),inset_0_0_2px_rgba(0,0,0,0.04)] border border-white/80 ring-1 ring-black/[0.03]">
            {/* Edge Lighting & Reflections via pseudo-element */}
            <div className="absolute inset-0 rounded-[36px] pointer-events-none shadow-[inset_0_2px_3px_rgba(255,255,255,1),inset_1px_0_2px_rgba(255,255,255,0.7),inset_0_-1px_3px_rgba(0,0,0,0.02),inset_-1px_0_2px_rgba(0,0,0,0.01)]" />

            {/* Decorative dots - extremely subtle with faint highlight */}
            <div className="absolute top-5 left-5 w-1 h-1 rounded-full bg-black/[0.03] shadow-[0_1px_0_rgba(255,255,255,1)]" />
            <div className="absolute top-5 right-5 w-1 h-1 rounded-full bg-black/[0.03] shadow-[0_1px_0_rgba(255,255,255,1)]" />
            <div className="absolute bottom-5 left-5 w-1 h-1 rounded-full bg-black/[0.03] shadow-[0_1px_0_rgba(255,255,255,1)]" />
            <div className="absolute bottom-5 right-5 w-1 h-1 rounded-full bg-black/[0.03] shadow-[0_1px_0_rgba(255,255,255,1)]" />
            
            <div className="flex flex-col gap-4 mb-7 relative z-10">
              <div className="flex items-center gap-4">
                {/* Avatar with premium elevation */}
                <img src={rahulAvatar} alt="Llamacorp avatar" className="w-12 h-12 rounded-xl object-cover border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)]" />
              </div>
              <p className="text-[#333] font-medium text-base leading-snug tracking-tight">
                Still unsure? Tell us what you’re building and we’ll point you in the right direction 👇🏼
              </p>
            </div>
            
            <div className="flex flex-col gap-3 relative z-10">
              <OriginButton
                href="mailto:llamacorp8@gmail.com?subject=New%20Project%20Inquiry%20from%20Llamacorp&body=Hi%20Llamacorp%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project.%0A%0AName%3A%0ACompany%3A%0AProject%20details%3A%0ABudget%3A%0ATimeline%3A"
                className="w-full bg-white border-black/[0.06] text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.03)]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6V19.5C6 19.7761 5.77614 20 5.5 20H2.5C1.94772 20 1.5 19.5523 1.5 19V6H6Z" fill="#FB413B"/>
                  <path d="M22.5 6V19C22.5 19.5523 22.0523 20 21.5 20H18.5C18.2239 20 18 19.7761 18 19.5V6H22.5Z" fill="url(#paint0_linear_1_175)"/>
                  <path d="M18.8022 4.52777C19.7534 3.72816 21.1725 3.85101 21.9721 4.80219C22.7717 5.75337 22.6489 7.17248 21.6977 7.97211L12.6434 15.584C12.2714 15.8967 11.7284 15.8967 11.3564 15.584L2.30219 7.97211C1.35101 7.17248 1.22816 5.75337 2.02777 4.80219C2.8274 3.85101 4.24652 3.72816 5.1977 4.52777L11.9999 10.246L18.8022 4.52777Z" fill="url(#paint1_linear_1_175)"/>
                  <defs>
                    <linearGradient id="paint0_linear_1_175" x1="20.25" y1="6" x2="20.25" y2="20.1728" gradientUnits="userSpaceOnUse">
                      <stop offset="0.408497" stopColor="#3AC566"/>
                      <stop offset="1" stopColor="#338BFD"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_1_175" x1="22.4999" y1="10.0625" x2="1.5" y2="10.0625" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FAD917"/>
                      <stop offset="0.33" stopColor="#F74B47"/>
                      <stop offset="0.66" stopColor="#F74B47"/>
                      <stop offset="1" stopColor="#FF64A0"/>
                    </linearGradient>
                  </defs>
                </svg>
                Email Llamacorp
              </OriginButton>
              <OriginButton
                href="https://wa.me/919769285318?text=Hi%20Llamacorp%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Llamacorp on WhatsApp"
                className="w-full bg-white border-black/[0.06] text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.03)]"
              >
                <svg width="20" height="20" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="60" height="60" rx="13.28" fill="url(#faq_whatsapp_gradient)"/>
                  <path d="M25.0719 21.0675L26.2879 24.7153C26.5024 25.359 26.376 26.0674 25.9522 26.5972L25.0888 27.6765C24.8167 28.0166 24.7965 28.4956 25.0411 28.8559C27.5412 32.5386 29.2614 34.3751 32.5056 35.5374C32.8824 35.6724 33.3009 35.5504 33.5615 35.2465L35.0778 33.4774C35.6924 32.7604 36.7249 32.571 37.554 33.0232L40.4537 34.6049C41.1664 34.9936 41.5944 35.7819 41.4069 36.5718C40.5955 39.9893 38.3135 40.9391 35.6319 40.7476C28.6319 40.2476 19.132 30.2476 19.1319 24.7476C19.1319 23.2247 19.4218 21.9917 20.4431 20.8279C21.1318 20.043 22.1964 19.7476 23.2406 19.7476C24.0715 19.7476 24.8092 20.2793 25.0719 21.0675Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.13194 52.2477L18.7542 49.6591C22.9076 52.0936 27.7558 53.1436 32.5867 52.6134C38.2849 51.9879 43.5295 49.2112 47.2498 44.85C50.9701 40.4888 52.8855 34.872 52.6049 29.1465C52.3244 23.4209 49.869 18.0184 45.7402 14.0418C41.6114 10.0652 36.1204 7.81449 30.3884 7.74914C24.6563 7.6838 19.1155 9.80875 14.8971 13.6902C10.6787 17.5716 8.1008 22.9168 7.68978 28.6344C7.35367 33.3101 8.48734 37.9465 10.8913 41.9119L8.13194 52.2477ZM20.777 46.2082L19.3802 45.3895L13.7357 46.765L15.1957 41.2962L14.3118 39.8382C12.3352 36.5778 11.4031 32.7656 11.6795 28.9212C12.0174 24.2201 14.137 19.8251 17.6055 16.6337C21.074 13.4423 25.6298 11.6952 30.3428 11.7489C35.0558 11.8026 39.5706 13.6532 42.9654 16.9228C46.3602 20.1925 48.379 24.6346 48.6097 29.3423C48.8404 34.0499 47.2655 38.6681 44.2066 42.254C41.1477 45.8399 36.8355 48.123 32.1503 48.6372C28.1783 49.0732 24.192 48.2099 20.777 46.2082Z" fill="white"/>
                  <defs>
                    <linearGradient id="faq_whatsapp_gradient" x1="30" y1="0" x2="30" y2="60" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00FF68"/>
                      <stop offset="1" stopColor="#00D624"/>
                    </linearGradient>
                  </defs>
                </svg>
                Chat on WhatsApp
              </OriginButton>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-7/12 flex flex-col gap-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-white border border-black/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button 
                  id={`faq-button-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex justify-between items-center focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-[#111] font-medium text-[17px] pr-8">{faq.question}</span>
                  <div className={`flex-shrink-0 text-[#111] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <div 
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 md:px-8 md:pb-8 text-[#555] text-[15px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        </div>
      </section>
    </div>
  );
};

export default FAQ;
