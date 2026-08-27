import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Layout, Sparkles, BarChart3, Clock, Zap, Play, Loader2, Lightbulb, FileText, Globe, Target, Code, LineChart, Megaphone, User, Briefcase, Mail, PenTool, Search, Share2, Layers, Cpu, TrendingUp, Compass, Workflow, FastForward } from 'lucide-react';
import SEO from '../components/SEO';
import CTA from '../components/CTA';

export default function ServicesPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#111] font-sans selection:bg-[#111] selection:text-white">
      <SEO 
        title="Our Services | LlamaCorp" 
        description="We help ambitious teams turn complex ideas into clear, high-performing digital experiences." 
      />

      {/* Inject Google Font for handwritten text */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        .font-handwritten {
          font-family: 'Caveat', cursive;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full pt-[160px] pb-32 px-4 md:px-8 mx-auto flex flex-col items-center text-center overflow-hidden">
        
        {/* Entrance Animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Eyebrow */}
          <div className="text-[13px] font-bold tracking-[0.15em] uppercase text-[#555] mb-6">
            LlamaCorp Services
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.05em] text-[#111] mb-8 relative z-10">
            Strategy. Design. <br className="hidden sm:block" />
            <span className="relative inline-block mt-2 sm:mt-0">
              <span className="font-handwritten text-[clamp(4rem,10vw,7.5rem)] font-bold text-[#FF5A36] leading-[0.8] ml-2 transform -rotate-2 inline-block">
                Momentum.
              </span>
              {/* Swoosh SVG */}
              <svg 
                className="absolute -bottom-4 left-0 w-full h-auto text-[#FF5A36] opacity-80" 
                viewBox="0 0 200 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 15C50 2 150 -4 195 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          {/* Subtitle & Body */}
          <div className="max-w-2xl mx-auto flex flex-col gap-5 mb-10">
            <h2 className="text-xl md:text-2xl font-medium text-[#222] leading-snug">
              We help ambitious teams turn complex ideas into clear, high-performing digital experiences.
            </h2>
            <p className="text-[16px] md:text-lg text-[#555] leading-relaxed">
              From brand strategy and product design to development, automation, and growth, LlamaCorp brings the right expertise together to move your business forward.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto z-20">
            <a 
              href="#contact" 
              className="w-full sm:w-auto bg-[#111] text-white px-8 py-4 rounded-full font-semibold text-[15px] hover:bg-[#333] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2 group"
            >
              Start a Project
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#explore" 
              className="w-full sm:w-auto bg-white/50 backdrop-blur-sm border border-[#DDD] text-[#111] px-8 py-4 rounded-full font-semibold text-[15px] hover:bg-white hover:border-[#111] transition-all duration-300 flex items-center justify-center shadow-sm"
            >
              Explore Services
            </a>
          </div>
        </motion.div>

        {/* Showcase Card (Entering from bottom) */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1100px] mx-auto mt-20 relative z-10"
        >
          <div className="bg-[#F4F4F2] rounded-[32px] md:rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#EBEBEB] p-2 md:p-3 flex flex-col md:flex-row gap-3 overflow-hidden">
            
            {/* Left Visual Panel */}
            <div className="w-full md:w-[45%] bg-[#E5E5E5] rounded-[24px] md:rounded-[32px] relative overflow-hidden min-h-[400px] md:min-h-[500px] group">
              <img src="/assets/Service 1.jpg" alt="LlamaCorp Service Visual" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
              
              {/* Top Label */}
              <div className="absolute top-6 left-6 right-6 flex items-start gap-3">
                <div className="w-10 h-10 bg-[#FF5A36] text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                  <Play size={18} fill="currentColor" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm shadow-sm leading-tight">Project Alpha: <br/><span className="text-white/80 font-normal">New Era Design</span></div>
                  <div className="flex items-center gap-1 text-xs text-white/70 mt-1">
                    <Sparkles size={12} /> Strategy Active
                  </div>
                </div>
              </div>

              {/* Bottom Loading Badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-5 py-3 rounded-full shadow-lg flex items-center gap-3 w-max">
                <div className="w-6 h-6 bg-[#FF5A36]/10 rounded-full flex items-center justify-center text-[#FF5A36]">
                  <Loader2 size={14} className="animate-spin" />
                </div>
                <span className="text-sm font-semibold text-[#111]">Building your growth plan...</span>
              </div>
            </div>

            {/* Right Panel: Dashboard Interface */}
            <div className="w-full md:w-[55%] flex flex-col gap-3">
              
              {/* Upper Card: Image */}
              <img src="/assets/Card1.png" alt="Growth System Progress" className="w-full h-auto rounded-[24px] md:rounded-[32px] shadow-sm bg-white" />

              {/* Lower Card: Image */}
              <img src="/assets/Card2.png" alt="Personalized Next Steps" className="w-full h-auto rounded-[24px] md:rounded-[32px] shadow-sm bg-white" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Challenges Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-[1200px] mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="text-[13px] font-bold tracking-[0.15em] uppercase text-[#FF5A36] mb-4">
            The challenge
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.05em] text-[#111] mb-6">
            Growth shouldn’t feel this complicated
          </h2>
          <p className="text-lg text-[#555] max-w-2xl mx-auto leading-relaxed">
            Ambitious businesses lose momentum when strategy, creative, technology, and execution are disconnected.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#F4F4F2] border border-[#EBEBEB] rounded-[40px] p-2 hover:-translate-y-2 transition-transform duration-300 shadow-sm"
          >
            <div className="bg-white rounded-[32px] overflow-hidden flex flex-col h-full shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
              <img 
                src="/assets/service section card1.webp" 
                alt="Abstract visualization of disconnected project tools" 
                className="w-full h-[220px] object-contain pt-10 px-8" 
              />
              <div className="pt-8 px-8 pb-10 flex flex-col flex-1">
                <h3 className="text-[22px] md:text-[24px] font-bold text-[#111] mb-3 leading-tight">Too many moving parts</h3>
                <p className="text-[15px] md:text-[16px] text-[#555] leading-relaxed">
                  Jumping between apps, different rules, endless settings—learning shouldn't be this complicated
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#F4F4F2] border border-[#EBEBEB] rounded-[40px] p-2 hover:-translate-y-2 transition-transform duration-300 shadow-sm"
          >
            <div className="bg-white rounded-[32px] overflow-hidden flex flex-col h-full shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
              <img 
                src="/assets/Service section card 3.webp" 
                alt="Abstract visualization of a delayed timeline" 
                className="w-full h-[220px] object-contain pt-10 px-8" 
              />
              <div className="pt-8 px-8 pb-10 flex flex-col flex-1">
                <h3 className="text-[22px] md:text-[24px] font-bold text-[#111] mb-3 leading-tight">Missed Lessons</h3>
                <p className="text-[15px] md:text-[16px] text-[#555] leading-relaxed">
                  You keep postponing, pushing deadlines, and losing focus—learning shouldn't be a struggle
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#F4F4F2] border border-[#EBEBEB] rounded-[40px] p-2 hover:-translate-y-2 transition-transform duration-300 shadow-sm"
          >
            <div className="bg-white rounded-[32px] overflow-hidden flex flex-col h-full shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
              <img 
                src="/assets/service section card2.webp" 
                alt="Abstract visualization of scattered ideas" 
                className="w-full h-[220px] object-contain pt-10 px-8" 
              />
              <div className="pt-8 px-8 pb-10 flex flex-col flex-1">
                <h3 className="text-[22px] md:text-[24px] font-bold text-[#111] mb-3 leading-tight">Words overload</h3>
                <p className="text-[15px] md:text-[16px] text-[#555] leading-relaxed">
                  New words pop up daily without structure or repetition, making them hard to remember.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Solution Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative w-full max-w-[950px] mx-auto mt-24 md:mt-32"
        >
          <div className="bg-[#E4F0E6] border border-[#BBDDBE] rounded-[24px] p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-transform duration-300">
            {/* Icon */}
            <div className="w-16 h-16 shrink-0 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center">
              <Lightbulb size={28} className="text-[#F5A623]" strokeWidth={2.2} />
            </div>
            
            {/* Message */}
            <div className="text-[18px] md:text-[20px] text-[#333] leading-[1.6] text-center sm:text-left flex-1">
              Good news: with <strong className="font-bold text-[#111]">LlamaCorp</strong>, your strategy, design, technology, and growth work as <span className="underline decoration-[#999] underline-offset-4 decoration-1">one connected system</span>—so you can move with <span className="underline decoration-[#999] underline-offset-4 decoration-1">more clarity, less friction</span>, and <span className="underline decoration-[#999] underline-offset-4 decoration-1">measurable momentum</span>.
            </div>
          </div>

          {/* Sticky Note */}
          <div className="absolute -bottom-8 right-0 md:-right-8 z-10 hidden sm:block">
            <svg className="absolute -top-5 left-4 w-8 h-8 text-gray-400 -rotate-12 z-20 drop-shadow-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-5 py-4 rotate-[6deg] border border-gray-100 min-w-[160px] hover:rotate-[2deg] transition-all duration-300">
              <span className="font-handwritten text-[24px] font-bold text-[#111] leading-tight block text-center">
                Less chaos.<br/>More progress.
              </span>
            </div>
          </div>

          {/* Mobile Sticky Note (inline) */}
          <div className="sm:hidden mt-8 flex justify-center relative w-max mx-auto">
            <svg className="absolute -top-5 left-4 w-8 h-8 text-gray-400 -rotate-12 z-20 drop-shadow-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-6 py-4 rotate-[3deg] border border-gray-100">
              <span className="font-handwritten text-[24px] font-bold text-[#111] leading-tight block text-center">
                Less chaos.<br/>More progress.
              </span>
            </div>
          </div>
        </motion.div>

      </section>

      {/* LlamaCorp Solution Showcase Section */}
      <section className="py-24 md:py-32 px-3 sm:px-6 lg:px-8 mx-auto w-full">
        <div className="bg-[#1A1A1A] rounded-[40px] md:rounded-[48px] pt-20 pb-0 px-6 md:px-12 overflow-hidden flex flex-col items-center text-center relative border border-[#333]">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto z-10 relative">
            <div className="text-[13px] font-bold tracking-[0.15em] uppercase text-[#FF5A36] mb-6">
              The LlamaCorp difference
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.05em] text-white mb-6 leading-tight">
              One connected system <br className="hidden sm:block"/> for meaningful growth
            </h2>
            <p className="text-lg md:text-xl text-[#A0A0A0] leading-relaxed max-w-2xl mx-auto">
              LlamaCorp brings strategy, design, technology, and growth into one collaborative workflow—so every decision connects to progress, and every project moves with purpose.
            </p>
          </div>

          {/* Visualization Area */}
          <div className="w-full mt-16 md:mt-20 relative flex justify-center pb-10 md:pb-16 px-4">
            <img 
              src="/assets/Mockup1.png" 
              alt="LlamaCorp Growth Hub Ecosystem"
              className="w-full max-w-[1000px] xl:max-w-[1200px] h-auto object-contain pointer-events-none"
            />
          </div>

        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-[1200px] mx-auto w-full">
        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20 md:mb-32"
        >
          <div className="text-[13px] font-bold tracking-[0.15em] uppercase text-[#FF5A36] mb-6">How we help</div>
          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.05em] text-[#111] mb-6 leading-tight">
            Built around the work that moves you forward
          </h2>
          <p className="text-lg md:text-xl text-[#555] leading-relaxed mb-10 max-w-2xl mx-auto">
            LlamaCorp combines the thinking, design, technology, and growth expertise needed to turn ambitious ideas into effective digital experiences.
          </p>
          <button className="bg-[#111] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#FF5A36] hover:-translate-y-1 transition-all duration-300 shadow-md">
            Start a Project
          </button>
        </motion.div>

        {/* Service Rows Container */}
        <div className="flex flex-col gap-24 md:gap-32">
          
          {/* Row 1: Brand Strategy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-20"
          >
            {/* Copy */}
            <div className="flex-1 md:pr-4 lg:pr-10 order-1 group">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF5A36]/10 text-[#FF5A36] text-sm font-semibold mb-6">
                <Target size={16} /> Brand Strategy
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#111] mb-4 leading-tight">Find the story only your brand can tell</h3>
              <p className="text-lg text-[#555] mb-8 leading-relaxed">We turn scattered ideas into a focused brand direction that gives your business clarity and distinction.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Positioning that makes your value easy to understand</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Messaging systems built for consistency</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">A strategic foundation for confident decisions</span>
                </li>
              </ul>
            </div>
            {/* Visual */}
            <div className="flex-1 w-full order-2 flex items-center justify-center">
              <img 
                src="/assets/Brand statgy.png" 
                alt="Brand Strategy"
                className="w-full max-w-full h-auto object-contain rounded-[32px]"
              />
            </div>
          </motion.div>

          {/* Row 2: Digital Experience Design */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-20"
          >
            {/* Visual (Left on desktop) */}
            <div className="flex-1 w-full order-2 md:order-1 flex items-center justify-center">
              <img 
                src="/assets/Digital Experience.png" 
                alt="Digital Experience Design"
                className="w-full max-w-full h-auto object-contain rounded-[32px]"
              />
            </div>
            
            {/* Copy (Right on desktop) */}
            <div className="flex-1 md:pl-4 lg:pl-10 order-1 md:order-2 group">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-sm font-semibold mb-6">
                <Layout size={16} /> Digital Experience Design
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#111] mb-4 leading-tight">Design experiences people want to use</h3>
              <p className="text-lg text-[#555] mb-8 leading-relaxed">We create clear, memorable websites and digital products that balance brand expression with effortless usability.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Conversion-led user journeys</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Distinctive visual systems</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Responsive prototypes before development</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Row 3: Web Development */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-20"
          >
            {/* Copy */}
            <div className="flex-1 md:pr-4 lg:pr-10 order-1 group">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm font-semibold mb-6">
                <Code size={16} /> Web Development
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#111] mb-4 leading-tight">Turn the right idea into the real thing</h3>
              <p className="text-lg text-[#555] mb-8 leading-relaxed">LlamaCorp builds fast, scalable, and flexible websites that are made to perform long after launch.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">High-performance, responsive builds</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">CMS and platform integrations</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Clean, scalable foundations</span>
                </li>
              </ul>
            </div>
            {/* Visual */}
            <div className="flex-1 w-full order-2 flex items-center justify-center">
              <img 
                src="/assets/web development.png" 
                alt="Web Development"
                className="w-full max-w-full h-auto object-contain rounded-[32px]"
              />
            </div>
          </motion.div>

          {/* Row 4: AI & Automation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-20"
          >
            {/* Visual */}
            <div className="flex-1 w-full order-2 md:order-1 flex items-center justify-center">
              <img 
                src="/assets/AI automation.jpeg" 
                alt="AI & Automation"
                className="w-full max-w-full h-auto object-contain rounded-[32px]"
              />
            </div>
            
            {/* Copy */}
            <div className="flex-1 md:pl-4 lg:pl-10 order-1 md:order-2 group">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF5A36]/10 text-[#FF5A36] text-sm font-semibold mb-6">
                <Workflow size={16} /> AI & Automation
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#111] mb-4 leading-tight">Remove the work that slows growth down</h3>
              <p className="text-lg text-[#555] mb-8 leading-relaxed">We connect smart workflows and AI tools that give your team more time for the work that matters.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Streamlined internal workflows</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Connected tools and data</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Useful automation with human oversight</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Row 5: Growth & Conversion */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-20"
          >
            {/* Copy */}
            <div className="flex-1 md:pr-4 lg:pr-10 order-1 group">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-sm font-semibold mb-6">
                <TrendingUp size={16} /> Growth & Conversion
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#111] mb-4 leading-tight">Make every interaction work harder</h3>
              <p className="text-lg text-[#555] mb-8 leading-relaxed">We shape the journeys, campaigns, and experiments that turn interest into measurable business momentum.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Conversion strategy and optimization</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Campaign landing pages and content</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Clear measurement and learning loops</span>
                </li>
              </ul>
            </div>
            {/* Visual */}
            <div className="flex-1 w-full order-2 flex items-center justify-center">
              <img 
                src="/assets/conversion.png" 
                alt="Growth & Conversion"
                className="w-full max-w-full h-auto object-contain rounded-[32px]"
              />
            </div>
          </motion.div>

          {/* Row 6: Ongoing Partnership */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-20"
          >
            {/* Visual */}
            <div className="flex-1 w-full order-2 md:order-1 flex items-center justify-center">
              <img 
                src="/assets/Parternship.png" 
                alt="Ongoing Partnership"
                className="w-full max-w-full h-auto object-contain rounded-[32px]"
              />
            </div>
            
            {/* Copy */}
            <div className="flex-1 md:pl-4 lg:pl-10 order-1 md:order-2 group">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-6">
                <Compass size={16} /> Ongoing Partnership
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#111] mb-4 leading-tight">Keep improving after launch</h3>
              <p className="text-lg text-[#555] mb-8 leading-relaxed">LlamaCorp stays close to the work, helping you evolve your product, site, and growth system as your business grows.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Priority-based ongoing support</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">Continuous improvements and testing</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="text-[#333] font-medium text-[16px]">A flexible senior team when you need it</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Three Steps Section */}
      <section className="py-24 md:py-32 bg-[#F1F1F1] w-full">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <h2 className="text-[32px] md:text-[44px] font-bold tracking-tight text-[#111] mb-5 leading-[1.15]">
              Three Simple Steps <br className="hidden sm:block"/> to Digital Success
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#666] leading-relaxed max-w-[600px] mx-auto">
              Pick what you need, let our experts personalize your strategy, and launch effortlessly while enjoying long-term growth.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            
            {/* Card 1 Wrapper */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="p-2 md:p-[10px] rounded-[36px] bg-[#E4E4E4]/60 border border-[#DDDDDD] hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Card 1 Inner */}
              <div className="bg-white rounded-[28px] p-7 md:p-8 flex flex-col h-full shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                {/* Illustration */}
                <img 
                  src="/assets/Three simple step 1.png" 
                  alt="Plan and Strategy" 
                  className="w-full h-auto object-contain mb-8 max-h-[160px]"
                />

                {/* Text Content */}
                <div className="flex flex-col flex-1">
                  <div className="w-7 h-7 bg-[#111] text-white rounded-full flex items-center justify-center text-[13px] font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-[20px] md:text-[22px] font-bold text-[#111] mb-2 leading-tight tracking-[-0.01em]">
                    Plan & Strategy
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#555] leading-relaxed">
                    Understand your goals, define the roadmap, and create the perfect strategy before development begins.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 Wrapper */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-2 md:p-[10px] rounded-[36px] bg-[#E4E4E4]/60 border border-[#DDDDDD] hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Card 2 Inner */}
              <div className="bg-white rounded-[28px] p-7 md:p-8 flex flex-col h-full shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                {/* Illustration */}
                <img 
                  src="/assets/Three simple step 2.png" 
                  alt="Design and Develop" 
                  className="w-full h-auto object-contain mb-8 max-h-[160px]"
                />

                {/* Text Content */}
                <div className="flex flex-col flex-1">
                  <div className="w-7 h-7 bg-[#111] text-white rounded-full flex items-center justify-center text-[13px] font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-[20px] md:text-[22px] font-bold text-[#111] mb-2 leading-tight tracking-[-0.01em]">
                    Design & Develop
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#555] leading-relaxed">
                    Design and build fast, scalable websites and web applications using modern technologies.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 Wrapper */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-2 md:p-[10px] rounded-[36px] bg-[#E4E4E4]/60 border border-[#DDDDDD] hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Card 3 Inner */}
              <div className="bg-white rounded-[28px] p-7 md:p-8 flex flex-col h-full shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                {/* Illustration */}
                <img 
                  src="/assets/Three simple step 3.png" 
                  alt="Launch and Grow" 
                  className="w-full h-auto object-contain mb-8 max-h-[160px]"
                />

                {/* Text Content */}
                <div className="flex flex-col flex-1">
                  <div className="w-7 h-7 bg-[#111] text-white rounded-full flex items-center justify-center text-[13px] font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-[20px] md:text-[22px] font-bold text-[#111] mb-2 leading-tight tracking-[-0.01em]">
                    Launch & Grow
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#555] leading-relaxed">
                    Launch confidently and continuously improve your website through optimization, AI, SEO, and ongoing support.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Global CTA & Footer */}
      <CTA />
    </div>
  );
}
