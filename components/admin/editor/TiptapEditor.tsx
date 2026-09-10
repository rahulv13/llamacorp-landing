'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';
import { getEditorExtensions } from './EditorExtensions';
import Toolbar from './Toolbar';
import BubbleMenu from './BubbleMenu';
import MediaPicker from '../media/MediaPicker';

export default function TiptapEditor({ 
  content, 
  onChange 
}: { 
  content: string, 
  onChange: (content: string) => void 
}) {
  const [showMediaPicker, setShowMediaPicker] = useState(false);

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

  // Handle image upload from Slash commands
  useEffect(() => {
    const handleOpenImageUpload = () => {
      setShowMediaPicker(true);
    };

    window.addEventListener('open-image-upload', handleOpenImageUpload);
    return () => {
      window.removeEventListener('open-image-upload', handleOpenImageUpload);
    };
  }, []);

  const wordCount = editor?.storage.characterCount.words() || 0;
  const readTime = Math.ceil(wordCount / 200) || 1;

  if (!editor) {
    return <div className="min-h-[400px] bg-black/50 border border-white/10 rounded-xl animate-pulse"></div>;
  }

  return (
    <div className="relative rounded-xl border border-white/10 bg-[#111] overflow-hidden flex flex-col">
      <Toolbar editor={editor} onImageUpload={() => setShowMediaPicker(true)} />
      <BubbleMenu editor={editor} />
      
      <div className="flex-1 bg-black/50">
        <EditorContent editor={editor} />
      </div>

      {showMediaPicker && (
        <MediaPicker
          title="Insert Image"
          onClose={() => setShowMediaPicker(false)}
          onSelect={(item) => {
            editor.chain().focus().setImage({ src: item.secureUrl, alt: item.alt || item.filename }).run();
            setShowMediaPicker(false);
          }}
        />
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
