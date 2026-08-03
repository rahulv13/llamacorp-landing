import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Loader2, LayoutTemplate, Plus, Trash2, Upload } from 'lucide-react';

interface ContentSections {
  [key: string]: any;
}

export default function ContentEditor() {
  const [activeTab, setActiveTab] = useState('home');
  const [sections, setSections] = useState<ContentSections>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent(activeTab);
  }, [activeTab]);

  const fetchContent = async (pageId: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/${pageId}`);
      // Initialize with empty defaults if no content exists yet
      const fetchedSections = res.data?.sections;
      if (!fetchedSections || Object.keys(fetchedSections).length === 0) {
        setSections(getDefaultSections(pageId));
      } else {
        setSections(fetchedSections);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setSections(getDefaultSections(pageId));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultSections = (pageId: string) => {
    if (pageId === 'home') {
      return {
        hero: {
          title: 'New Era',
          subtitle: '/ We craft AI websites /',
          buttonText: 'Start'
        },
        features: {
          heading: 'Intelligent design & performance',
          description: 'We believe in the power of simplicity and the impact of clean code. Let us help you navigate the digital landscape with solutions that look beautiful and work flawlessly.'
        }
      };
    }
    if (pageId === 'about') {
      return {
        hero: {
          title: 'Pioneering\nDigital Futures',
          subtitle: 'We are a collective of visionaries, engineers, and designers building the next generation of AI-driven digital experiences.'
        },
        team: []
      }
    }
    if (pageId === 'services') {
      return {
        header: {
          title: 'Our Services',
          subtitle: 'Comprehensive solutions for your digital needs.',
        }
      };
    }
    return {};
  };

  const handleSectionChange = (sectionKey: string, field: string, value: string) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value
      }
    }));
  };

  const handleTeamMemberChange = (index: number, field: string, value: string) => {
    setSections(prev => {
      const newTeam = [...(prev.team || [])];
      newTeam[index] = { ...newTeam[index], [field]: value };
      return { ...prev, team: newTeam };
    });
  };

  const handleAddTeamMember = () => {
    setSections(prev => ({
      ...prev,
      team: [...(prev.team || []), { name: 'New Member', role: 'Role', image: '' }]
    }));
  };

  const handleRemoveTeamMember = (index: number) => {
    setSections(prev => {
      const newTeam = [...(prev.team || [])];
      newTeam.splice(index, 1);
      return { ...prev, team: newTeam };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Assuming a token is needed for the upload API
      const token = localStorage.getItem('token'); // Ensure this matches how your auth token is stored
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data && res.data.url) {
        handleTeamMemberChange(index, 'image', res.data.url);
      }
    } catch (err) {
      console.error('Failed to upload image', err);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/${activeTab}`, {
        sections
      });
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">Page Content</h2>
        <button
          onClick={handleSave}
          disabled={loading || saving}
          className="liquid-glass-strong rounded-full text-white px-4 py-2 h-10 rounded-xl text-sm font-medium text-white flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex space-x-2 border-b border-white/10 pb-2">
        {['home', 'about', 'services'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-xl transition-all capitalize backdrop-blur-sm ${
              activeTab === tab
                ? 'liquid-glass rounded-full text-white border-b-0 text-white shadow-[0_-4px_15px_rgba(255,255,255,0.1)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab} Page
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 flex flex-col items-center">
          <Loader2 className="animate-spin h-8 w-8 mb-4" />
          Loading content...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {Object.keys(sections).length === 0 ? (
             <div className="liquid-glass rounded-[1.25rem] p-12 text-center">
                <LayoutTemplate className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2 drop-shadow-sm">No dynamic content sections defined</h3>
                <p className="text-gray-400 mb-6">You can define sections for this page in the code to make them editable here.</p>
             </div>
          ) : (
            Object.entries(sections).map(([sectionKey, sectionData]) => {
              if (sectionKey === 'team') {
                return (
                  <div key={sectionKey} className="liquid-glass rounded-[1.25rem] p-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2 relative z-10">
                      <h3 className="text-lg font-medium text-white capitalize drop-shadow-sm">{sectionKey} Section</h3>
                      <button
                        onClick={handleAddTeamMember}
                        className="liquid-glass rounded-full text-white px-3 py-1.5 rounded-lg text-sm text-white"
                      >
                        <Plus size={16} className="mr-1" /> Add Member
                      </button>
                    </div>

                    <div className="space-y-6 relative z-10">
                      {(sectionData as any[]).map((member, index) => (
                        <div key={index} className="p-4 liquid-glass rounded-[1.25rem] rounded-xl border-white/10 relative group">
                          <button
                            onClick={() => handleRemoveTeamMember(index)}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1 bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16} />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-300">Name</label>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                className="w-full liquid-glass rounded-full text-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-300">Role</label>
                              <input
                                type="text"
                                value={member.role}
                                onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                                className="w-full liquid-glass rounded-full text-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-500"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-sm font-medium text-gray-300">Image</label>
                              <div className="flex items-center gap-4">
                                {member.image && (
                                  <div className="w-16 h-16 rounded-lg bg-zinc-800 overflow-hidden shrink-0 border border-white/10">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                  </div>
                                )}
                                <div className="flex-1 relative group/upload">
                                  <input
                                    type="text"
                                    value={member.image}
                                    onChange={(e) => handleTeamMemberChange(index, 'image', e.target.value)}
                                    placeholder="Image URL or upload..."
                                    className="w-full liquid-glass rounded-full text-white rounded-xl px-4 py-3 pr-12 text-sm text-white focus:outline-none transition-all placeholder-gray-500"
                                  />
                                  <label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                    <Upload size={16} />
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept="image/*"
                                      onChange={(e) => handleImageUpload(e, index)}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {(!sectionData || (sectionData as any[]).length === 0) && (
                        <div className="text-center py-6 text-gray-500 border border-dashed border-white/10 rounded-xl bg-white/5">
                          No team members added yet.
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div key={sectionKey} className="liquid-glass rounded-[1.25rem] p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <h3 className="text-lg font-medium text-white mb-4 capitalize border-b border-white/10 pb-2 drop-shadow-sm relative z-10">{sectionKey} Section</h3>
                  <div className="space-y-4 relative z-10">
                    {Object.entries(sectionData as Record<string, any>).map(([field, value]) => (
                      <div key={field} className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 capitalize">{field}</label>
                        {typeof value === 'string' && value.length > 100 ? (
                          <textarea
                            value={value}
                            onChange={(e) => handleSectionChange(sectionKey, field, e.target.value)}
                            rows={4}
                            className="w-full liquid-glass rounded-full text-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-500"
                          />
                        ) : (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleSectionChange(sectionKey, field, e.target.value)}
                            className="w-full liquid-glass rounded-full text-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-500"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}