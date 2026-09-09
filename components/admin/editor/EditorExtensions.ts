import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import Youtube from '@tiptap/extension-youtube';
import Dropcursor from '@tiptap/extension-dropcursor';
import { SlashCommandsExtension } from './SlashMenu';

export const getEditorExtensions = () => [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4],
    },
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'rounded-xl border border-white/10 max-w-full h-auto object-cover my-4',
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/50',
    },
  }),
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: 'border-collapse table-auto w-full border border-white/20',
    },
  }),
  TableRow,
  TableHeader.configure({
    HTMLAttributes: {
      class: 'border border-white/20 bg-white/5 p-2 font-semibold text-left',
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: 'border border-white/20 p-2',
    },
  }),
  Youtube.configure({
    inline: false,
    HTMLAttributes: {
      class: 'aspect-video w-full rounded-xl border border-white/10 my-4',
    },
  }),
  Dropcursor.configure({
    color: '#3b82f6',
    width: 2,
  }),
  CharacterCount,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return 'What’s the title?';
      }
      return 'Type / for commands, or start typing here...';
    },
    emptyEditorClass: 'is-editor-empty',
  }),
  SlashCommandsExtension,
];
