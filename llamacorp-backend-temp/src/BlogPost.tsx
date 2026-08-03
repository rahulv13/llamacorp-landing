import { Navbar } from "./components/Navbar";
import { Link, useParams } from 'react-router-dom';
import logoImg from './assets/Logo.png';
import { ArrowLeft, ArrowRight, Linkedin, Twitter, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs/${id}`);
            const b = res.data;
            setPost({
                id: b.slug,
                title: b.title,
                category: b.category || 'Uncategorized',
                date: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                content: b.content,
                readTime: '5 min read',
                imagePlaceholder: 'bg-gradient-to-br from-zinc-800 to-black',
                coverImage: b.coverImage,
                author: {
                    name: b.author?.name || 'llamacorp',
                    role: b.author?.role || 'Editorial Team',
                    avatar: b.author?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                }
            });

            // Fetch all to get related
            const allRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs`);
            const mappedRelated = allRes.data
              .filter((p: any) => p.slug !== id)
              .map((rp: any) => ({
                id: rp.slug,
                title: rp.title,
                category: rp.category || 'Uncategorized',
                date: new Date(rp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                excerpt: rp.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...',
                imagePlaceholder: 'bg-gradient-to-br from-zinc-800 to-black',
                coverImage: rp.coverImage,
                author: rp.author,
              }))
              .slice(0, 3);

            setRelatedPosts(mappedRelated);

        } catch (err) {
            console.error('Failed to load blog post', err);
            setPost(null);
            setRelatedPosts([]);
        } finally {
            setLoading(false);
        }
    };
    fetchPost();
  }, [id]);

  // Scroll to top when changing posts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
     return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans">
        <h1 className="text-4xl font-serif mb-4">Post not found</h1>
        <Link to="/blog" className="text-zinc-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <Navbar className="flex items-center justify-between px-6 py-8 lg:px-12 border-b border-zinc-900" />

      {/* Hero Section */}
      <section className="px-6 lg:px-12 pt-24 pb-16 max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to all posts
        </Link>

        <div className="flex items-center gap-3 text-sm text-zinc-500 mb-8">
          <span className="uppercase tracking-widest font-medium text-white bg-zinc-900 px-3 py-1 rounded-full">{post.category}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 border-t border-b border-zinc-900 py-6 mb-12">
          {post.author?.avatar ? (
            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover bg-zinc-800" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-medium text-zinc-400">
              {post.author?.name ? post.author.name.substring(0, 2).toUpperCase() : 'LL'}
            </div>
          )}
          <div>
            <div className="font-medium">{post.author?.name}</div>
            <div className="text-sm text-zinc-500">{post.author?.role}</div>
          </div>
        </div>

        {/* Hero Image / Placeholder */}
        <div className={`w-full aspect-[21/9] rounded-[2rem] overflow-hidden relative mb-16 ${post.coverImage ? '' : post.imagePlaceholder}`}>
           {post.coverImage ? (
             <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
           ) : (
             <>
               <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-900 to-zinc-800 opacity-80"></div>
               <div className="absolute inset-10 border border-zinc-800/50 rounded-3xl flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-zinc-700/30 bg-zinc-800/20 blur-xl"></div>
               </div>
             </>
           )}
        </div>

        {/* Article Content */}
        <article
          className="prose prose-invert prose-lg max-w-none prose-p:text-zinc-400 prose-p:font-light prose-p:leading-relaxed prose-headings:font-serif prose-headings:font-normal prose-a:text-white hover:prose-a:text-zinc-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex items-center gap-4">
          <span className="text-sm text-zinc-500">Share this article:</span>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
              <Twitter className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
              <Linkedin className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="px-6 lg:px-12 py-24 border-t border-zinc-900 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-serif">You might also like</h2>
            <Link to="/blog" className="hidden md:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
              View all posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <motion.div
                key={relatedPost.id}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Link to={`/blog/${relatedPost.id}`} className="group block h-full border border-zinc-800/50 rounded-[2rem] p-6 hover:bg-zinc-900/50 transition-colors bg-[#0a0a0a]">
                  <div className={`w-full aspect-video rounded-xl mb-6 overflow-hidden relative ${relatedPost.coverImage ? '' : relatedPost.imagePlaceholder}`}>
                     {relatedPost.coverImage ? (
                       <img src={relatedPost.coverImage} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     ) : (
                       <>
                         <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-50 group-hover:opacity-30 transition-opacity"></div>
                         <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-zinc-700"></div>
                         <div className="absolute bottom-4 left-4 w-12 h-2 bg-zinc-700 rounded-full"></div>
                       </>
                     )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4 uppercase tracking-widest font-medium">
                    <span className="text-zinc-300">{relatedPost.category}</span>
                    <span>•</span>
                    <span>{relatedPost.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif mb-3 group-hover:text-zinc-300 transition-colors leading-snug">
                    {relatedPost.title}
                  </h3>
                  <p className="text-zinc-500 font-light text-sm leading-relaxed mb-6 flex-1">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
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
