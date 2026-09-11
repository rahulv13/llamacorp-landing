'use client';

import React, { useCallback, useState } from 'react';
import { UploadCloud, File, X } from 'lucide-react';
import { uploadAdminImage } from '@/lib/admin/media';

interface UploadDropzoneProps {
  onUploadComplete: () => void;
}

export default function UploadDropzone({ onUploadComplete }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<{name: string, progress: number}[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = async (files: File[]) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    const validFiles = files.filter(f => validTypes.includes(f.type));
    
    if (validFiles.length === 0) {
      alert("Please upload valid images (JPG, PNG, WebP, GIF, SVG).");
      return;
    }

    setUploadingFiles(validFiles.map(f => ({ name: f.name, progress: 0 })));

    let successCount = 0;

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      
      setUploadingFiles(prev => prev.map((f, idx) => idx === i ? { ...f, progress: 50 } : f));
      
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const res = await uploadAdminImage(formData);
        
        if (!res.error) {
          successCount++;
          setUploadingFiles(prev => prev.map((f, idx) => idx === i ? { ...f, progress: 100 } : f));
        } else {
          alert(`Failed to upload ${file.name}: ${res.error}`);
          setUploadingFiles(prev => prev.filter((_, idx) => idx !== i));
        }
      } catch (err: any) {
        console.error(err);
        alert(`Failed to upload ${file.name}: ${err.message || 'Unknown error'}`);
        setUploadingFiles(prev => prev.filter((_, idx) => idx !== i));
      }
    }

    if (successCount > 0) {
      setTimeout(() => {
        setUploadingFiles([]);
        onUploadComplete();
      }, 1000);
    } else {
      setUploadingFiles([]);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full rounded-xl border-2 border-dashed transition-all p-8 flex flex-col items-center justify-center text-center cursor-pointer ${
          isDragging 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-white/10 bg-[#111] hover:bg-white/5 hover:border-white/30'
        }`}
        onClick={() => document.getElementById('media-upload-input')?.click()}
      >
        <div className={`p-4 rounded-full mb-4 ${isDragging ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white/60'}`}>
          <UploadCloud size={32} />
        </div>
        <h3 className="text-lg font-medium text-white mb-1">Click or drag images to upload</h3>
        <p className="text-sm text-white/40 max-w-sm">
          Supports JPG, PNG, WebP, GIF, and SVG. Images are automatically optimized.
        </p>
        <input 
          type="file" 
          id="media-upload-input" 
          multiple 
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" 
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Upload Queue */}
      {uploadingFiles.length > 0 && (
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-medium uppercase tracking-wider text-white/60">Uploading ({uploadingFiles.length})</h4>
          <div className="space-y-2">
            {uploadingFiles.map((file, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-black/50 p-2.5 rounded-lg border border-white/5">
                <File size={16} className="text-blue-400" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-white truncate">{file.name}</p>
                    <span className="text-xs text-white/40">{file.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full transition-all duration-300 ease-out" 
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
