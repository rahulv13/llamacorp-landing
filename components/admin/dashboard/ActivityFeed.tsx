import React from 'react';
import Link from 'next/link';
import { Edit, FileText, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';

interface ActivityFeedProps {
  recentBlogs: any[];
}

export default function ActivityFeed({ recentBlogs }: ActivityFeedProps) {
  if (!recentBlogs || recentBlogs.length === 0) {
    return <div className="text-sm text-white/40 p-4">No recent activity.</div>;
  }

  return (
    <div className="space-y-6">
      {recentBlogs.map((blog, idx) => (
        <div key={blog._id} className="relative flex gap-4">
          {/* Timeline line */}
          {idx !== recentBlogs.length - 1 && (
            <div className="absolute top-8 bottom-[-24px] left-5 w-px bg-white/10" />
          )}
          
          <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center">
            {blog.status === 'published' ? (
              <CheckCircle size={16} className="text-green-400" />
            ) : blog.status === 'scheduled' ? (
              <Clock size={16} className="text-blue-400" />
            ) : (
              <Edit size={16} className="text-yellow-400" />
            )}
          </div>
          
          <div className="flex-1 pt-2 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <p className="text-sm text-white font-medium">
                {blog.author?.name || 'A user'} 
                <span className="font-normal text-white/60">
                  {blog.status === 'published' ? ' published an article' : blog.status === 'scheduled' ? ' scheduled an article' : ' updated a draft'}
                </span>
              </p>
              <span className="text-xs text-white/40">
                {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <Link href={`/admin/blogs/${blog._id}/edit`} className="mt-2 block bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-black/50 rounded flex items-center justify-center text-white/40">
                  {blog.coverImage && blog.coverImage !== 'no-photo.jpg' ? (
                    <Image src={blog.coverImage} alt="" width={40} height={40} className="rounded object-cover w-full h-full" />
                  ) : (
                    <FileText size={16} />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white truncate max-w-xs sm:max-w-md">{blog.title}</h4>
                  <p className="text-xs text-white/50 truncate max-w-xs sm:max-w-md">/{blog.slug}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
