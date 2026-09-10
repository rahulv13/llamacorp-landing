'use client';

import React, { useState } from 'react';
import { Save, Globe, Palette, Share2, Shield, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'site' | 'brand' | 'social' | 'advanced'>('site');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock settings state (UI Placeholder)
  const [settings, setSettings] = useState({
    siteName: 'LlamaCorp',
    tagline: 'Leading enterprise solutions',
    defaultSeoTitle: 'LlamaCorp - Enterprise Tech',
    defaultDescription: 'We provide top tier technology solutions for enterprise companies.',
    contactEmail: 'admin@llamacorp.com',
    orgName: 'LlamaCorp Inc.',
    twitter: 'https://twitter.com/llamacorp',
    linkedin: 'https://linkedin.com/company/llamacorp',
    github: 'https://github.com/llamacorp',
    maintenanceMode: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API save
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Settings saved successfully (UI Placeholder)');
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] -m-8 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#0a0a0a]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
          <p className="text-sm text-white/40 mt-1">Manage global site configurations</p>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Tabs */}
        <div className="w-64 border-r border-white/10 bg-[#0a0a0a] p-4 hidden md:flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('site')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'site' ? 'bg-blue-500/10 text-blue-400' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <Globe size={18} /> Site Configuration
          </button>
          <button 
            onClick={() => setActiveTab('brand')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'brand' ? 'bg-blue-500/10 text-blue-400' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <Palette size={18} /> Brand Identity
          </button>
          <button 
            onClick={() => setActiveTab('social')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'social' ? 'bg-blue-500/10 text-blue-400' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <Share2 size={18} /> Social Links
          </button>
          <button 
            onClick={() => setActiveTab('advanced')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'advanced' ? 'bg-blue-500/10 text-blue-400' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <Shield size={18} /> Advanced
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-black p-8">
          <div className="max-w-2xl bg-[#111] border border-white/10 rounded-xl p-6 opacity-80">
            <div className="mb-6 pb-6 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white capitalize">{activeTab} Settings</h2>
              <p className="text-sm text-white/40 mt-1">This is a UI placeholder ready for future backend integration.</p>
            </div>

            <form className="space-y-6">
              {activeTab === 'site' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Site Name</label>
                    <input 
                      type="text" 
                      value={settings.siteName}
                      onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Tagline</label>
                    <input 
                      type="text" 
                      value={settings.tagline}
                      onChange={(e) => setSettings({...settings, tagline: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Default SEO Title</label>
                    <input 
                      type="text" 
                      value={settings.defaultSeoTitle}
                      onChange={(e) => setSettings({...settings, defaultSeoTitle: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Default SEO Description</label>
                    <textarea 
                      rows={3}
                      value={settings.defaultDescription}
                      onChange={(e) => setSettings({...settings, defaultDescription: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>
                </>
              )}

              {activeTab === 'brand' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Organization Name</label>
                    <input 
                      type="text" 
                      value={settings.orgName}
                      onChange={(e) => setSettings({...settings, orgName: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Contact Email</label>
                    <input 
                      type="email" 
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="pt-4 flex gap-4">
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-white/40 cursor-pointer hover:border-white/40 hover:bg-white/5 transition-colors">
                      <span className="text-xs">Upload Logo</span>
                    </div>
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-white/40 cursor-pointer hover:border-white/40 hover:bg-white/5 transition-colors">
                      <span className="text-xs text-center">Upload Favicon</span>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'social' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">X (Twitter) URL</label>
                    <input 
                      type="url" 
                      value={settings.twitter}
                      onChange={(e) => setSettings({...settings, twitter: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">LinkedIn URL</label>
                    <input 
                      type="url" 
                      value={settings.linkedin}
                      onChange={(e) => setSettings({...settings, linkedin: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">GitHub URL</label>
                    <input 
                      type="url" 
                      value={settings.github}
                      onChange={(e) => setSettings({...settings, github: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {activeTab === 'advanced' && (
                <>
                  <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-black/30">
                    <div>
                      <h3 className="text-sm font-medium text-white">Maintenance Mode</h3>
                      <p className="text-xs text-white/40 mt-1">Displays a maintenance page to public visitors.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.maintenanceMode ? 'bg-blue-500' : 'bg-white/10'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
