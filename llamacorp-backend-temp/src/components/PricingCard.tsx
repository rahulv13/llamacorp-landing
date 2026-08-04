import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: string | number;
  annualPrice: string | number;
  features: string[];
  isMostPopular?: boolean;
  ctaText?: string;
  isCustom?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
  delay?: number;
}

export function PricingCard({ plan, isAnnual, delay = 0 }: PricingCardProps) {
  const isMostPopular = plan.isMostPopular;
  const isCustom = plan.isCustom || plan.monthlyPrice === 'Custom';

  // Outer Wrapper styling - Thick rounded acrylic frame with soft gradient and shadows
  const wrapperClass = `relative overflow-hidden rounded-[2.5rem] p-2.5 transition-all duration-300 ${
    isMostPopular
      ? "bg-gradient-to-b from-zinc-200 to-zinc-300/60 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(0,0,0,0.05)]"
      : "bg-gradient-to-b from-zinc-100 to-zinc-200/50 shadow-[0_4px_24px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(0,0,0,0.02)]"
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={wrapperClass}
    >
      {/* Inner Card - Pure white surface with edge lighting and layered shadows */}
      <div className="relative bg-white rounded-[2rem] p-8 flex flex-col h-full border border-white/60 shadow-[0_4px_8px_-7px_rgba(31,28,28,0.12),0_16px_32px_-7px_rgba(31,28,28,0.04),inset_0_0_3px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_1px_2px_rgba(255,255,255,1),inset_1px_0_1px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.05),inset_-1px_0_1px_rgba(0,0,0,0.02)] z-10">
        
        {isMostPopular && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-900 text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)]">
            Most Popular
          </div>
        )}

        <h3 className="text-xl font-medium text-zinc-900 mb-2 relative z-10">{plan.name}</h3>
        <p className="text-zinc-500 text-sm mb-6 relative z-10">{plan.description}</p>

        <div className="mb-8 relative z-10 text-zinc-900">
          <span className="text-5xl font-serif tracking-tight">
            {isCustom ? 'Custom' : `$${isAnnual ? plan.annualPrice : plan.monthlyPrice}`}
          </span>
          {!isCustom && <span className="text-zinc-500 ml-1">{isAnnual ? '/yr' : '/mo'}</span>}
        </div>

        <ul className="space-y-4 mb-8 flex-1 relative z-10">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-600 text-sm">
              <Check className="w-5 h-5 shrink-0 text-zinc-900" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button - Soft elevation, rounded corners, subtle glossy highlight */}
        <button className={`relative z-10 w-full py-4 rounded-full transition-all duration-300 font-medium overflow-hidden group ${
          isMostPopular
            ? 'bg-zinc-900 text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] hover:-translate-y-0.5'
            : 'bg-white text-zinc-900 border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5'
        }`}>
          {/* Glossy highlight pseudo-element for hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10">{plan.ctaText || (isCustom ? 'Contact Sales' : 'Get Started')}</span>
        </button>
      </div>
    </motion.div>
  );
}
