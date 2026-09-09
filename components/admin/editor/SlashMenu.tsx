import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance as TippyInstance } from 'tippy.js';
import { 
  Heading1, Heading2, Heading3, 
  Type, List, ListOrdered, Quote, 
  Code, Image as ImageIcon, Minus 
} from 'lucide-react';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

// Commands List
const getCommandSuggestions = ({ query }: { query: string }) => {
  const allCommands = [
    {
      title: 'Text',
      description: 'Just start typing with plain text.',
      icon: <Type size={18} />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setNode('paragraph').run();
      },
    },
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      icon: <Heading1 size={18} />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
      },
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading.',
      icon: <Heading2 size={18} />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
      },
    },
    {
      title: 'Heading 3',
      description: 'Small section heading.',
      icon: <Heading3 size={18} />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
      },
    },
    {
      title: 'Bullet List',
      description: 'Create a simple bulleted list.',
      icon: <List size={18} />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: 'Numbered List',
      description: 'Create a list with numbering.',
      icon: <ListOrdered size={18} />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: 'Quote',
      description: 'Capture a quote.',
      icon: <Quote size={18} />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setBlockquote().run();
      },
    },
    {
      title: 'Code Block',
      description: 'Capture a code snippet.',
      icon: <Code size={18} />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setCodeBlock().run();
      },
    },
    {
      title: 'Divider',
      description: 'Visually divide blocks.',
      icon: <Minus size={18} />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
    {
      title: 'Image',
      description: 'Upload an image.',
      icon: <ImageIcon size={18} />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).run();
        // Trigger a custom event to open the image upload dialog in the Toolbar or Editor wrapper
        window.dispatchEvent(new CustomEvent('open-image-upload'));
      },
    },
  ];

  return allCommands.filter((item) =>
    item.title.toLowerCase().startsWith(query.toLowerCase())
  ).slice(0, 10);
};

// React component for the dropdown menu
const CommandList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
        return true;
      }
      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }
      if (event.key === 'Enter') {
        selectItem(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  if (props.items.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl p-2 w-72 max-h-[300px] overflow-y-auto flex flex-col gap-1 z-50">
      <div className="text-xs font-semibold text-white/40 px-2 pt-1 pb-2 uppercase tracking-wider">
        Basic Blocks
      </div>
      {props.items.map((item: any, index: number) => (
        <button
          key={index}
          className={`flex items-center gap-3 px-3 py-2 text-sm text-left rounded-lg transition-colors ${
            index === selectedIndex ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
          }`}
          onClick={() => selectItem(index)}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/5 border border-white/5 text-white">
            {item.icon}
          </div>
          <div>
            <div className="font-medium text-white">{item.title}</div>
            <div className="text-xs text-white/50">{item.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
});

CommandList.displayName = 'CommandList';

export const SlashCommandsExtension = Extension.create({
  name: 'slash-command',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        items: getCommandSuggestions,
        render: () => {
          let component: ReactRenderer;
          let popup: TippyInstance[];

          return {
            onStart: (props) => {
              component = new ReactRenderer(CommandList, {
                props,
                editor: props.editor,
              });

              if (!props.clientRect) {
                return;
              }

              popup = tippy('body', {
                getReferenceClientRect: props.clientRect as any,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
                theme: 'slash-menu',
                animation: 'shift-away',
                duration: [200, 150],
              });
            },
            onUpdate(props) {
              component.updateProps(props);

              if (!props.clientRect) {
                return;
              }

              popup[0].setProps({
                getReferenceClientRect: props.clientRect as any,
              });
            },
            onKeyDown(props) {
              if (props.event.key === 'Escape') {
                popup[0].hide();
                return true;
              }
              return (component.ref as any)?.onKeyDown(props);
            },
            onExit() {
              popup[0].destroy();
              component.destroy();
            },
          };
        },
      }),
    ];
  },
});
