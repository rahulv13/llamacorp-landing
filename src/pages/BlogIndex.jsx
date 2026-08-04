import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowRight, Clock, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MagneticTopNavbar from '../components/MagneticTopNavbar';
import CTA from '../components/CTA';

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [blogsRes, catsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/blogs`),
          axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/categories`)
        ]);
        setBlogs(blogsRes.data.data);
        const dynamicCats = catsRes.data.data.map(c => c.name);
        setCategories(['All', ...dynamicCats]);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const blogCat = blog.category?.name || blog.category || 'Uncategorized';
    const matchesCategory = activeCategory === 'All' || blogCat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredBlogs.find(b => b.featured) || filteredBlogs[0];
  const latestPosts = filteredBlogs.filter(b => b._id !== featuredPost?._id).slice(0, 6);
  const popularPosts = [...blogs].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);

  return (
    <>
      <Helmet>
        <title>Blog - Llamacorp | Insights, Ideas & Digital Stories</title>
        <meta name="description" content="Stay updated with our latest articles on web design, development, branding, UI/UX, AI, business growth, and digital experiences." />
      </Helmet>

      <MagneticTopNavbar />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
        
        {/* Hero Section */}
        <section className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-black/5 text-[#111] text-sm font-medium mb-6">
              Our Journal
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111] mb-6">
              Insights, Ideas & Digital Stories
            </h1>
            <p className="text-lg md:text-xl text-[#555] leading-relaxed mb-10">
              Stay updated with our latest articles on web design, development, branding, UI/UX, AI, business growth, and digital experiences.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-black/[0.03] border border-black/[0.05] focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all text-[15px]"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all ${
                    activeCategory === category 
                      ? 'bg-[#111] text-white shadow-lg' 
                      : 'bg-white text-[#555] border border-black/5 hover:bg-black/5 hover:text-[#111]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {isLoading ? (
          <div className="py-20 text-center text-[#777]">Loading articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-20 text-center text-[#777]">No articles found matching your criteria.</div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredPost && (
              <section className="mb-24">
                <Link to={`/blog/${featuredPost.slug}`} className="block group">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative rounded-[32px] overflow-hidden bg-white border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:-translate-y-1 flex flex-col md:flex-row"
                  >
                    <div className="md:w-3/5 relative h-[300px] md:h-[500px] overflow-hidden">
                      <img 
                        src={featuredPost.coverImage && featuredPost.coverImage !== 'no-photo.jpg' ? featuredPost.coverImage : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80'} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#111]">
                        {featuredPost.category?.name || featuredPost.category || 'Uncategorized'}
                      </div>
                    </div>
                    
                    <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white relative z-10">
                      <div className="flex items-center gap-4 text-sm text-[#777] mb-4">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {featuredPost.readingTime || '5 min read'}</span>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-[#111] leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-[#555] text-lg mb-8 line-clamp-3">
                        {featuredPost.excerpt || featuredPost.content?.substring(0, 150).replace(/<[^>]+>/g, '') + '...'}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <img src={featuredPost.author?.avatar || 'https://ui-avatars.com/api/?name=' + (featuredPost.author?.name || 'Author')} alt={featuredPost.author?.name || 'Author'} className="w-10 h-10 rounded-full object-cover" />
                          <span className="font-medium text-[#111] text-sm">{featuredPost.author?.name || 'Author'}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#111] group-hover:text-white transition-colors">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </section>
            )}

            <div className="flex flex-col lg:flex-row gap-12 mb-24">
              {/* Main Content Area */}
              <div className="lg:w-2/3">
                <h3 className="text-2xl font-bold text-[#111] mb-8 pb-4 border-b border-black/5">Latest Articles</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {latestPosts.map((post, index) => (
                    <motion.div 
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link to={`/blog/${post.slug}`} className="group block h-full bg-white rounded-[24px] border border-black/5 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img src={post.coverImage && post.coverImage !== 'no-photo.jpg' ? post.coverImage : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80'} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#111]">
                            {post.category?.name || post.category || 'Uncategorized'}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h4 className="text-xl font-bold text-[#111] leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-[#555] text-sm mb-6 line-clamp-2">
                            {post.excerpt || post.content?.substring(0, 100).replace(/<[^>]+>/g, '') + '...'}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-[#777] pt-4 border-t border-black/5">
                            <span className="font-medium text-[#111]">{post.author?.name || 'Author'}</span>
                            <span>{post.readingTime || '5 min read'}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  {latestPosts.length === 0 && <p className="text-[#777]">No other articles available.</p>}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:w-1/3">
                <div className="sticky top-32">
                  <h3 className="text-xl font-bold text-[#111] mb-6 pb-4 border-b border-black/5">Popular Stories</h3>
                  
                  <div className="flex flex-col gap-6">
                    {popularPosts.length > 0 ? popularPosts.map((post, index) => (
                      <Link to={`/blog/${post.slug}`} key={post._id} className="group flex gap-4 items-center">
                        <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-black/5">
                          <img src={post.coverImage && post.coverImage !== 'no-photo.jpg' ? post.coverImage : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80'} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">{post.category?.name || post.category || 'Uncategorized'}</div>
                          <h5 className="font-semibold text-[#111] text-[15px] leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h5>
                        </div>
                      </Link>
                    )) : (
                      <p className="text-[#777] text-sm">No popular stories yet.</p>
                    )}
                  </div>

                  {/* Newsletter Small */}
                  <div className="mt-12 p-8 bg-neutral-50 rounded-[24px] border border-black/5">
                    <h4 className="font-bold text-lg text-[#111] mb-2">Join our Newsletter</h4>
                    <p className="text-sm text-[#555] mb-4">Get the latest insights delivered weekly.</p>
                    <div className="flex flex-col gap-2">
                      <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:border-black/30 text-sm" />
                      <button className="w-full bg-[#111] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* More Articles List */}
            {latestPosts.length > 0 && (
              <section className="mb-24">
                <h3 className="text-2xl font-bold text-[#111] mb-8 pb-4 border-b border-black/5">More Articles</h3>
                <div className="flex flex-col">
                  {latestPosts.map((post) => (
                    <Link to={`/blog/${post.slug}`} key={`list-${post._id}`} className="group py-6 border-b border-black/5 flex flex-col md:flex-row gap-6 md:items-center hover:bg-black/[0.02] transition-colors px-4 -mx-4 rounded-xl">
                      <div className="w-full md:w-48 h-32 md:h-24 shrink-0 rounded-xl overflow-hidden">
                        <img src={post.coverImage && post.coverImage !== 'no-photo.jpg' ? post.coverImage : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80'} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#777] mb-2">{post.category?.name || post.category || 'Uncategorized'} • {new Date(post.createdAt).toLocaleDateString()}</div>
                        <h4 className="text-xl font-bold text-[#111] mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h4>
                        <p className="text-[#555] text-sm line-clamp-1">{post.excerpt || post.content?.substring(0, 100).replace(/<[^>]+>/g, '') + '...'}</p>
                      </div>
                      <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-black/10 group-hover:border-black/30 group-hover:bg-white transition-all text-[#111]">
                        <ChevronRight size={20} />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

      </main>
      
      {/* Newsletter Big CTA */}
      <section className="py-24 bg-[#111] text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Never Miss an Update</h2>
          <p className="text-lg text-white/70 mb-10">Get design insights, development tips, and digital trends delivered directly to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 transition-all" />
            <button className="px-8 py-4 rounded-full bg-white text-[#111] font-semibold hover:bg-gray-100 hover:scale-105 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
