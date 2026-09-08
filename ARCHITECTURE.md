# LlamaCorp Architecture

## Overview

LlamaCorp uses **Next.js 15 App Router** with React Server Components (RSC) as the primary rendering strategy. The goal is to maximize static HTML delivery, minimize client-side JavaScript, and preserve a premium interactive experience through isolated Client Component "islands."

---

## Rendering Strategy

### Static Routes (○)
Pages where all content is known at build time:
- `/` — Homepage
- `/about`
- `/services`
- `/work`

These pages are pre-rendered to static HTML and served from Vercel's edge CDN with zero server compute at runtime.

### SSG Dynamic Routes (●)
Pages requiring data that could change:
- `/blog/[slug]` — Fetches blog posts at build time using `generateStaticParams`.  
  Falls back gracefully if the backend is unreachable during build (returns `[]`).

### Dynamic Server-Rendered (ƒ)
- `/blog` — Server-rendered on demand to always serve fresh blog listing, search, and category filters.

---

## Server vs Client Components

### Philosophy
> Every component is a **Server Component by default**. A component is only promoted to `"use client"` when it strictly requires browser APIs, React state, or interactive event handlers.

### Server Components (no `"use client"`)
These components render to static HTML, produce zero client JS, and are the majority of the codebase:

| Component | Reason |
|---|---|
| `Footer.tsx` | Pure HTML/CSS; gradient bars are CSS `@keyframes` |
| `AnimatedCTAContent.tsx` | Static markup; wraps in a lightweight `<FadeIn>` island |
| `HeroSection.tsx` (about) | Static text + image; uses CSS-based `<FadeIn>` |
| `ServicesGrid.tsx` (about) | Static cards with CSS hover; entry animations via `<FadeIn>` |
| `DarkFounderSection.tsx` | Uses `next/script lazyOnload` for Spline 3D; no state required |
| `StatsAndTestimonials.tsx` | Layout shell; delegates interactive rows to `.client.tsx` |
| All page files (`app/**/page.tsx`) | Server-rendered; data fetched in async components |

### Client Components (`"use client"`)
These components strictly require the browser:

| Component | Justification |
|---|---|
| `MagneticTopNavbar.tsx` | `window.addEventListener('scroll')` for show/hide on scroll |
| `FAQAccordion.tsx` | `useState` for open/close toggle + animated height |
| `ProjectDetail.tsx` | Framer Motion `layoutId` morphing requires shared client tree |
| `OriginButton.tsx` | `onMouseMove` for magnetic cursor effect |
| `PricingFeaturedCard.tsx` | `onMouseMove` for spotlight radial gradient |
| `WorkClient.tsx` | `AnimatePresence` + `LayoutGroup` for filtered gallery animations |
| `BlogSearchFilter.tsx` | `useRouter` to push URL params on search input change |
| `ShareButtons.tsx` | `navigator.clipboard` and `window.open` browser APIs |
| `HeroTestimonialCarousel.tsx` | Drag gesture tracking (touch/mouse) |
| `StatsAndTestimonials.client.tsx` | Infinite marquee + typewriter hover tooltip with `useState`/`useRef` |
| `ServicesClient.tsx` | Mobile accordion state for services page |

---

## Animation Architecture

All entry animations use a shared `<FadeIn>` Server-Compatible wrapper (`components/blog/FadeIn.tsx`). This is a minimal `"use client"` component that accepts `delay`, `duration`, and `yOffset` props and wraps its children in a `motion.div` with `whileInView`.

This pattern allows parent components to remain **Server Components** while still getting smooth viewport-triggered fade-in animations.

---

## Data Fetching

### Blog
- `lib/api/blog.ts` — Thin fetch wrapper. Uses `{ next: { revalidate: 60 } }` to serve cached responses and revalidate in the background.
- `generateStaticParams` in `/blog/[slug]/page.tsx` catches `ECONNREFUSED` gracefully and returns `[]` if the backend is offline during build.
- Blog listing (`/blog`) is dynamically server-rendered to support real-time search/filter via URL params.

### Projects / Static Data
- `data/projects.ts` — Fully static. No API dependency. Imported directly into Server/Client Components.

---

## SEO Architecture

All metadata is generated via Next.js native `generateMetadata` — no React Helmet or custom HTML rewriting.

| Feature | Implementation |
|---|---|
| Per-page titles | `generateMetadata` in each `page.tsx` |
| Open Graph | `metadata.openGraph` in each `page.tsx` |
| Twitter Cards | `metadata.twitter` in each `page.tsx` |
| JSON-LD Structured Data | Inline `<script type="application/ld+json">` in Server Components |
| Sitemap | `app/sitemap.ts` → auto-generates `/sitemap.xml` |
| robots.txt | `app/robots.ts` → auto-generates `/robots.txt` |
| Dynamic blog metadata | `generateMetadata` fetches per-article data at request time |
| Canonical URLs | Set via `metadata.alternates.canonical` |

---

## Security

Security headers are set globally in `vercel.json`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — disables camera, microphone, geolocation

Environment variables containing secrets must never be prefixed with `NEXT_PUBLIC_`. The only public variable is `NEXT_PUBLIC_API_URL`.

---

## Image Optimization

All images use `next/image` which provides:
- Automatic WebP/AVIF conversion
- Lazy loading by default
- Blur placeholder support
- Explicit `width` and `height` to prevent CLS

Remote image domains are allowlisted in `next.config.ts` under `images.remotePatterns`.
