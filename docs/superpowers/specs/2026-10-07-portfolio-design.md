# Design Specification: Rizkillah Ramanda Portfolio (rizkillahramanda.my.id)

**Author:** Antigravity & Rizkillah Ramanda Sinyo  
**Date:** 2026-10-07  
**Status:** Approved  
**Architecture:** Feature-Driven Modular Monolith  
**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, pnpm, next-intl, Supabase, Framer Motion, Canvas/Three.js  

---

## 1. Executive Summary & Goals

The goal of this project is to create a high-performance, aesthetically refined personal portfolio and developer platform for **Rizkillah Ramanda Sinyo (Diki)**, an Informatics Engineering student at Universitas Riau.

Key principles:
- **Anti-AI Slop Design**: Tailored visual identity with a refined Deep Navy & Electric Blue monochrome palette, crisp micro-borders, and tactile interactions rather than generic templates or exaggerated neon gradients.
- **Clean Modular Monolith**: High cohesion, low coupling structure (`src/modules/*`, `src/common/*`, `src/services/*`).
- **Feature Completeness matching reference (`satriabahari.my.id`)**:
  - Full developer dashboard (GitHub activity, Wakatime stats, coding hours).
  - Multi-language support (English & Indonesian) powered by `next-intl`.
  - Filterable project showcase with live demo links and tech tags.
  - Interactive guestbook/chat powered by Supabase.
  - Achievements and certifications showcase.
  - Technical contents / blog articles section.
  - Custom error pages (`not-found.tsx`, `error.tsx`).
  - Custom cursor spotlight card interactions and an interactive geometric node background.
- **Hybrid-Ready Supabase Integration**: Ships with rich local fallback data so the site runs smoothly out of the box with zero runtime errors, and seamlessly synchronizes with Supabase once environment keys are configured.
- **Granular Git Commits**: Commits are created incrementally at every logical step with conventional commit messages to maintain a comprehensive project history.

---

## 2. Architecture & Directory Layout

```text
/
├── .env.example
├── .gitignore
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── messages/
│   ├── en.json
│   └── id.json
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── projects/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── achievements/page.tsx
│   │   │   ├── contents/page.tsx
│   │   │   ├── chat/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── error.tsx
│   │   └── api/
│   │       ├── github/route.ts
│   │       ├── wakatime/route.ts
│   │       └── chat/route.ts
│   ├── common/
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── SpotlightCard.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── LocaleSwitcher.tsx
│   │   │   └── Badge.tsx
│   │   ├── layouts/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   └── hooks/
│   │       └── useSpotlight.ts
│   ├── modules/
│   │   ├── home/
│   │   ├── about/
│   │   ├── projects/
│   │   ├── dashboard/
│   │   ├── achievements/
│   │   ├── contents/
│   │   ├── chat/
│   │   └── contact/
│   ├── services/
│   │   ├── supabase/
│   │   ├── github/
│   │   └── wakatime/
│   └── types/
│       └── index.ts
```

---

## 3. Visual & Interaction Design System

### 3.1 Color Tokens
- **Dark Mode**:
  - Background Base: `#070A12`
  - Background Surface: `#0B1120`
  - Background Elevated / Card: `#111827`
  - Border: `rgba(255, 255, 255, 0.08)`
  - Accent Cyan/Blue: `#38BDF8` & `#60A5FA`
  - Text Primary: `#F8FAFC`
  - Text Secondary: `#94A3B8`
- **Light Mode**:
  - Background Base: `#F8FAFC`
  - Background Surface: `#FFFFFF`
  - Background Elevated / Card: `#F1F5F9`
  - Border: `rgba(0, 0, 0, 0.08)`
  - Accent Blue: `#2563EB`
  - Text Primary: `#0F172A`
  - Text Secondary: `#64748B`

### 3.2 Micro-Interactions
- **Spotlight Cards**: Mouse cursor dynamically positions a radial gradient highlight on card borders (`background: radial-gradient(circle at x y, rgba(56,189,248,0.2), transparent 40%)`).
- **Interactive Geometric Canvas**: Subtle connected nodes in the background responding gently to cursor velocity and proximity, strictly non-blocking.
- **Spring Transitions**: Smooth tab switches and route highlights with Framer Motion.

---

## 4. Data Layer & Integrations

1. **Supabase Client**:
   - Connection initialized with fallback safety.
   - Tables: `projects`, `guestbook_messages`.
   - Fallback dataset: Preloaded with authentic information from Rizkillah Ramanda's profile (e.g., Pantau-Pangan-PKU, React Redux app, Personal-Notes, HAR deep learning).
2. **GitHub API Integration**:
   - Fetches repository count, stars, and contribution metrics for `@Diki04`.
3. **Wakatime Integration**:
   - Reads coding time breakdown by language and daily totals.
4. **i18n System**:
   - Full dictionary translation in Indonesian and English for all routes.

---

## 5. Security & Performance
- Zero client-side leak of secrets (service keys remain server-side).
- Image optimization using Next.js `<Image />` with allowed remote patterns.
- Fast compile and hot-reload times managed with `pnpm`.
- Complete SEO metadata & OpenGraph tags for search engine discoverability.
