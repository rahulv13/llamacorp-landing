import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
}

export default function StatCard({ title, value, icon: Icon, trend, trendDirection = 'neutral' }: StatCardProps) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white/60">{title}</h3>
        <div className="p-2 bg-white/5 rounded-lg">
          <Icon size={18} className="text-blue-400" />
        </div>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-white">{value}</span>
        {trend && (
          <span className={`text-xs font-medium ${
            trendDirection === 'up' ? 'text-green-400' : 
            trendDirection === 'down' ? 'text-red-400' : 
            'text-white/40'
          }`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
