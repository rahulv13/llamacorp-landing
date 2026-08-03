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

  // Base styling depending on if it's the popular plan
  const cardClassName = isMostPopular
    ? "bg-zinc-900 border border-zinc-700 rounded-[2rem] p-8 flex flex-col relative overflow-hidden"
    : "bg-zinc-900/30 border border-zinc-800 rounded-[2rem] p-8 flex flex-col";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cardClassName}
    >
      {isMostPopular && (
        <>
          <div className="absolute top-0 right-8 bg-white text-black text-xs font-bold px-3 py-1 rounded-b-lg tracking-wider uppercase">
            Most Popular
          </div>
          {/* Glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-white/5 blur-[80px] rounded-full pointer-events-none" />
        </>
      )}

      <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
      <p className="text-zinc-500 text-sm mb-6">{plan.description}</p>

      <div className="mb-8">
        <span className="text-5xl font-serif tracking-tight">
          {isCustom ? 'Custom' : `$${isAnnual ? plan.annualPrice : plan.monthlyPrice}`}
        </span>
        {!isCustom && <span className="text-zinc-500">{isAnnual ? '/yr' : '/mo'}</span>}
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
            <Check className={`w-5 h-5 shrink-0 ${isMostPopular || !isCustom ? 'text-emerald-500' : 'text-zinc-600'}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-full transition-colors font-medium ${
        isMostPopular
          ? 'bg-white text-black hover:bg-zinc-200'
          : 'border border-zinc-700 hover:bg-zinc-800'
      }`}>
        {plan.ctaText || (isCustom ? 'Contact Sales' : 'Get Started')}
      </button>
    </motion.div>
  );
}
