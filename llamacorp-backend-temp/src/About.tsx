import { Navbar } from "./components/Navbar";
import { ArrowRight, ArrowUpRight, Check, Linkedin, Instagram, Twitter, Target, Heart, Eye, Users, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import _ReactPlayer from 'react-player';
const ReactPlayer = (_ReactPlayer as any).default || _ReactPlayer;
import axios from 'axios';
import logoImg from './assets/Logo.png';
import founderImg from './assets/founder-portrait.png';
import { BlurIn, SplitText } from './components/ui/Animations';

const TeamMember = ({ name, role, image, delay = 0 }: { name: string, role: string, image: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#0a0a0a]"
  >
    <div className="aspect-[3/4] overflow-hidden">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className="w-full h-full bg-zinc-900 group-hover:scale-105 transition-transform duration-700"></div>
      )}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
      <h3 className="text-xl font-medium mb-1">{name}</h3>
      <p className="text-zinc-400 text-sm font-light">{role}</p>
    </div>
  </motion.div>
);

export default function About() {
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/about`);
        if (res.data && res.data.sections) {
          setPageContent(res.data.sections);
        }
      } catch (err) {
        console.error("Failed to load dynamic content", err);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <Navbar className="flex items-center justify-between px-6 py-8 lg:px-12 fixed w-full z-50 bg-black/50 backdrop-blur-md" />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-[#070612]">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* @ts-ignore */}
          <ReactPlayer
            url="https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8"
            playing={true}
            loop={true}
            muted={true}
            playsinline={true}
            width="100%"
            height="100%"
            style={{ objectFit: 'cover' }}
            config={
              {
                file: {
                  forceHLS: true,
                  attributes: {
                    style: { objectFit: 'cover', width: '100%', height: '100%' }
                  }
                }
              } as Record<string, any>
            }
          />
        </div>

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#070612] to-transparent z-10"></div>

        {/* Content */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center">
          <div className="max-w-3xl flex flex-col items-start gap-12">

            <div className="flex flex-col gap-6">
              {/* Badge */}
              <BlurIn duration={0.6} delay={0}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm bg-white/5">
                  <Sparkles className="w-3 h-3 text-white/80" />
                  <span className="text-sm font-medium text-white/80">New AI Automation Ally</span>
                </div>
              </BlurIn>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight lg:leading-[1.2] text-white">
                <span className="block">
                  <SplitText text="Unlock the Power of AI" delay={0.1} />
                </span>
                <span className="inline">
                  <SplitText text="for Your" delay={0.1 + (5 * 0.08)} />{' '}
                </span>
                <span className="font-serif italic inline">
                  <SplitText text="Business." delay={0.1 + (7 * 0.08)} />
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <BlurIn duration={0.6} delay={0.4}>
              <p className="text-white/80 text-lg font-normal leading-relaxed max-w-xl">
                Our cutting-edge AI platform automates, analyzes, and accelerates your workflows so you can focus on what really matters.
              </p>
            </BlurIn>

            {/* CTA Buttons */}
            <BlurIn duration={0.6} delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/book-call"
                  className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
                >
                  Book A Free Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  className="bg-white/20 text-white px-8 py-3 rounded-full font-medium backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  Learn now
                </button>
              </div>
            </BlurIn>

          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-6 lg:px-12 py-32 border-t border-zinc-900 relative">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-12 rounded-[2rem] bg-gradient-to-br from-zinc-900/50 to-transparent border border-zinc-800/50"
          >
            <Eye className="w-12 h-12 text-zinc-500 mb-8" />
            <h2 className="text-3xl font-serif mb-6">Our Vision</h2>
            <p className="text-zinc-400 leading-relaxed font-light text-lg">
              To create a digital ecosystem where artificial intelligence seamlessly augments human creativity, resulting in web experiences that are not just faster, but fundamentally more intuitive and personalized for every user.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-12 rounded-[2rem] bg-gradient-to-bl from-zinc-900/50 to-transparent border border-zinc-800/50"
          >
            <Target className="w-12 h-12 text-zinc-500 mb-8" />
            <h2 className="text-3xl font-serif mb-6">Our Mission</h2>
            <p className="text-zinc-400 leading-relaxed font-light text-lg">
              To democratize enterprise-grade AI architecture, empowering brands of all sizes to deploy intelligent, high-performance digital platforms from prompt to production in days, not months.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 lg:px-12 py-32 bg-[#0a0a0a] border-t border-zinc-900">
        <div className="max-w-4xl mb-20">
          <h2 className="font-serif text-5xl md:text-6xl tracking-tight mb-6">Core Values</h2>
          <p className="text-zinc-400 text-lg font-light">The principles that guide our code, our design, and our culture.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Innovation First", desc: "We constantly push the boundaries of what's possible with AI and web technologies." },
            { title: "Human-Centric", desc: "Technology should serve human needs. We build for people, powered by AI." },
            { title: "Radical Transparency", desc: "Open communication with our clients and within our teams is non-negotiable." },
            { title: "Excellence", desc: "We don't settle for 'good enough'. Every pixel and every line of code matters." }
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-zinc-800 rounded-[2rem] hover:bg-zinc-900 transition-colors"
            >
              <div className="text-2xl font-serif mb-4 text-zinc-300">0{i + 1}</div>
              <h3 className="text-xl font-medium mb-4">{value.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Team / Co-Founders */}
      <section className="px-6 lg:px-12 py-32 border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-5xl md:text-6xl tracking-tight mb-6">The Minds Behind Llamacorp</h2>
          <p className="text-zinc-400 text-lg font-light">
            Founded by industry veterans who saw the gap between AI research and practical web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pageContent?.team && pageContent.team.length > 0 ? (
            pageContent.team.map((member: any, i: number) => (
              <TeamMember key={i} name={member.name} role={member.role} image={member.image} delay={0.1 * (i + 1)} />
            ))
          ) : (
            <>
              <TeamMember name="Sarah Jenkins" role="CEO & Co-Founder" image="" delay={0.1} />
              <TeamMember name="David Chen" role="CTO & Co-Founder" image="" delay={0.2} />
              <TeamMember name="Elena Rodriguez" role="Head of AI Design" image="" delay={0.3} />
            </>
          )}
        </div>
      </section>

      {/* Let's Build / CTA Section */}
      <section className="relative px-6 lg:px-12 py-32 border-t border-zinc-900 overflow-hidden bg-black flex flex-col items-center text-center">
        {/* Abstract Dark Gradient / Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
          <div className="w-[800px] h-[400px] bg-zinc-800/10 blur-[100px] rounded-[100%]" />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-zinc-800 bg-black/50 backdrop-blur-sm mb-8">
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-zinc-500">Let's Build</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] tracking-tight mb-8">
            From Vision to Execution<br />
            <span className="italic text-zinc-400">in Days</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed mb-12">
            AI-powered workflows that compress timelines, amplify creative output, and accelerate your path from idea to market-ready product.
          </p>

          <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95">
            Start a Project
          </button>
        </motion.div>
      </section>

      {/* Footer Section (Reused from App.tsx) */}
      <footer className="border-t border-zinc-900">
        <div className="px-6 lg:px-12 py-16 bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={logoImg} alt="llamacorp logo" className="w-8 h-8 object-contain" />
                <span className="font-bold tracking-widest uppercase text-sm">llamacorp</span>
              </div>
              <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xs">
                Our AI-driven solutions make web development faster, smarter, and more scalable.
                Contact us to build the future.
              </p>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-white font-medium mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">About Us</Link></li>
                <li><a href="#" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Customers</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Newsroom</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Events</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6">Services</h4>
              <ul className="space-y-4">
                <li><Link to="/services" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">AI Web Design & Development</Link></li>
                <li><Link to="/services" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Social Media Management</Link></li>
                <li><Link to="/services" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">SEO</Link></li>
                <li><Link to="/services" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light">Brand & Creative</Link></li>
              </ul>
            </div>

            {/* Contact & Socials */}
            <div>
              <h4 className="text-white font-medium mb-6">Get In Touch</h4>
              <a href="mailto:hello@llamacorp.com" className="text-zinc-500 hover:text-white hover:underline underline-offset-4 transition-all text-sm font-light block mb-6">
                hello@llamacorp.com
              </a>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/llamacorp1/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-xs font-light">
              &copy; 2026 llamacorp. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-600 hover:text-zinc-300 hover:underline underline-offset-4 transition-all text-xs font-light">Terms & Conditions</a>
              <a href="#" className="text-zinc-600 hover:text-zinc-300 hover:underline underline-offset-4 transition-all text-xs font-light">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
