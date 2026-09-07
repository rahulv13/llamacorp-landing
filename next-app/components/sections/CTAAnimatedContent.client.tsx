"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const rahulAvatar = "/Rahul.png";

export default function CTAAnimatedContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center gap-6"
    >
      <div className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase">
        Now is a good time to start
      </div>
      
      <h2 className="text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] font-bold text-white tracking-tight">
        Let’s build something<br />worth remembering.
      </h2>
      
      <p className="text-lg md:text-xl text-white/70 max-w-[600px] leading-relaxed mb-6 font-normal">
        From high-converting websites to AI-powered product experiences, Llamacorp helps ambitious brands move from idea to impact.
      </p>
      
      <a href="mailto:llamacorp8@gmail.com?subject=New%20Project%20Inquiry%20from%20Llamacorp&body=Hi%20Llamacorp%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project.%0A%0AName%3A%0ACompany%3A%0AProject%20details%3A%0ABudget%3A%0ATimeline%3A" className="group flex items-center justify-center gap-3 bg-white text-[#111] py-4 px-8 rounded-full text-[15px] font-semibold transition-all hover:bg-neutral-100 hover:scale-[1.02] shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer no-underline">
        <Image src={rahulAvatar} alt="Llamacorp avatar" width={24} height={24} className="rounded-full object-cover" />
        Start a project
      </a>
      
      <a href="mailto:llamacorp8@gmail.com" className="text-white/60 hover:text-white transition-colors text-[15px] font-medium mt-3">
        Or email us at llamacorp8@gmail.com →
      </a>

      <div className="flex items-center gap-2 mt-8 text-white/50 text-sm font-medium">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        Taking on select projects
      </div>
    </motion.div>
  );
}
