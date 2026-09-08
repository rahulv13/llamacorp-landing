import Link from 'next/link';
import { DarkGradientBg } from "./DarkGradientBg";
import AnimatedCTAContent from "./AnimatedCTAContent";

export default function CTA() {
  return (
    <div className="w-full bg-white relative z-10 pt-6 md:pt-10 lg:pt-12">
      <DarkGradientBg className="rounded-t-[32px] md:rounded-t-[100px] lg:rounded-t-[120px] w-full flex flex-col justify-between items-center relative z-20 min-h-[850px] md:min-h-[950px] overflow-hidden">
        
        {/* Radial dark gradient overlay to ensure text readability */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-90"
          style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)' }}
        />

        {/* Main CTA Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-5 max-w-[700px] mx-auto pt-32 pb-20 relative z-30">
          <AnimatedCTAContent />
        </div>
      </DarkGradientBg>
    </div>
  );
}
