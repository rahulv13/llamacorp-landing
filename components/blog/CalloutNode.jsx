import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import React from 'react';

const CalloutComponent = ({ node, updateAttributes }) => {
  return (
    <NodeViewWrapper className={`my-6 rounded-xl border-l-4 p-6 ${node.attrs.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-green-50 border-green-400'}`}>
      <div className="flex items-center gap-3 mb-2 font-bold select-none" contentEditable={false}>
        <span className="text-xl">{node.attrs.type === 'warning' ? '🟡' : '🟢'}</span>
        <select 
          value={node.attrs.type} 
          onChange={e => updateAttributes({ type: e.target.value })}
          className="bg-transparent border-none outline-none font-bold text-gray-800"
        >
          <option value="tip">Pro Tip</option>
          <option value="warning">Important</option>
        </select>
      </div>
      <NodeViewContent className={`text-gray-700 ${node.attrs.type === 'warning' ? 'text-yellow-900' : 'text-green-900'} min-h-[1.5em]`} />
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: 'callout',
  group: 'block',
  content: 'inline*',
  
  addAttributes() {
    return {
      type: {
        default: 'tip',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="callout"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const isWarning = HTMLAttributes.type === 'warning';
    const emoji = isWarning ? '🟡' : '🟢';
    const classes = isWarning ? 'bg-yellow-50 border-yellow-400 text-yellow-900' : 'bg-green-50 border-green-400 text-green-900';
    
    return [
      'div', 
      mergeAttributes(HTMLAttributes, { 'data-type': 'callout', class: `my-6 rounded-xl border-l-4 p-6 ${classes}` }), 
      ['div', { class: 'font-bold mb-2 text-xl select-none' }, emoji],
      ['div', 0]
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent);
  },
});
