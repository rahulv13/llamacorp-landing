import { Editor } from '@tiptap/react';
import { 
  Bold, Italic, Strikethrough, Underline as UnderlineIcon, 
  Heading1, Heading2, Heading3, List, ListOrdered, Quote, 
  Code, Image as ImageIcon, Link as LinkIcon, Video as YoutubeIcon, 
  Table as TableIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify
} from 'lucide-react';

export default function Toolbar({ 
  editor, 
  onImageUpload 
}: { 
  editor: Editor | null,
  onImageUpload: () => void 
}) {
  if (!editor) {
    return null;
  }

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

  const setYoutube = () => {
    const url = window.prompt('YouTube URL');
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-[#1a1a1a] border-b border-white/10 rounded-t-xl sticky top-0 z-40">
      
      {/* Formatting */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Bold (Cmd+B)"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Italic (Cmd+I)"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('underline') ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('strike') ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>
      </div>

      <div className="w-px h-5 bg-white/10 mx-1"></div>

      {/* Alignment */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
        >
          <AlignRight size={16} />
        </button>
      </div>

      <div className="w-px h-5 bg-white/10 mx-1"></div>

      {/* Headings */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </button>
      </div>

      <div className="w-px h-5 bg-white/10 mx-1"></div>

      {/* Lists & Quotes */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('blockquote') ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Quote"
        >
          <Quote size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('codeBlock') ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Code Block"
        >
          <Code size={16} />
        </button>
      </div>

      <div className="w-px h-5 bg-white/10 mx-1"></div>

      {/* Media & Embeds */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onImageUpload}
          className="p-2 rounded-lg text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          title="Insert Image"
        >
          <ImageIcon size={16} />
        </button>
        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('link') ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </button>
        <button
          type="button"
          onClick={setYoutube}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('youtube') ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Embed YouTube"
        >
          <YoutubeIcon size={16} />
        </button>
        <button
          type="button"
          onClick={insertTable}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('table') ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
          title="Insert Table"
        >
          <TableIcon size={16} />
        </button>
      </div>
    </div>
  );
}
