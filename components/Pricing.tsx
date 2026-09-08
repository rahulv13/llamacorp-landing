import { Check } from 'lucide-react';
import { SettingIcon } from './SettingIcon';
import { MvpIcon } from './MvpIcon';
import PricingFeaturedCard from './PricingFeaturedCard';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-5 bg-[#fafaf9]">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-2 bg-[#111] text-white text-[11px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            PLANS
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-tight text-[#111] mb-5">
            Choose the right way to build.
          </h2>
          <p className="text-lg text-[#555] max-w-[600px] leading-relaxed">
            Flexible engagement models for ambitious brands - from focused launches to ongoing product partnerships.
          </p>
        </div>

        {/* Pricing Container */}
        <div className="w-full bg-[#f3f3f2] border border-black/5 p-4 md:p-6 rounded-[32px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            
            {/* Featured Plan - Client Component */}
            <PricingFeaturedCard />

            {/* Plan Two */}
            <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 flex items-center justify-center">
                  <SettingIcon className="w-full h-full" />
                </div>
                <div className="bg-black/5 border border-black/10 text-black text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/40"></span>
                  Limited availability
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#111] mb-3">Design Partnership</h3>
              <p className="text-[#555] leading-relaxed mb-6 text-sm">
                For teams that need senior design and product support every month.
              </p>
              <div className="mb-8">
                <span className="text-2xl font-bold text-[#111]">Starting at ₹75,000</span>
                <span className="text-[#555] font-medium"> / month</span>
              </div>
              
              <ul className="flex flex-col gap-3.5 mb-8 flex-1">
                {[
                  "Dedicated design lead",
                  "Ongoing UI/UX and landing pages",
                  "Design systems and product support",
                  "Weekly async updates",
                  "Monthly strategy call",
                  "One active workstream at a time",
                  "Flexible monthly scope"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] text-[#333]">
                    <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div>
                <a href="mailto:llamacorp8@gmail.com?subject=New%20Project%20Inquiry%20from%20Llamacorp&body=Hi%20Llamacorp%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project.%0A%0AName%3A%0ACompany%3A%0AProject%20details%3A%0ABudget%3A%0ATimeline%3A" className="block text-center w-full bg-[#111] text-white py-3.5 px-6 rounded-full font-medium transition-colors hover:bg-black/80">
                  Start a project
                </a>
                <p className="text-[13px] text-center text-[#777] mt-3 hover:text-black cursor-pointer transition-colors">
                  Need a custom scope? Let's talk &rarr;
                </p>
              </div>
            </div>

            {/* Plan Three */}
            <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 flex items-center justify-center mb-6">
                <MvpIcon className="w-full h-full" />
              </div>
              <h3 className="text-2xl font-bold text-[#111] mb-3">MVP Launch Kit</h3>
              <p className="text-[#555] leading-relaxed mb-6 text-sm">
                For founders who need a clear, polished product ready to test and launch.
              </p>
              <div className="mb-8">
                <span className="text-2xl font-bold text-[#111]">Starting at ₹1,49,000</span>
              </div>
              
              <ul className="flex flex-col gap-3.5 mb-8 flex-1">
                {[
                  "MVP product strategy",
                  "Core product UX and UI",
                  "Up to 12 key screens",
                  "Clickable prototype",
                  "Developer handoff",
                  "Launch-page design",
                  "Two rounds of refinement"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] text-[#333]">
                    <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div>
                <a href="mailto:llamacorp8@gmail.com?subject=New%20Project%20Inquiry%20from%20Llamacorp&body=Hi%20Llamacorp%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project.%0A%0AName%3A%0ACompany%3A%0AProject%20details%3A%0ABudget%3A%0ATimeline%3A" className="block text-center w-full bg-[#111] text-white py-3.5 px-6 rounded-full font-medium transition-colors hover:bg-black/80">
                  Start a project
                </a>
                <p className="text-[13px] text-center text-[#777] mt-3 hover:text-black cursor-pointer transition-colors">
                  Need a custom scope? Let's talk &rarr;
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
