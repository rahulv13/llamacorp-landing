"use client";

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col gap-4">
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
  );
}
