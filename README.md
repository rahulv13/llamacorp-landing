# LlamaCorp — Next.js 15 App Router

Production website: [llamacorp.in](https://www.llamacorp.in)

LlamaCorp is a premium AI-powered web design and development agency. This repository contains the full production website, migrated from Vite to **Next.js 15 App Router** for superior performance, SEO, and maintainability.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint codebase
npm run lint
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend REST API base URL (used for blog fetching) |

---

## Deployment

This project deploys to **Vercel** using the existing `llamacorp-landing` project.

**Vercel Settings:**
- **Framework Preset:** Next.js (auto-detected)
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Root Directory:** `/` (project root)
- **Node.js Version:** 20.x

No extra configuration is needed. Simply push to `main` and Vercel handles the rest.

---

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global CSS
│   ├── sitemap.ts          # Auto-generated /sitemap.xml
│   ├── robots.ts           # Auto-generated /robots.txt
│   ├── about/              # /about page
│   ├── services/           # /services page
│   ├── work/               # /work page
│   └── blog/               # /blog and /blog/[slug]
├── components/             # Reusable UI components
│   ├── blog/               # Blog-specific components
│   ├── about/              # About page components
│   ├── services/           # Services page components
│   ├── work/               # Work/portfolio components
│   └── ui/                 # Shared primitives
├── lib/                    # Utilities and API wrappers
│   ├── api/blog.ts         # Blog data fetching
│   └── utils.ts            # Shared helpers (cn, etc.)
├── utils/                  # Additional utility functions
├── data/                   # Static data (projects, etc.)
├── public/                 # Static assets served at /
├── next.config.ts          # Next.js configuration
├── vercel.json             # Vercel deployment + security headers
├── package.json
└── tsconfig.json
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript + React 19 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| 3D | Spline / Three.js |
| Blog Rendering | Tiptap + custom Lexical nodes |
| Fonts | Inter + Geist (next/font) |
| Images | next/image (optimized) |
| Deployment | Vercel |
