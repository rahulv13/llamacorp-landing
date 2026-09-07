import PricingAnimated from './PricingAnimated.client';

const Pricing = () => {
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
        <PricingAnimated />
      </div>
    </section>
  );
};

export default Pricing;
