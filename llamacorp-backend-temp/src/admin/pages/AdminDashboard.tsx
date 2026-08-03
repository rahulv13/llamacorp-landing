import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Activity, Users, Database, ArrowUpRight, Clock, Zap, TrendingUp } from 'lucide-react';
import { LiquidGlassCard } from '../../components/ui/LiquidGlassCard';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from '../../components/ui/GlassCard';
import { LiquidButton } from '../../components/ui/LiquidButton';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const { user } = useAdmin();
  const [stats, setStats] = useState({
      totalViews: 0,
      totalBlogs: 0,
      published: 0,
      drafts: 0,
      scheduled: 0,
      recentBlogs: []
  });

  useEffect(() => {
      const fetchStats = async () => {
          try {
              const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs`);
              const blogs = res.data;
              const totalViews = blogs.reduce((acc: number, b: any) => acc + (b.views || 0), 0);
              const published = blogs.filter((b: any) => b.status === 'published').length;
              const drafts = blogs.filter((b: any) => b.status === 'draft').length;
              const scheduled = blogs.filter((b: any) => b.status === 'scheduled').length;

              setStats({
                  totalViews,
                  totalBlogs: blogs.length,
                  published,
                  drafts,
                  scheduled,
                  recentBlogs: blogs.slice(0, 5)
              });
          } catch (err) {
              console.error(err);
          }
      };
      fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500 pb-12">

      {/* Hero Header */}
      <LiquidGlassCard
        className="relative overflow-hidden group border-white/20"
        borderRadius="32px"
        blurIntensity="xl"
        glowIntensity="md"
        shadowIntensity="lg"
      >
         <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent mix-blend-screen pointer-events-none" />

         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 p-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg">
                Overview
              </h1>
              <p className="text-lg text-gray-300">
                Welcome back, <span className="text-white font-semibold">{user?.name || 'Admin'}</span>. Here's what's happening today.
              </p>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-3 liquid-glass-strong rounded-full text-white font-medium hover:scale-105 transition-transform flex items-center gap-2">
                <Clock size={18} />
                <span>Last 30 Days</span>
              </button>
              <LiquidButton label="Generate Report" className="px-6 py-3 rounded-full text-white font-medium transition-colors flex items-center gap-2">
                <ArrowUpRight size={18} />
                <span>Generate Report</span>
              </LiquidButton>
            </div>
         </div>
      </LiquidGlassCard>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="group hover:bg-white/10 transition-colors">
          <GlassCardHeader>
            <div className="flex justify-between items-start w-full">
              <div className="p-3 bg-white/10 border border-white/20 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </GlassCardHeader>
          <GlassCardContent>
            <GlassCardDescription>Total Views</GlassCardDescription>
            <GlassCardTitle className="text-3xl mt-1">{stats.totalViews}</GlassCardTitle>
          </GlassCardContent>
        </GlassCard>

        <GlassCard className="group hover:bg-white/10 transition-colors">
          <GlassCardHeader>
            <div className="flex justify-between items-start w-full">
              <div className="p-3 bg-blue-500/10 border border-blue-400/20 rounded-xl">
                <Database className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </GlassCardHeader>
          <GlassCardContent>
            <GlassCardDescription>Total Blogs</GlassCardDescription>
            <GlassCardTitle className="text-3xl mt-1">{stats.totalBlogs}</GlassCardTitle>
          </GlassCardContent>
        </GlassCard>

        <GlassCard className="group hover:bg-white/10 transition-colors">
          <GlassCardHeader>
            <div className="flex justify-between items-start w-full">
              <div className="p-3 bg-emerald-500/10 border border-emerald-400/20 rounded-xl">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </GlassCardHeader>
          <GlassCardContent>
            <GlassCardDescription>Published</GlassCardDescription>
            <GlassCardTitle className="text-3xl mt-1">{stats.published}</GlassCardTitle>
          </GlassCardContent>
        </GlassCard>

        <GlassCard className="group hover:bg-white/10 transition-colors">
          <GlassCardHeader>
            <div className="flex justify-between items-start w-full">
              <div className="p-3 bg-amber-500/10 border border-amber-400/20 rounded-xl">
                <Zap className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </GlassCardHeader>
          <GlassCardContent>
            <GlassCardDescription>Drafts</GlassCardDescription>
            <GlassCardTitle className="text-3xl mt-1">{stats.drafts}</GlassCardTitle>
          </GlassCardContent>
        </GlassCard>
      </div>

      {/* Two Column Layout for Main Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Posts Area */}
        <LiquidGlassCard
          className="lg:col-span-2 flex flex-col min-h-[400px]"
          borderRadius="32px"
          blurIntensity="xl"
          glowIntensity="md"
          shadowIntensity="lg"
        >
           <div className="flex justify-between items-center mb-6 p-8 pb-0">
              <h3 className="text-xl font-bold text-white">Recent Posts</h3>
              <button className="text-sm text-gray-400 hover:text-white transition-colors" onClick={() => window.location.href = '/admin/blogs'}>View All</button>
           </div>
           <div className="flex-1 mx-8 mb-8 mt-2 overflow-hidden flex flex-col gap-2">
              {stats.recentBlogs.length === 0 ? (
                 <div className="flex-1 flex items-center justify-center border border-white/5 rounded-2xl bg-black/20">
                    <p className="text-gray-500">No recent posts found.</p>
                 </div>
              ) : (
                 stats.recentBlogs.map((blog: any) => (
                    <div key={blog._id} className="flex items-center justify-between p-4 liquid-glass-strong rounded-xl hover:bg-white/10 transition-colors">
                       <div className="flex items-center gap-4">
                          {blog.coverImage ? (
                             <img src={blog.coverImage} alt={blog.title} className="w-12 h-12 object-cover rounded-lg" />
                          ) : (
                             <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-xs text-gray-500">No img</div>
                          )}
                          <div>
                             <h4 className="text-white font-medium line-clamp-1">{blog.title}</h4>
                             <p className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()} • {blog.views || 0} views</p>
                          </div>
                       </div>
                       <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${
                          blog.status === 'published' ? 'bg-white/20 text-white border border-white/30' : 
                          blog.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 
                          'bg-white/10 text-gray-300 border border-white/20'
                       }`}>
                          {blog.status}
                       </span>
                    </div>
                 ))
              )}
           </div>
        </LiquidGlassCard>

        {/* Quick Actions & Recent */}
        <div className="space-y-6">
          <LiquidGlassCard
            borderRadius="32px"
            blurIntensity="xl"
            glowIntensity="md"
            shadowIntensity="lg"
          >
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                {['New Blog Post', 'Edit Pricing', 'Update Hero Section', 'Manage Users'].map((action) => (
                  <button key={action} className="w-full text-left px-5 py-4 text-sm text-gray-200 font-medium liquid-glass-strong rounded-xl hover:text-white hover:scale-[1.02] transition-all flex items-center justify-between group">
                    {action}
                    <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                  </button>
                ))}
              </div>
            </div>
          </LiquidGlassCard>
        </div>

      </div>

    </div>
  );
}
