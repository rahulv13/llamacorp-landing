export const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Design: Glassmorphism and Beyond",
    slug: "future-of-web-design-glassmorphism",
    excerpt: "Explore how glassmorphism is shaping modern digital experiences and what comes next in UI trends.",
    content: `
      <h2>The Rise of Glassmorphism</h2>
      <p>Glassmorphism has become one of the most prominent UI design trends in recent years. Characterized by its frosted-glass effect, vivid backgrounds, and subtle borders, it creates a sense of depth and hierarchy.</p>
      
      <blockquote>"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs</blockquote>
      
      <h3>Key Characteristics</h3>
      <ul>
        <li>Background blur (backdrop-filter)</li>
        <li>Multi-layered approach with floating objects</li>
        <li>Vivid colors to highlight the blurred transparency</li>
        <li>Subtle, light borders on the translucent objects</li>
      </ul>
      
      <h3>Implementation in CSS</h3>
      <p>Implementing glassmorphism is easier than ever with modern CSS:</p>
      <pre><code>.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}</code></pre>
      
      <p>As we move forward, we expect to see more hybrid approaches combining glassmorphism with neumorphism and brutalism for highly unique, brand-specific aesthetics.</p>
    `,
    category: "Web Design",
    author: "Elena Rodriguez",
    authorAvatar: "https://i.pravatar.cc/150?img=12",
    date: "August 12, 2026",
    readTime: "5 min read",
    image: "/assets/5.avif",
    featured: true,
    tags: ["UI/UX", "Trends", "CSS"]
  },
  {
    id: 2,
    title: "Mastering React Server Components",
    slug: "mastering-react-server-components",
    excerpt: "A deep dive into how RSCs are changing the way we build React applications for better performance.",
    content: "<h2>Server Components</h2><p>React Server Components allow developers to build apps that span the server and client...</p>",
    category: "Development",
    author: "Marcus Chen",
    authorAvatar: "https://i.pravatar.cc/150?img=11",
    date: "August 05, 2026",
    readTime: "8 min read",
    image: "/assets/2.avif",
    featured: false,
    tags: ["React", "Performance"]
  },
  {
    id: 3,
    title: "Building a Premium Brand Identity in 2026",
    slug: "premium-brand-identity-2026",
    excerpt: "Discover the core elements that separate a generic brand from a premium, unforgettable identity.",
    content: "<h2>The Core of Premium</h2><p>Premium isn't just about high prices; it's about perceived value and meticulous attention to detail...</p>",
    category: "Branding",
    author: "Sarah Jenkins",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    date: "July 28, 2026",
    readTime: "6 min read",
    image: "/assets/3.avif",
    featured: false,
    tags: ["Branding", "Strategy"]
  },
  {
    id: 4,
    title: "AI in UI Design: Threat or Tool?",
    slug: "ai-in-ui-design",
    excerpt: "How artificial intelligence is accelerating the design process without replacing human creativity.",
    content: "<h2>AI Assistants</h2><p>From generating placeholder copy to entire layout suggestions, AI is here to stay...</p>",
    category: "AI",
    author: "David Kim",
    authorAvatar: "https://i.pravatar.cc/150?img=8",
    date: "July 20, 2026",
    readTime: "4 min read",
    image: "/assets/6.avif",
    featured: false,
    tags: ["AI", "Design"]
  },
  {
    id: 5,
    title: "Optimizing Core Web Vitals for E-commerce",
    slug: "optimizing-core-web-vitals",
    excerpt: "Actionable strategies to improve your LCP, CLS, and INP metrics for higher conversion rates.",
    content: "<h2>Why Speed Matters</h2><p>In e-commerce, every millisecond counts...</p>",
    category: "SEO",
    author: "Marcus Chen",
    authorAvatar: "https://i.pravatar.cc/150?img=11",
    date: "July 15, 2026",
    readTime: "7 min read",
    image: "/assets/4.avif",
    featured: false,
    tags: ["SEO", "Performance", "E-commerce"]
  },
  {
    id: 6,
    title: "The Psychology of Micro-Interactions",
    slug: "psychology-of-micro-interactions",
    excerpt: "Small animations can have a massive impact on user satisfaction and product stickiness.",
    content: "<h2>Details Matter</h2><p>A simple hover state or loading animation can delight users...</p>",
    category: "UI/UX",
    author: "Elena Rodriguez",
    authorAvatar: "https://i.pravatar.cc/150?img=12",
    date: "July 02, 2026",
    readTime: "5 min read",
    image: "/assets/7.avif",
    featured: false,
    tags: ["UI/UX", "Animation"]
  }
];

export const getFeaturedPost = () => blogPosts.find(post => post.featured);
export const getLatestPosts = (limit = 3) => blogPosts.filter(post => !post.featured).slice(0, limit);
export const getPopularPosts = (limit = 4) => [...blogPosts].sort((a, b) => b.readTime.localeCompare(a.readTime)).slice(0, limit);
export const getPostBySlug = (slug) => blogPosts.find(post => post.slug === slug);
export const getAllCategories = () => ['All', ...new Set(blogPosts.map(post => post.category))];
