import React from 'react';
import { Activity, Server, Database, Cloud, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { getSystemHealth } from '@/lib/admin/dashboard';

export const dynamic = 'force-dynamic';

export default async function HealthPage() {
  const health = await getSystemHealth();
  const isHealthy = health?.status === 'ok';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">System Health</h1>
          <p className="text-sm text-white/40 mt-1">Real-time status of backend services and integrations.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            {isHealthy && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </span>
          <span className="text-sm font-medium text-white/80">
            {isHealthy ? 'All Systems Operational' : 'Systems Degraded'}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* API Status */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Server size={20} className="text-blue-400" /> API Server
            </h2>
            {isHealthy ? <CheckCircle size={20} className="text-green-500" /> : <AlertCircle size={20} className="text-red-500" />}
          </div>
          <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Status</span>
              <span className={isHealthy ? 'text-green-400 font-medium' : 'text-red-400 font-medium'}>
                {isHealthy ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Last Checked</span>
              <span className="text-white">{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Response Time</span>
              <span className="text-white">~45ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Version</span>
              <span className="text-white">v1.2.0</span>
            </div>
          </div>
        </div>

        {/* Database Status (Placeholder) */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-6 opacity-70">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Database size={20} className="text-purple-400" /> Database (MongoDB)
            </h2>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Connection</span>
              <span className="text-green-400 font-medium">Connected</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Latency</span>
              <span className="text-white">~12ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Storage Used</span>
              <span className="text-white">UI Placeholder</span>
            </div>
          </div>
        </div>

        {/* Media Storage (Placeholder) */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-6 opacity-70">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Cloud size={20} className="text-yellow-400" /> Cloudinary
            </h2>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Status</span>
              <span className="text-green-400 font-medium">Operational</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">API Quota</span>
              <span className="text-white">UI Placeholder</span>
            </div>
          </div>
        </div>

        {/* Deployment Status (Placeholder) */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-6 opacity-70">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity size={20} className="text-pink-400" /> Frontend (Vercel)
            </h2>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Environment</span>
              <span className="text-white font-medium">Production</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Last Deployment</span>
              <span className="text-white flex items-center gap-1">
                <Clock size={12} className="text-white/40" /> UI Placeholder
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-400">
        Note: Some metrics above are UI placeholders ready for future integration. API Server status is live.
      </div>
    </div>
  );
}
