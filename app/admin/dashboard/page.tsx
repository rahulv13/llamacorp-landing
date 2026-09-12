import React from 'react';
import StatCard from '@/components/admin/dashboard/StatCard';
import ActivityFeed from '@/components/admin/dashboard/ActivityFeed';
import AnalyticsChart from '@/components/admin/dashboard/AnalyticsChart';
import CalendarView from '@/components/admin/dashboard/CalendarView';
import { getDashboardStats } from '@/lib/admin/dashboard';
import { FileText, Eye, Edit3, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const res = await getDashboardStats();
  const stats = res?.data || {
    totalBlogs: 0,
    published: 0,
    drafts: 0,
    scheduled: 0,
    views: 0,
    recentBlogs: []
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-sm text-white/40 mt-1">Welcome back. Here is what is happening with your content today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Posts" 
          value={stats.totalBlogs} 
          icon={FileText} 
        />
        <StatCard 
          title="Published" 
          value={stats.published} 
          icon={Eye} 
          trend="+3 this week"
          trendDirection="up"
        />
        <StatCard 
          title="Drafts" 
          value={stats.drafts} 
          icon={Edit3} 
        />
        <StatCard 
          title="Scheduled" 
          value={stats.scheduled} 
          icon={Calendar} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Main Content Area */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-white/10 bg-[#111] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Content Status Distribution</h2>
            </div>
            <AnalyticsChart stats={{
              published: stats.published,
              drafts: stats.drafts,
              scheduled: stats.scheduled
            }} />
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            </div>
            <ActivityFeed recentBlogs={stats.recentBlogs} />
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-xl border border-white/10 bg-[#111] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Publishing Calendar</h2>
            </div>
            <CalendarView recentBlogs={stats.recentBlogs} />
          </div>

          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Eye size={100} />
            </div>
            <h2 className="text-sm font-medium text-blue-400 mb-2 uppercase tracking-wider relative z-10">Total Page Views</h2>
            <div className="text-4xl font-bold text-white relative z-10">{stats.views.toLocaleString()}</div>
            <p className="text-sm text-white/60 mt-2 relative z-10">Across all published articles</p>
          </div>
        </div>

      </div>
    </div>
  );
}
