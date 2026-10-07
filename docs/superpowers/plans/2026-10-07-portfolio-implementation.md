# Rizkillah Ramanda Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade, anti-AI-slop personal developer portfolio and platform for Rizkillah Ramanda Sinyo with Next.js App Router, modular monolith architecture, pnpm, Deep Navy monochrome theme, i18n, Supabase hybrid-ready data, developer stats dashboard, and an admin management portal for projects and certificates.

**Architecture:** Feature-Driven Modular Monolith separating reusable UI primitives (`src/common/*`), domain features (`src/modules/*`), data clients and fallback services (`src/services/*`), and App Router pages (`src/app/[locale]/*`).

**Tech Stack:** Next.js 14/15, TypeScript, Tailwind CSS, pnpm, next-intl, @supabase/supabase-js, Framer Motion, Lucide React / React Icons, Canvas API.

**Spec:** [docs/superpowers/specs/2026-10-07-portfolio-design.md](file:///D:/Ngoding%20bro/Fullstack/Portofolio/docs/superpowers/specs/2026-10-07-portfolio-design.md)

## Global Constraints
- Package manager: `pnpm` exclusively.
- Color aesthetic: Deep Navy / Midnight monochrome with ice-blue accents (`#070A12`, `#0B1120`, `#38BDF8`), clean slate light mode (`#F8FAFC`). No generic neon AI slop.
- Non-blocking, lightweight performance: Zero runtime crash when Supabase credentials are not yet configured (Hybrid Ready fallback).
- Multi-language: Supported in Indonesian (`id`) and English (`en`).
- Granular commits: Commit each task independently with conventional commit messages.

---

### Task 1: Scaffolding Project with pnpm, Next.js, and TypeScript

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `.gitignore`, `pnpm-lock.yaml`

**Interfaces:**
- Produces: Base executable Next.js project with `pnpm dev` and `pnpm build` support.

- [ ] **Step 1: Initialize Next.js app in the current directory with pnpm**
Run: `pnpm create next-app . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm`
- [ ] **Step 2: Verify package.json scripts and dependencies**
Run: `pnpm --version`
- [ ] **Step 3: Test base build**
Run: `pnpm build`
- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "chore: scaffold Next.js application with TypeScript and Tailwind CSS using pnpm"
```

---

### Task 2: Design System Theme Tokens & Configuration

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Create: `.env.example`

**Interfaces:**
- Produces: Tailwind color tokens (`navy-950`, `navy-900`, `navy-800`, `accent-blue`, `slate-card`), custom border utilities, and font setup.

- [ ] **Step 1: Configure tailwind.config.ts with Deep Navy & Electric Blue palette**
Define palette tokens:
```typescript
colors: {
  navy: {
    950: '#070A12',
    900: '#0B1120',
    850: '#0E172B',
    800: '#131C31',
    700: '#1E293B',
  },
  accent: {
    blue: '#38BDF8',
    cyan: '#0EA5E9',
    glow: 'rgba(56, 189, 248, 0.15)',
  }
}
```
- [ ] **Step 2: Update src/app/globals.css with clean anti-aliasing and scrollbar styling**
- [ ] **Step 3: Create .env.example with placeholders for NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and ADMIN_SECRET_KEY**
- [ ] **Step 4: Verify style build with `pnpm build`**
- [ ] **Step 5: Commit**
```bash
git add tailwind.config.ts src/app/globals.css .env.example
git commit -m "feat(styles): configure deep navy monochrome color tokens and base css"
```

---

### Task 3: Core Types & Authentic Fallback Data Layer

**Files:**
- Create: `src/types/index.ts`
- Create: `src/services/data/mock-projects.ts`
- Create: `src/services/data/mock-achievements.ts`
- Create: `src/services/data/mock-profile.ts`

**Interfaces:**
- Produces: TypeScript interfaces (`Project`, `Achievement`, `Profile`, `DashboardStats`, `ChatMessage`) and data for Rizkillah Ramanda (Universitas Riau, Pantau-Pangan-PKU, React Redux, HAR classification, Personal-Notes).

- [ ] **Step 1: Write `src/types/index.ts` defining all entities**
- [ ] **Step 2: Create authentic data in `src/services/data/` for projects, achievements, and developer profile**
- [ ] **Step 3: Verify TypeScript compilation**
Run: `pnpm exec tsc --noEmit`
- [ ] **Step 4: Commit**
```bash
git add src/types/ src/services/data/
git commit -m "feat(core): define data interfaces and authentic fallback datasets"
```

---

### Task 4: UI Primitives & Custom Spotlight Hover Card

**Files:**
- Create: `src/common/components/SpotlightCard.tsx`
- Create: `src/common/components/Badge.tsx`
- Create: `src/common/components/Button.tsx`
- Create: `src/common/components/Container.tsx`
- Create: `src/common/components/ThemeToggle.tsx`
- Create: `src/common/hooks/useSpotlight.ts`

**Interfaces:**
- Produces: `SpotlightCard` with interactive mouse radial gradient glow on hover, clean button variants, and responsive layout containers.

- [ ] **Step 1: Install `lucide-react` and `framer-motion` via pnpm**
Run: `pnpm add lucide-react framer-motion clsx tailwind-merge`
- [ ] **Step 2: Implement `useSpotlight` and `SpotlightCard` with radial gradient coordinates**
- [ ] **Step 3: Implement `Button`, `Badge`, `ThemeToggle`, and `Container`**
- [ ] **Step 4: Verify compilation with `pnpm exec tsc --noEmit`**
- [ ] **Step 5: Commit**
```bash
git add src/common/ package.json pnpm-lock.yaml
git commit -m "feat(common): build spotlight hover card and core UI primitives"
```

---

### Task 5: Internationalization (i18n) Setup with next-intl

**Files:**
- Create: `messages/en.json`
- Create: `messages/id.json`
- Create: `src/i18n/request.ts`
- Create: `src/i18n/routing.ts`
- Create: `src/middleware.ts`
- Modify: `next.config.mjs`

**Interfaces:**
- Produces: Next.js localized routing (`/en/*`, `/id/*`) with translations for navigation, hero, about, projects, dashboard, and contact.

- [ ] **Step 1: Install `next-intl` via pnpm**
Run: `pnpm add next-intl`
- [ ] **Step 2: Configure `next.config.mjs` with next-intl plugin**
- [ ] **Step 3: Create `messages/en.json` and `messages/id.json` with translations**
- [ ] **Step 4: Setup `src/i18n/routing.ts`, `src/i18n/request.ts`, and `src/middleware.ts`**
- [ ] **Step 5: Verify build with `pnpm build`**
- [ ] **Step 6: Commit**
```bash
git add messages/ src/i18n/ src/middleware.ts next.config.mjs package.json pnpm-lock.yaml
git commit -m "feat(i18n): setup next-intl localization routing and dictionary files"
```

---

### Task 6: Master Layout, Navbar & Footer

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/common/layouts/Navbar.tsx`
- Create: `src/common/layouts/Footer.tsx`
- Create: `src/common/components/LocaleSwitcher.tsx`

**Interfaces:**
- Produces: Responsive glassmorphism navigation bar with blur, route indicators, language selector, theme toggle, and copyright footer.

- [ ] **Step 1: Implement `Navbar.tsx` with mobile slide drawer and desktop nav items**
- [ ] **Step 2: Implement `LocaleSwitcher.tsx` switching between Indonesian and English**
- [ ] **Step 3: Implement `Footer.tsx` with social links and live status**
- [ ] **Step 4: Wire layout in `src/app/[locale]/layout.tsx`**
- [ ] **Step 5: Commit**
```bash
git add src/app/\[locale\]/layout.tsx src/common/layouts/ src/common/components/LocaleSwitcher.tsx
git commit -m "feat(layout): implement responsive navbar, locale switcher, and footer"
```

---

### Task 7: Interactive Ambient Canvas Background

**Files:**
- Create: `src/common/components/InteractiveCanvas.tsx`

**Interfaces:**
- Produces: Lightweight, GPU-accelerated constellation / node network canvas that reacts softly to mouse movements without impacting frame rate or CPU.

- [ ] **Step 1: Implement `InteractiveCanvas.tsx` using HTML5 Canvas API and `requestAnimationFrame`**
- [ ] **Step 2: Integrate into `src/app/[locale]/layout.tsx` as subtle ambient layer**
- [ ] **Step 3: Verify performance with `pnpm build`**
- [ ] **Step 4: Commit**
```bash
git add src/common/components/InteractiveCanvas.tsx src/app/\[locale\]/layout.tsx
git commit -m "feat(canvas): add subtle interactive geometric node canvas background"
```

---

### Task 8: Home Module & Landing Page

**Files:**
- Create: `src/modules/home/Hero.tsx`
- Create: `src/modules/home/TechStack.tsx`
- Create: `src/modules/home/FeaturedProjects.tsx`
- Create: `src/modules/home/QuickStats.tsx`
- Create: `src/app/[locale]/page.tsx`

**Interfaces:**
- Produces: Homepage with Rizkillah Ramanda's introduction, available status indicator, animated tech stack strip, quick stats counter, and featured projects highlight.

- [ ] **Step 1: Build `Hero.tsx` with name, role, University tag, and contact CTAs**
- [ ] **Step 2: Build `TechStack.tsx` with marquee / grid of tools (React, Next.js, Redux, TypeScript, Tailwind, Python, Supabase)**
- [ ] **Step 3: Build `FeaturedProjects.tsx` using `SpotlightCard`**
- [ ] **Step 4: Assemble `src/app/[locale]/page.tsx`**
- [ ] **Step 5: Commit**
```bash
git add src/modules/home/ src/app/\[locale\]/page.tsx
git commit -m "feat(home): build landing page with hero, tech stack, and featured projects"
```

---

### Task 9: About Module & Education Timeline

**Files:**
- Create: `src/modules/about/CareerJourney.tsx`
- Create: `src/modules/about/Education.tsx`
- Create: `src/modules/about/SkillsMatrix.tsx`
- Create: `src/app/[locale]/about/page.tsx`

**Interfaces:**
- Produces: `/about` page highlighting Rizkillah Ramanda's journey at Universitas Riau, categorized skill groups, and engineering philosophy.

- [ ] **Step 1: Create `Education.tsx` highlighting Informatics Engineering, Universitas Riau**
- [ ] **Step 2: Create `SkillsMatrix.tsx` with frontend, backend, tools, and ML categories**
- [ ] **Step 3: Create `src/app/[locale]/about/page.tsx`**
- [ ] **Step 4: Commit**
```bash
git add src/modules/about/ src/app/\[locale\]/about/
git commit -m "feat(about): create biography, education timeline, and skill matrix"
```

---

### Task 10: Projects Showcase Module with Filter Tabs

**Files:**
- Create: `src/modules/projects/ProjectsFilter.tsx`
- Create: `src/modules/projects/ProjectCard.tsx`
- Create: `src/modules/projects/ProjectModal.tsx`
- Create: `src/app/[locale]/projects/page.tsx`

**Interfaces:**
- Produces: `/projects` page with category filters (All, Fullstack, Frontend, ML/AI), search bar, live preview modal, and links to GitHub repositories.

- [ ] **Step 1: Implement `ProjectCard.tsx` with tags, live demo button, and GitHub button**
- [ ] **Step 2: Implement `ProjectsFilter.tsx` with active pill state**
- [ ] **Step 3: Implement `ProjectModal.tsx` for expanded project details**
- [ ] **Step 4: Assemble `src/app/[locale]/projects/page.tsx`**
- [ ] **Step 5: Commit**
```bash
git add src/modules/projects/ src/app/\[locale\]/projects/
git commit -m "feat(projects): create filterable project showcase with detail modals"
```

---

### Task 11: Developer Dashboard & Live Metrics

**Files:**
- Create: `src/modules/dashboard/GitHubStats.tsx`
- Create: `src/modules/dashboard/WakatimeStats.tsx`
- Create: `src/modules/dashboard/MetricsCard.tsx`
- Create: `src/app/[locale]/dashboard/page.tsx`
- Create: `src/app/api/github/route.ts`
- Create: `src/app/api/wakatime/route.ts`

**Interfaces:**
- Produces: `/dashboard` page visualizing GitHub activity (public repos, stars, followers for `@Diki04`) and Wakatime coding hours with fallback data when offline.

- [ ] **Step 1: Create `/api/github/route.ts` fetching GitHub profile metrics with caching**
- [ ] **Step 2: Create `/api/wakatime/route.ts` with coding stats and language distribution**
- [ ] **Step 3: Implement dashboard UI cards in `src/modules/dashboard/`**
- [ ] **Step 4: Assemble `src/app/[locale]/dashboard/page.tsx`**
- [ ] **Step 5: Commit**
```bash
git add src/app/api/github/ src/app/api/wakatime/ src/modules/dashboard/ src/app/\[locale\]/dashboard/
git commit -m "feat(dashboard): build developer analytics with github and wakatime metrics"
```

---

### Task 12: Achievements & Certifications Module

**Files:**
- Create: `src/modules/achievements/CertificateCard.tsx`
- Create: `src/modules/achievements/CertificateModal.tsx`
- Create: `src/app/[locale]/achievements/page.tsx`

**Interfaces:**
- Produces: `/achievements` page showcasing verified certificates, issuers, credential links, and modal preview.

- [ ] **Step 1: Create `CertificateCard.tsx` with verification badge and issuer info**
- [ ] **Step 2: Create `CertificateModal.tsx` for certificate viewing**
- [ ] **Step 3: Assemble `src/app/[locale]/achievements/page.tsx`**
- [ ] **Step 4: Commit**
```bash
git add src/modules/achievements/ src/app/\[locale\]/achievements/
git commit -m "feat(achievements): create certificate showcase with verification links"
```

---

### Task 13: Supabase Client & Hybrid Data Provider

**Files:**
- Create: `src/services/supabase/client.ts`
- Create: `src/services/supabase/dataProvider.ts`
- Create: `supabase/schema.sql`

**Interfaces:**
- Produces: Safe Supabase client that queries Supabase when keys exist, or falls back to local data gracefully. Provides SQL migration script for tables (`projects`, `achievements`, `messages`).

- [ ] **Step 1: Install `@supabase/supabase-js` via pnpm**
Run: `pnpm add @supabase/supabase-js`
- [ ] **Step 2: Implement `src/services/supabase/client.ts` with environment check**
- [ ] **Step 3: Implement `src/services/supabase/dataProvider.ts` with hybrid getter & updater**
- [ ] **Step 4: Create `supabase/schema.sql` for easy table creation in Supabase dashboard**
- [ ] **Step 5: Commit**
```bash
git add src/services/supabase/ supabase/ package.json pnpm-lock.yaml
git commit -m "feat(supabase): create hybrid data provider and postgres sql schema"
```

---

### Task 14: Interactive Guestbook / Chat Module

**Files:**
- Create: `src/modules/chat/ChatFeed.tsx`
- Create: `src/modules/chat/ChatForm.tsx`
- Create: `src/app/[locale]/chat/page.tsx`
- Create: `src/app/api/chat/route.ts`

**Interfaces:**
- Produces: `/chat` page allowing visitors to leave comments and greetings with real-time feedback.

- [ ] **Step 1: Implement `/api/chat/route.ts` for GET and POST messages**
- [ ] **Step 2: Implement `ChatForm.tsx` and `ChatFeed.tsx`**
- [ ] **Step 3: Assemble `src/app/[locale]/chat/page.tsx`**
- [ ] **Step 4: Commit**
```bash
git add src/app/api/chat/ src/modules/chat/ src/app/\[locale\]/chat/
git commit -m "feat(chat): implement interactive guestbook chat feed and posting"
```

---

### Task 15: Contact Module & Social Network Hub

**Files:**
- Create: `src/modules/contact/ContactForm.tsx`
- Create: `src/modules/contact/SocialLinks.tsx`
- Create: `src/app/[locale]/contact/page.tsx`

**Interfaces:**
- Produces: `/contact` page with direct email contact, social links (LinkedIn, GitHub), and form submission feedback.

- [ ] **Step 1: Implement `ContactForm.tsx` with email and message inputs**
- [ ] **Step 2: Implement `SocialLinks.tsx` with copy-to-clipboard for email**
- [ ] **Step 3: Assemble `src/app/[locale]/contact/page.tsx`**
- [ ] **Step 4: Commit**
```bash
git add src/modules/contact/ src/app/\[locale\]/contact/
git commit -m "feat(contact): implement contact form and social network connectivity"
```

---

### Task 16: Admin Management Portal (CRUD for Projects & Certificates)

**Files:**
- Create: `src/modules/admin/AdminLogin.tsx`
- Create: `src/modules/admin/ProjectManager.tsx`
- Create: `src/modules/admin/CertificateManager.tsx`
- Create: `src/app/[locale]/admin/page.tsx`
- Create: `src/app/api/admin/projects/route.ts`
- Create: `src/app/api/admin/achievements/route.ts`

**Interfaces:**
- Produces: Passcode-protected `/admin` portal allowing Rizkillah to add, edit, and delete portfolio projects and certificates with image upload and live preview.

- [ ] **Step 1: Create passcode authentication check for admin access**
- [ ] **Step 2: Build `ProjectManager.tsx` with create, edit, delete, and tag management**
- [ ] **Step 3: Build `CertificateManager.tsx` with credential link and issuer editor**
- [ ] **Step 4: Assemble `src/app/[locale]/admin/page.tsx`**
- [ ] **Step 5: Commit**
```bash
git add src/modules/admin/ src/app/\[locale\]/admin/ src/app/api/admin/
git commit -m "feat(admin): build admin management portal for projects and certificates"
```

---

### Task 17: Custom Error Pages & 404 / 500 Recovery

**Files:**
- Create: `src/app/[locale]/not-found.tsx`
- Create: `src/app/[locale]/error.tsx`

**Interfaces:**
- Produces: Polished 404 Not Found page with return-to-home button and 500 error boundary with reset action.

- [ ] **Step 1: Implement `src/app/[locale]/not-found.tsx` with aesthetic glitch / terminal styling**
- [ ] **Step 2: Implement `src/app/[locale]/error.tsx` with retry capability**
- [ ] **Step 3: Commit**
```bash
git add src/app/\[locale\]/not-found.tsx src/app/\[locale\]/error.tsx
git commit -m "feat(error): implement polished 404 not found and 500 error boundaries"
```

---

### Task 18: Verification, Production Build & Documentation

**Files:**
- Create: `README.md`
- Verify: `pnpm build` output and zero lint warnings

**Interfaces:**
- Produces: Clean production build and comprehensive README detailing features, Supabase setup, and commands.

- [ ] **Step 1: Run production build `pnpm build` and verify all routes compile**
- [ ] **Step 2: Update `README.md` with features, architecture, screenshots guide, and environment setup**
- [ ] **Step 3: Commit**
```bash
git add README.md
git commit -m "docs: create comprehensive documentation and project setup guide"
```
