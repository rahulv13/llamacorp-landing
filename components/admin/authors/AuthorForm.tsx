'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { createAdminAuthor, updateAdminAuthor } from '@/lib/admin/authors';
import MediaPicker from '../media/MediaPicker';

export default function AuthorForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [jobTitle, setJobTitle] = useState(initialData?.jobTitle || '');
  const [bio, setBio] = useState(initialData?.bio || '');
  const [avatar, setAvatar] = useState(initialData?.avatar || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  const [website, setWebsite] = useState(initialData?.website || '');
  const [linkedin, setLinkedin] = useState(initialData?.linkedin || '');
  const [x, setX] = useState(initialData?.x || '');
  const [instagram, setInstagram] = useState(initialData?.instagram || '');
  const [github, setGithub] = useState(initialData?.github || '');
  const [youtube, setYoutube] = useState(initialData?.youtube || '');

  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '');

  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const payload = {
      fullName,
      slug,
      jobTitle,
      bio,
      avatar,
      email,
      featured,
      isActive,
      website,
      linkedin,
      x,
      instagram,
      github,
      youtube,
      seoTitle,
      seoDescription
    };

    const res = initialData
      ? await updateAdminAuthor(initialData._id, payload)
      : await createAdminAuthor(payload);

    if (res.error) {
      setError(res.error);
      setIsSubmitting(false);
    } else {
      router.push('/admin/authors');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-[1000px]">
      <div className="flex items-center justify-between sticky top-0 z-50 bg-[#0a0a0a] py-4 border-b border-white/10 -mt-8 pt-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/authors" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            {initialData ? 'Edit Author' : 'New Author'}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href="/admin/authors"
            className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-md bg-white py-2 px-6 text-sm font-semibold text-black hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save Author'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-black/50 py-3 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                  placeholder="e.g. Rahul Vishwakarma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-black/50 py-3 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                  placeholder="Auto-generated if left blank"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-black/50 py-3 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                  placeholder="e.g. Lead Designer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Bio
                </label>
                <textarea
                  rows={5}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-black/50 py-3 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                  placeholder="Rich text / markdown bio..."
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Website</label>
                <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm" placeholder="https://" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">LinkedIn</label>
                <input type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm" placeholder="https://linkedin.com/in/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">X (Twitter)</label>
                <input type="url" value={x} onChange={e => setX(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm" placeholder="https://x.com/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Instagram</label>
                <input type="url" value={instagram} onChange={e => setInstagram(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm" placeholder="https://instagram.com/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">GitHub</label>
                <input type="url" value={github} onChange={e => setGithub(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm" placeholder="https://github.com/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">YouTube</label>
                <input type="url" value={youtube} onChange={e => setYoutube(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm" placeholder="https://youtube.com/..." />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">SEO Meta Tags</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Meta Title</label>
                <input type="text" maxLength={60} value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm" placeholder="Optimal: 50-60 chars" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Meta Description</label>
                <textarea rows={3} maxLength={160} value={seoDescription} onChange={e => setSeoDescription(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm" placeholder="Optimal: 150-160 chars" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Avatar</h2>
            <div 
              onClick={() => setIsMediaPickerOpen(true)}
              className="relative aspect-square rounded-xl border-2 border-dashed border-white/10 bg-black/50 hover:border-white/30 hover:bg-white/5 transition-colors cursor-pointer overflow-hidden flex items-center justify-center group"
            >
              {avatar && avatar !== 'no-photo.jpg' ? (
                <img src={avatar} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6 flex flex-col items-center">
                  <ImageIcon className="h-8 w-8 text-white/20 mb-2 group-hover:text-white/40 transition-colors" />
                  <span className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors">Select Avatar</span>
                </div>
              )}
            </div>
            {avatar && avatar !== 'no-photo.jpg' && (
              <button 
                type="button" 
                onClick={() => setAvatar('')}
                className="w-full py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
              >
                Remove Avatar
              </button>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm" placeholder="Private, admin only" />
              </div>
              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-white/10 bg-black/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-black"
                />
                <label htmlFor="featured" className="text-sm font-medium text-white/80">
                  Featured Author
                </label>
              </div>
              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-white/10 bg-black/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-black"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-white/80">
                  Active (Publicly Visible)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MediaPicker
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(img) => {
          setAvatar(img.url);
          setIsMediaPickerOpen(false);
        }}
      />
    </form>
  );
}
