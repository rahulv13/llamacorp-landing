import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { question: "Why choose LlamaCorp?", answer: "We blend premium design aesthetics with advanced AI capabilities, ensuring your digital presence is not only beautiful but intelligent, scalable, and built for the future." },
  { question: "How long does a project take?", answer: "Most standard projects take between 4 to 8 weeks depending on complexity. AI automation and large-scale platforms may require a longer, phased approach." },
  { question: "Do you use AI?", answer: "Yes, AI is integrated into both our internal workflows to increase speed and precision, and into the products we build to give you a competitive edge." },
  { question: "Can you redesign my existing website?", answer: "Absolutely. We can take your existing foundation and elevate it to meet modern premium standards while improving performance and SEO." },
  { question: "Do you provide SEO?", answer: "Yes. Every project we launch includes comprehensive technical SEO, semantic structure, and performance optimization as standard." },
];

export default function FAQSection({ id }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id={id} className="w-full max-w-4xl mx-auto py-32 px-6">
      <m.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111111]">Frequently Asked Questions</h2>
      </m.div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          
          return (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-black/20 bg-white/50' : 'border-black/5 bg-transparent hover:border-black/10'}`}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className={`font-semibold text-lg transition-colors duration-300 ${isOpen ? 'text-[#111111]' : 'text-[#666666]'}`}>
                  {faq.question}
                </span>
                <span className="text-[#111111] shrink-0 ml-4">
                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 text-[#666666] leading-relaxed">
                      {faq.answer}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          );
        })}
      </div>
    </section>
  );
}
