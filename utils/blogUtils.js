export const getBlogExcerpt = (post, length = 150) => {
  if (post.excerpt) return post.excerpt;
  if (!post.content) return '';

  let text = '';
  if (typeof post.content === 'string') {
    text = post.content.replace(/<[^>]+>/g, '');
  } else if (typeof post.content === 'object') {
    const extractText = (node) => {
      let str = '';
      if (node.type === 'text' && node.text) str += node.text;
      if (node.content) {
        node.content.forEach(child => {
          str += extractText(child) + ' ';
        });
      }
      return str;
    };
    text = extractText(post.content);
  }
  
  text = text.trim();
  return text.length > length ? text.substring(0, length) + '...' : text;
};
