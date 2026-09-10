import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface PublishChecklistProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  coverImage: string | null;
  category: string;
}

export default function PublishChecklist({
  title,
  metaTitle,
  metaDescription,
  content,
  coverImage,
  category
}: PublishChecklistProps) {
  
  // Basic validation rules
  const checks = [
    {
      id: 'title',
      label: 'Article Title exists',
      passed: title.length > 0,
      warning: 'Please add a title.'
    },
    {
      id: 'metaDescription',
      label: 'Meta Description exists (SEO)',
      passed: metaDescription.length > 0,
      warning: 'Missing meta description. This hurts SEO.'
    },
    {
      id: 'coverImage',
      label: 'Featured Image selected',
      passed: !!coverImage && coverImage !== 'no-photo.jpg',
      warning: 'Missing featured image. This will look bad on social media.'
    },
    {
      id: 'category',
      label: 'Category selected',
      passed: !!category && category !== 'Uncategorized',
      warning: 'Currently marked as Uncategorized.'
    },
    {
      id: 'content',
      label: 'Content has acceptable length',
      passed: content.length > 300,
      warning: 'Content is very short. Aim for at least 300 words.'
    }
  ];

  const allPassed = checks.every(c => c.passed);

  return (
    <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-4">
      <h3 className="text-sm font-medium text-white border-b border-white/10 pb-3">Publish Checklist</h3>
      
      {allPassed && (
        <div className="rounded-md bg-green-500/10 p-3 border border-green-500/20 text-green-400 text-xs flex items-center gap-2 mb-4">
          <CheckCircle2 size={16} /> All systems go! Ready to publish.
        </div>
      )}

      <ul className="space-y-3">
        {checks.map((check) => (
          <li key={check.id} className="flex items-start gap-2 text-xs">
            {check.passed ? (
              <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={14} className="text-yellow-500 shrink-0 mt-0.5" />
            )}
            <div>
              <span className={check.passed ? 'text-white/80' : 'text-yellow-500 font-medium'}>
                {check.label}
              </span>
              {!check.passed && (
                <p className="text-white/40 mt-0.5">{check.warning}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      
      {!allPassed && (
        <div className="pt-2">
          <p className="text-[10px] text-white/40 italic">Note: You can still publish even with warnings, but it is not recommended.</p>
        </div>
      )}
    </div>
  );
}
