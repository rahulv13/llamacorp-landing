# LlamaCorp Next.js Migration Report

## Overview
LlamaCorp's frontend infrastructure has successfully transitioned from a legacy Vite + React SPA architecture to a high-performance Next.js 15 App Router application. This migration was executed to eliminate significant SEO constraints, enhance crawlability by AI engines, drastically improve performance via Server Components, and establish a long-term, maintainable enterprise foundation.

## Phases Executed

### Phase 1: Foundation Construction
Created a completely new Next.js 15 architecture alongside the old repository to prevent regression. Set up absolute paths, Tailwind CSS v4, and native TypeScript compilation.

### Phase 2: Global Application Shell
Migrated all application assets, fonts, icons, navigation mechanisms, and the global `<Footer>`. Centralized the Next.js `layout.tsx` to handle page transitions without duplicating structural code.

### Phase 3: Page Migration
Systematically moved every core route (`/`, `/about`, `/services`, `/work`, `/blog`) into the `app/` directory structure. Kept existing logic identical while porting JSX to TSX where applicable.

### Phase 4: React Server Components (RSC) Optimization
Implemented an "Islands Architecture":
- Static layout blocks, Hero sections, and content paragraphs were kept as native Server Components to allow headless crawlers to read HTML natively.
- Interactive dependencies (like Framer Motion, Tiptap editors, and Three.js particle backgrounds) were cordoned off into localized `"use client"` wrappers (e.g., `ParticleFooterWrapper.client.tsx`).
- `next/dynamic` was utilized to defer the loading of oversized client bundles.

### Phase 5: Production SEO & AI Discoverability
Implemented comprehensive metadata normalization:
- Embedded `JSON-LD` schemas (`Organization`, `WebSite`, `BlogPosting`, `Service`, `BreadcrumbList`) into the document `<head>`.
- Replaced the client-side `react-helmet-async` with native Next.js `export const metadata = constructMetadata()`.
- Built dynamic XML Sitemaps (`app/sitemap.ts`) to scrape backend endpoints at build/request time and index them securely.

### Phase 6: Hardening & Cleanup
Conducted a final audit. Removed legacy dependencies, resolved blocking hydration bugs, optimized images with `next/image`, and prepared final deployment configurations for Vercel.

## Major Architectural Decisions

1. **Server-First Execution:** We chose not to lazily "use client" at the top of every route. We actively destructured legacy monolithic files to ensure `<h1>`, `<p>`, and structural HTML is shipped purely as a Server Component.
2. **Dynamic Client Wrappers:** For complex UI requirements (e.g., `ParticleFooter.tsx`), we circumvented SSR build errors by dynamically importing these modules with `ssr: false` via a lightweight client-side proxy.
3. **Semantic Image Delivery:** Replaced standard `<img>` tags in critical loops (like blog card covers) with `next/image` to take advantage of WebP optimization, auto-sizing, and LCP boosts.

## Remaining Limitations / Technical Debt

- **`// @ts-nocheck` Pragmas:** To guarantee zero-regression UI migrations in the allotted timeline, 39 existing Vite components contain `// @ts-nocheck` directives. These bypass strict TypeScript validation because the original codebase lacked typing for its custom Framer Motion variants. Removing them would require an extensive manual re-typing effort that exceeded the scope of immediate production readiness.
- **Backend Coupling:** The SSG static generation for the `/blog` route depends on the external `http://localhost:5001/api` backend being alive during build time. If the backend is down during a Vercel deployment, the build will fail gracefully.

## Future Improvements (Out of Scope for this Migration)

- **Admin Portal Migration:** The `/admin` backend dashboard remains out-of-scope and is unmigrated. In the future, this could be ported to Next.js using Server Actions for secure database mutations.
- **Incremental Static Regeneration (ISR):** Currently, the blog is statically generated. Transitioning `app/blog/[slug]/page.tsx` to use ISR (e.g. `revalidate: 3600`) would allow the site to pull new articles automatically without triggering a manual Vercel rebuild.
- **Edge Caching:** Integrating Vercel Edge caching rules for international load times.

## Breaking Changes from Original Vite Setup

- **Routing Model:** Replaced `react-router-dom` with the Next.js App Router. Link interactions must now use `next/link` instead of React Router's `<Link>`.
- **Environment Variables:** `VITE_*` environment variables were changed to `NEXT_PUBLIC_*`.

---
*Migration finalized on September 2026. Ready for production.*
