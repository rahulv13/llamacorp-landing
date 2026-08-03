import { Navbar } from "./components/Navbar";
import { ArrowRight, ArrowUpRight, Check, Linkedin, Instagram, Twitter, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import logoImg from './assets/Logo.png';
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs`);
        // Map backend schema to what the frontend expects
        const mapped = res.data.map((b: any) => ({
            id: b.slug,
            title: b.title,
            category: b.category || 'Uncategorized',
            date: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            excerpt: b.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...',
            readTime: '5 min read',
            imagePlaceholder: 'bg-gradient-to-br from-zinc-800 to-black',
            coverImage: b.coverImage,
            author: b.author,
        }));
        setBlogs(mapped);
      } catch (err) {
        console.error('Failed to load blogs', err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['All', 'AI & Technology', 'Marketing', 'SEO', 'Business Growth', 'Design', 'Uncategorized'];

  const filteredPosts = activeCategory === 'All'
    ? blogs
    : blogs.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Header */}
      <main className="px-6 lg:px-12 pt-20 pb-16">
        <div className="max-w-4xl">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 mb-8">
            <span className="text-xs font-medium tracking-widest uppercase text-zinc-400">Journal</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight mb-8">
            Insights, Ideas & <br />
            <span className="italic text-zinc-500">Innovation</span>
          </h1>
          <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
            Thoughts, frameworks, and deep dives on the intersection of AI, design, and business growth.
          </p>
        </div>
      </main>

      {/* Category Filters */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm tracking-wide transition-all ${
                activeCategory === category
                  ? 'bg-white text-black font-medium'
                  : 'bg-transparent border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured / Highlighted Post (Only show on 'All') */}
      {activeCategory === 'All' && blogs.length > 0 && (
        <section className="px-6 lg:px-12 pb-20">
          <Link to={`/blog/${blogs[0].id}`} className="group block relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#050505]">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12 order-2 md:order-1">
                <div className="flex items-center gap-3 text-sm text-zinc-500 mb-6">
                  <span className="uppercase tracking-widest font-medium text-white">{blogs[0].category}</span>
                  <span>•</span>
                  <span>{blogs[0].readTime}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 group-hover:text-zinc-300 transition-colors leading-tight">
                  {blogs[0].title}
                </h2>
                <p className="text-zinc-400 font-light text-lg mb-8 leading-relaxed">
                  {blogs[0].excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white group-hover:text-zinc-300 transition-colors">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className={`aspect-square md:aspect-auto md:h-full w-full order-1 md:order-2 relative overflow-hidden ${blogs[0].coverImage ? '' : 'bg-zinc-900'}`}>
                {blogs[0].coverImage ? (
                  <img src={blogs[0].coverImage} alt={blogs[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                ) : (
                  <>
                    {/* Abstract pattern placeholder */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)] group-hover:scale-110 transition-transform duration-1000"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border border-zinc-700/50 backdrop-blur-xl flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/5"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Blog Grid */}
      <section className="px-6 lg:px-12 py-12 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeCategory === 'All' ? blogs.slice(1) : filteredPosts).map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="group block h-full border border-zinc-800/50 rounded-[2rem] p-6 hover:bg-zinc-900/50 transition-colors bg-[#0a0a0a]">
                <div className={`w-full aspect-video rounded-xl mb-6 overflow-hidden relative ${post.coverImage ? '' : post.imagePlaceholder}`}>
                   {post.coverImage ? (
                     <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   ) : (
                     <>
                       <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-50 group-hover:opacity-30 transition-opacity"></div>
                       {/* Minimal abstract shapes for placeholder */}
                       <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-zinc-700"></div>
                       <div className="absolute bottom-4 left-4 w-12 h-2 bg-zinc-700 rounded-full"></div>
                     </>
                   )}
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4 uppercase tracking-widest font-medium">
                  <span className="text-zinc-300">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-zinc-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-zinc-500 font-light text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 lg:px-12 py-32 border-t border-zinc-900 bg-black">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">What industry leaders say</h2>
          <p className="text-zinc-400 font-light">Join the visionary teams transforming their digital presence.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { quote: "Llamacorp completely re-architected our digital strategy. Their insights on generative UI were eye-opening.", author: "Mark P.", role: "CMO, Nexus", initials: "MP" },
            { quote: "The velocity at which they deliver enterprise-grade solutions is unmatched. Reading their blog is a must.", author: "Sarah T.", role: "VP Engineering, Aura", initials: "ST" },
            { quote: "Their technical SEO knowledge helped us secure top spots for highly competitive keywords in our industry.", author: "James L.", role: "Founder, Lumina", initials: "JL" }
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-[2rem] border border-zinc-800 bg-[#050505] flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(star => <div key={star} className="w-1.5 h-1.5 bg-white rounded-full"></div>)}
              </div>
              <p className="text-zinc-300 font-light leading-relaxed mb-8 flex-1 text-lg">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-medium text-zinc-400">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-zinc-500 font-light">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 lg:px-12 py-32 border-t border-zinc-900 relative overflow-hidden bg-black flex flex-col items-center text-center">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight mb-6">
            Stay ahead of the curve
          </h2>
          <p className="text-zinc-400 font-light text-lg mb-10 leading-relaxed">
            Get the latest insights on AI, design, and growth delivered straight to your inbox. No spam, just signal.
          </p>
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
            />
            <button className="bg-white text-black font-medium px-8 py-4 rounded-full hover:bg-zinc-200 transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer Section */}
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
