'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';
import { getEditorExtensions } from './EditorExtensions';
import Toolbar from './Toolbar';
import BubbleMenu from './BubbleMenu';

export default function TiptapEditor({ 
  content, 
  onChange 
}: { 
  content: string, 
  onChange: (content: string) => void 
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: getEditorExtensions(),
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-blue max-w-none focus:outline-none min-h-[400px] p-6 text-white/90',
      },
    },
  });

  // Handle image upload from either Toolbar or Slash commands
  useEffect(() => {
    const handleOpenImageUpload = () => {
      fileInputRef.current?.click();
    };

    window.addEventListener('open-image-upload', handleOpenImageUpload);
    return () => {
      window.removeEventListener('open-image-upload', handleOpenImageUpload);
    };
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Need to extract the token safely for this client-side request
      // A better way is to create a Server Action, but for now we'll do an API route or pass it in.
      // Wait, `/api/blogs/upload-image` expects the admin_token cookie to be forwarded. 
      // Because we are making the request from the client to our Next.js backend, 
      // we should create a Next.js API route that proxies this request, or a Server Action.
      // For now, let's trigger a custom Server Action that handles the file upload.
      
      const { uploadAdminImage } = await import('@/lib/admin/media');
      const result = await uploadAdminImage(formData);
      
      if (result.url) {
        editor.chain().focus().setImage({ src: result.url }).run();
      } else {
        alert('Failed to upload image. ' + (result.error || ''));
      }
    } catch (error) {
      console.error('Image upload failed', error);
      const url = window.prompt('Image upload failed. You can paste an image URL instead:');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const wordCount = editor?.storage.characterCount.words() || 0;
  const readTime = Math.ceil(wordCount / 200) || 1;

  if (!editor) {
    return <div className="min-h-[400px] bg-black/50 border border-white/10 rounded-xl animate-pulse"></div>;
  }

  return (
    <div className="relative rounded-xl border border-white/10 bg-[#111] overflow-hidden flex flex-col">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      
      <Toolbar editor={editor} onImageUpload={() => fileInputRef.current?.click()} />
      <BubbleMenu editor={editor} />
      
      <div className="flex-1 bg-black/50">
        <EditorContent editor={editor} />
      </div>

      {isUploading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="text-white font-medium flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading Image...
          </div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="bg-[#1a1a1a] border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs text-white/50">
        <div>
          {wordCount} words • {editor.storage.characterCount.characters()} chars
        </div>
        <div>
          ~{readTime} min read
        </div>
      </div>
    </div>
  );
}
