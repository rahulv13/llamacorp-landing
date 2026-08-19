import React, { useCallback, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import CalloutNode from './editor-nodes/CalloutNode';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Code, Link as LinkIcon, List, ListOrdered, Quote, 
  Heading2, Heading3, AlignLeft, AlignCenter, 
  Image as ImageIcon, Video, Table as TableIcon, AlertCircle
} from 'lucide-react';

export default function RichTextEditor({ content, onChange, onStatsChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Placeholder.configure({
        placeholder: 'Type / for commands or start writing...',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-600 underline cursor-pointer' },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: { class: 'rounded-xl max-w-full h-auto my-6' }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: { class: 'w-full border-collapse border border-gray-200 my-6' },
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({ nested: true }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Youtube.configure({ inline: false }),
      CharacterCount.configure({ limit: null }),
      CalloutNode,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      // Pass Tiptap JSON out
      onChange(editor.getJSON());
      
      if (onStatsChange) {
        onStatsChange({
          words: editor.storage.characterCount.words(),
          characters: editor.storage.characterCount.characters(),
        });
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px]',
      },
    },
  });

  const [linkUrl, setLinkUrl] = useState('');

  const setLink = useCallback(() => {
    if (linkUrl === null) return;
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    setLinkUrl('');
  }, [editor, linkUrl]);

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addYoutubeVideo = () => {
    const url = prompt('YouTube URL');
    if (url) editor.commands.setYoutubeVideo({ src: url, width: 640, height: 480 });
  };

  return (
    <div className="border border-black/5 rounded-xl bg-white overflow-hidden shadow-sm flex flex-col relative">
      
      {/* Sticky Toolbar */}
      <div className="bg-gray-50 border-b border-black/5 p-2 flex flex-wrap gap-1 sticky top-0 z-10">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive('bold') ? 'bg-black/10' : ''}`} title="Bold"><Bold size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive('italic') ? 'bg-black/10' : ''}`} title="Italic"><Italic size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive('underline') ? 'bg-black/10' : ''}`} title="Underline"><UnderlineIcon size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive('strike') ? 'bg-black/10' : ''}`} title="Strikethrough"><Strikethrough size={16} /></button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive('heading', { level: 2 }) ? 'bg-black/10' : ''}`} title="Heading 2"><Heading2 size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive('heading', { level: 3 }) ? 'bg-black/10' : ''}`} title="Heading 3"><Heading3 size={16} /></button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive('bulletList') ? 'bg-black/10' : ''}`} title="Bullet List"><List size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive('orderedList') ? 'bg-black/10' : ''}`} title="Ordered List"><ListOrdered size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive('blockquote') ? 'bg-black/10' : ''}`} title="Quote"><Quote size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive('codeBlock') ? 'bg-black/10' : ''}`} title="Code Block"><Code size={16} /></button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive({ textAlign: 'left' }) ? 'bg-black/10' : ''}`}><AlignLeft size={16} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded hover:bg-black/5 ${editor.isActive({ textAlign: 'center' }) ? 'bg-black/10' : ''}`}><AlignCenter size={16} /></button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        <button onClick={addImage} className="p-2 rounded hover:bg-black/5" title="Add Image"><ImageIcon size={16} /></button>
        <button onClick={addYoutubeVideo} className="p-2 rounded hover:bg-black/5" title="Add YouTube"><Video size={16} /></button>
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="p-2 rounded hover:bg-black/5" title="Insert Table"><TableIcon size={16} /></button>
      </div>

      {/* Slash Menu (Floating Menu) */}
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }} className="bg-white border border-black/10 shadow-xl rounded-xl overflow-hidden flex flex-col w-48 text-sm">
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="flex items-center gap-2 px-3 py-2 hover:bg-black/5 text-left text-[#333]">
            <Heading2 size={16} /> Heading 2
          </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="flex items-center gap-2 px-3 py-2 hover:bg-black/5 text-left text-[#333]">
            <Heading3 size={16} /> Heading 3
          </button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="flex items-center gap-2 px-3 py-2 hover:bg-black/5 text-left text-[#333]">
            <List size={16} /> Bullet List
          </button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="flex items-center gap-2 px-3 py-2 hover:bg-black/5 text-left text-[#333]">
            <ListOrdered size={16} /> Numbered List
          </button>
          <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="flex items-center gap-2 px-3 py-2 hover:bg-black/5 text-left text-[#333]">
            <Quote size={16} /> Quote
          </button>
          <button onClick={addImage} className="flex items-center gap-2 px-3 py-2 hover:bg-black/5 text-left text-[#333]">
            <ImageIcon size={16} /> Image
          </button>
          <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="flex items-center gap-2 px-3 py-2 hover:bg-black/5 text-left text-[#333]">
            <TableIcon size={16} /> Table
          </button>
          <button onClick={() => editor.chain().focus().insertContent({ type: 'callout' }).run()} className="flex items-center gap-2 px-3 py-2 hover:bg-black/5 text-left text-[#333]">
            <AlertCircle size={16} /> Callout
          </button>
        </FloatingMenu>
      )}

      {/* Bubble Menu for text selection */}
      {editor && (
        <BubbleMenu className="bg-[#111] text-white shadow-xl rounded-xl flex overflow-hidden p-1 text-sm border border-black/10" tippyOptions={{ duration: 100 }} editor={editor}>
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 hover:bg-white/10 rounded ${editor.isActive('bold') ? 'text-blue-400 bg-white/10' : ''}`}><Bold size={14} /></button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 hover:bg-white/10 rounded ${editor.isActive('italic') ? 'text-blue-400 bg-white/10' : ''}`}><Italic size={14} /></button>
          <div className="w-px bg-white/20 mx-1 my-1" />
          <div className="flex items-center px-2">
            <input type="text" placeholder="Paste URL..." className="bg-transparent outline-none text-white w-32 placeholder-white/50 text-xs" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && setLink()} />
            <button onClick={setLink} className="p-1 hover:text-blue-400"><LinkIcon size={14} /></button>
          </div>
        </BubbleMenu>
      )}

      {/* Editor Canvas */}
      <div className="p-6 md:p-8 flex-1 overflow-y-auto bg-white" style={{ minHeight: '600px' }}>
        <EditorContent editor={editor} />
      </div>

    </div>
  );
}
