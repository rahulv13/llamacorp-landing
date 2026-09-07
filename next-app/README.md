# LlamaCorp Next.js Architecture

LlamaCorp is a premium AI-powered web design and development agency. This repository represents the modernized Next.js 15 App Router architecture, migrated from a legacy Vite + React setup.

## Project Overview

The architecture emphasizes **Server-First Execution**, using React Server Components to maximize performance, reduce JavaScript bundle sizes, and improve AI discoverability/SEO. The application leverages an "Islands Architecture," where static and structural content is generated on the server, while interactive animations and dynamic behaviors are hydrated on the client via `"use client"` wrappers.

## Folder Structure

```
next-app/
├── app/                  # Next.js App Router (Pages, Layouts, SEO config)
│   ├── about/            # About page route
│   ├── blog/             # Dynamic blog index and article pages
│   ├── services/         # Services page route
│   └── work/             # Portfolio work route
├── components/           # React Components
│   ├── layout/           # Global shells (Navbar, Footer, Providers)
│   ├── sections/         # Page-specific components (Hero, Testimonials)
│   ├── seo/              # JSON-LD Schema components
│   └── ui/               # Reusable utility components (Buttons, Avatars)
├── lib/                  # Shared utilities
│   ├── constants.ts      # Site configuration variables
│   ├── metadata.ts       # Global SEO utilities
│   ├── navigation.ts     # Route mapping configuration
│   └── schema.ts         # JSON-LD Schema generators
└── public/               # Static assets (Images, Favicon, Fonts)
```

## Development Setup

**Requirements:**
- Node.js v18.17+
- npm v9+

**Installation:**
```bash
npm install
```

**Running Locally:**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Production Deployment

This project is perfectly optimized for Edge and Serverless deployment on **Vercel**. 
To deploy, simply link this repository to a Vercel project and Next.js defaults will automatically compile the application.

**Manual Build Validation:**
```bash
npm run build
npm run start
```

## Environment Variables

For local development and production, ensure the following environment variables are set (e.g., in `.env.local`):

- `NEXT_PUBLIC_API_URL`: The URL of the backend API (used for fetching dynamic blog content). Defaults to `http://localhost:5001/api`.

## Maintenance Guide

- **Adding new pages:** Create a new folder inside `app/` with a `page.tsx`. Use `constructMetadata` from `lib/metadata.ts` to export canonical `metadata`.
- **Modifying animations:** Heavy animation libraries (e.g., Three.js, Framer Motion) are isolated inside client wrappers (e.g., `ParticleFooterWrapper.client.tsx`). Make sure not to leak these into Server Components to avoid inflating the JS payload.
- **Blog Content:** The blog is dynamically SSG'd based on the backend API response. If backend schema changes occur, update `app/blog/[slug]/page.tsx` parsing accordingly.
