import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';
import { Editor } from '@tiptap/react';
import { Bold, Italic, Strikethrough, Underline as UnderlineIcon, Link as LinkIcon, Unlink } from 'lucide-react';

export default function BubbleMenu({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <TiptapBubbleMenu 
      editor={editor} 
      tippyOptions={{ duration: 100 }}
      className="flex items-center gap-1 bg-[#1a1a1a] border border-white/10 shadow-2xl rounded-lg p-1"
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded transition-colors ${editor.isActive('bold') ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
      >
        <Bold size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded transition-colors ${editor.isActive('italic') ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
      >
        <Italic size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1.5 rounded transition-colors ${editor.isActive('underline') ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
      >
        <UnderlineIcon size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1.5 rounded transition-colors ${editor.isActive('strike') ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
      >
        <Strikethrough size={14} />
      </button>
      
      <div className="w-px h-4 bg-white/10 mx-1"></div>
      
      <button
        type="button"
        onClick={setLink}
        className={`p-1.5 rounded transition-colors ${editor.isActive('link') ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
      >
        <LinkIcon size={14} />
      </button>
      {editor.isActive('link') && (
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="p-1.5 rounded text-white/70 hover:bg-white/10 hover:text-red-400 transition-colors"
        >
          <Unlink size={14} />
        </button>
      )}
    </TiptapBubbleMenu>
  );
}
