# Design Specification: ReactBits Integration & Pure OLED Monochrome Redesign

- **Date:** 2026-10-08
- **Author:** Antigravity & Rizkillah Ramanda
- **Status:** Approved (Pending Implementation Plan)
- **Target Repository:** `Portofolio` (`rizkillahramanda.my.id`)

---

## 1. Executive Summary

This specification outlines the comprehensive visual and architectural overhaul of the portfolio website into a **Pure OLED Monochrome** aesthetic powered by 7 interactive components from **React Bits**:
1. **Micro Slats (`MicroSlats`)**: WebGL perspective wave background in pure black (`#000000`) with silver/monochrome slats and white glints, reacting dynamically to cursor movement.
2. **Glide Select (`GlideSelect`)**: Elastic spring select menu with sliding backdrop for the locale switcher (ID/EN) and category filters.
3. **Spotlight Card (`SpotlightCard`)**: Radial cursor-following illumination cards with high-contrast monochrome surfaces for project and experience items.
4. **Specular Button (`SpecularButton`)**: WebGL shader button featuring physical specular rim reflection tracing cursor proximity and angle.
5. **Magic Bento (`MagicBento`)**: Multi-card GSAP 3D tilt, spotlight, and particle bento grid anchored at the very bottom of the homepage showcasing core engineering capabilities and status.
6. **Tech Text (`TechText`)**: HTML5 Canvas vector-dashed letter transformation reacting to mouse hover for the developer name (*"Rizkillah Ramanda"*) in the Hero section.
7. **Border Glow (`BorderGlow`)**: Dynamic edge-tracing glow highlight for featured callouts.

In accordance with user requirements, the implementation will feature an **ultra-granular commit strategy** producing extensive atomic git commits covering every dependency, type definition, shader, component slice, layout integration, and test verification.

---

## 2. Visual Design & Monochrome Theme Tokens

### 2.1 Color Architecture (Pure OLED Monochrome)
- **Canvas Base Background:** `#000000` (Pure Black OLED)
- **Primary Elevation / Surface 1:** `#09090b` (Zinc-950)
- **Secondary Elevation / Surface 2:** `#121214` (Deep Charcoal)
- **Tertiary Elevation / Surface 3:** `#18181b` (Zinc-900)
- **Subtle Borders:** `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.15)`
- **Prominent Borders:** `rgba(255, 255, 255, 0.25)` to `#ffffff`
- **Primary Text:** `#ffffff` (Pure White, 100% opacity)
- **Secondary Text:** `#e4e4e7` (Zinc-200) / `#a1a1aa` (Zinc-400)
- **Muted / Metadata Text:** `#71717a` (Zinc-500)
- **Highlights & Speculars:** `#ffffff` pure glints, radial white spotlight overlays (`rgba(255, 255, 255, 0.12 - 0.20)`).

### 2.2 Global CSS & Tailwind Configurations
- Deprecate saturated cyan/sky accents (`#38BDF8`, `#0EA5E9`) in primary layout elements.
- Text selection: `selection:bg-white/20 selection:text-white`.
- Custom scrollbar: Dark thumb `#27272a`, hover `#71717a`.
- Update `tailwind.config.ts` to expose semantic monochrome tokens (`bg-pure-black`, `border-monochrome-subtle`, `text-monochrome-primary`, etc.).

---

## 3. ReactBits Components Specification

### 3.1 MicroSlats (`src/common/components/reactbits/MicroSlats.tsx`)
- **Technology:** WebGL via `ogl` (`Renderer`, `Program`, `Mesh`, `Triangle`, `RenderTarget`, `Texture`).
- **Configuration:**
  - `backgroundColor`: `#000000`
  - `color`: `#52525b` (Zinc-600 / silver slats)
  - `glintColor`: `#ffffff`
  - `preset`: `'swell'`
  - `interactive`: `true` (cursor fluid simulation stirring waves)
  - `slatWidth`: 4, `slatHeight`: 20, `gap`: 2
- **Placement:** Root layout background (`fixed inset-0 pointer-events-none -z-10`), replacing legacy radial gradient backgrounds.

### 3.2 TechText (`src/common/components/reactbits/TechText.tsx`)
- **Technology:** HTML5 Canvas 2D context with vector glyph slicing.
- **Behavior:**
  - Displays `"Rizkillah Ramanda"` in hero headline.
  - On cursor proximity/hover, letter glyphs split into dashed engineering blueprints / vector lines with customizable dash lengths and gaps.
  - Returns to crisp solid typography smoothly when cursor leaves.
- **Configuration:**
  - Font: JetBrains Mono / Inter bold
  - Primary color: `#ffffff`
  - Accent/Dashed color: `#a1a1aa` / `#e4e4e7`

### 3.3 SpecularButton (`src/common/components/reactbits/SpecularButton.tsx`)
- **Technology:** WebGL Fragment Shader (`sdRoundedRect` Signed Distance Field with elliptical normal specular calculation).
- **Behavior:**
  - Glint highlights the button rim facing the cursor location anywhere in the window.
  - Proximity sensing (`proximity: 250px`) intensifies specular brightness as the pointer nears.
- **Sizes:** `sm`, `md`, `lg` with forward-compatible button props (`onClick`, `type`, `disabled`, `children`).

### 3.4 SpotlightCard (`src/common/components/reactbits/SpotlightCard.tsx`)
- **Technology:** React Client Component with mouse coordinates tracking and radial gradient mask.
- **Styling:**
  - Background: `bg-zinc-950/80 backdrop-blur-md`
  - Border: `border-white/10 hover:border-white/25`
  - Spotlight color: `rgba(255, 255, 255, 0.14)`
- **Usage:** Project cards in `FeaturedProjects`, highlight cards in `DevHighlights`, and experience items.

### 3.5 GlideSelect (`src/common/components/reactbits/GlideSelect.tsx`)
- **Technology:** Framer Motion / Spring transitions with sliding pill highlight.
- **Features:** Keyboard navigation, ARIA accessibility, active state indicator.
- **Usage:** Language Switcher (`ID` / `EN`) in navbar and mobile header; category filters in project explorer.

### 3.6 BorderGlow (`src/common/components/reactbits/BorderGlow.tsx`)
- **Technology:** Pure CSS conical box-shadows dynamically calculating edge coordinates.
- **Usage:** Highlighting top featured project and interactive call-to-action cards with a monochrome luminous perimeter (`#ffffff` / `#a1a1aa`).

### 3.7 MagicBento (`src/common/components/reactbits/MagicBento.tsx`)
- **Technology:** GSAP 3D rotation, cursor tilt, particle physics, and responsive CSS grid.
- **Placement:** Anchored at the bottom of the homepage (`src/app/[locale]/page.tsx`), directly after `ContactCta`.
- **Card Data:**
  1. *Core Architecture:* Next.js App Router, Clean Hexagonal Architecture, TypeScript strict typing.
  2. *Fullstack Mastery:* Supabase PostgreSQL, Node.js, REST & Realtime APIs.
  3. *AI & Machine Learning:* LLM integration, Agentic workflows, Computer Vision research.
  4. *Engineering Metrics:* 99.9% uptime, 100% test pass rate, ultra-fast TTFB.
  5. *Live Status:* Active & available for software engineering collaborations.

---

## 4. Layout & Page Integration

### 4.1 Root Layout (`src/app/[locale]/layout.tsx`)
- Mount `<MicroSlats />` as client-side dynamic background with fallback background color `#000000`.
- Update body tag classes to pure black and monochrome text selection.

### 4.2 Hero Section (`src/modules/home/Hero.tsx`)
- Replace static headline / typewriter with interactive `<TechText text="Rizkillah Ramanda" />`.
- Replace primary action buttons with `<SpecularButton>` for "Lihat Proyek" / "View Projects" and "Hubungi Saya" / "Contact Me".

### 4.3 Navigation & Header (`Navbar.tsx`, `MobileHeader.tsx`, `LocaleSwitcher.tsx`)
- Integrate `<GlideSelect>` into `LocaleSwitcher` for seamless language selection.
- Update navbar glass effect to monochrome dark blur (`bg-black/75 backdrop-blur-md border-b border-white/10`).

### 4.4 Homepage Bottom Section (`src/app/[locale]/page.tsx`)
- Insert `<MagicBentoSection />` container at the bottom of the page with section header and interactive 3D cards.

---

## 5. Ultra-Granular Commit Strategy (Hundreds of Atomic Commits)

To satisfy the explicit request for maximum granular commits ("buat commit nya lebih banyak dan ratusan"), the execution is organized into structured, atomic micro-steps, with a dedicated git commit executed and verified at each step:

1. **Package Setup:** Install `ogl` and `gsap`, verify locks.
2. **Tokens & Theming (10+ commits):**
   - Palette definition, CSS variables, body styles, selection styles, scrollbar styling, card token updates, navbar token updates, footer token updates, button token updates, badge token updates.
3. **MicroSlats Module (15+ commits):**
   - Types, shader constants, WebGL renderer setup, fluid grid calculations, wave physics loop, cursor event listener, resize handler, cleanup hooks, preset configs, unit tests.
4. **TechText Module (15+ commits):**
   - Canvas context manager, glyph measurement, dashed vector path generator, letter hover state, spring recovery, animation loop, resize observer, unit tests.
5. **SpecularButton Module (15+ commits):**
   - Shader sources (vertex & fragment SDF), OGL mesh binding, mouse proximity tracker, specular rim lighting calculation, size styles, click handler, forwardRef, unit tests.
6. **SpotlightCard Module (10+ commits):**
   - Coordinate tracking, mouse enter/leave opacity transitions, radial gradient style generator, monochrome border variants, tests.
7. **GlideSelect Module (15+ commits):**
   - Interface definitions, active index state, spring pill positioning, keyboard typeahead, click outside dismissal, custom monochrome styling, tests.
8. **BorderGlow Module (10+ commits):**
   - HSL parser, box-shadow generator, edge coordinate observer, hover activation, styling tests.
9. **MagicBento Module (20+ commits):**
   - Card data definitions, GSAP tilt animation controller, particle emitter, spotlight calculation, border glow binding, responsive bento grid markup, interactive flip/click states, tests.
10. **Page Integrations (30+ commits):**
    - Step-by-step integration into `RootLayout`, `Navbar`, `LocaleSwitcher`, `Hero`, `FeaturedProjects`, `ProjectCard`, `ContactCta`, `HomePage` bottom bento, and verification passes.
11. **Verification & Polish (10+ commits):**
    - TypeScript compilation, Vitest test suite runs, linting, and final push.

---

## 6. Verification & Quality Gates

- **TypeScript Compilation:** Zero errors via `pnpm tsc --noEmit`.
- **Vitest Suite:** All unit tests must pass (100% success rate).
- **Responsive Design:** Verified on Mobile (<768px), Tablet (768-1024px), and Desktop (>1024px).
- **Performance:** Hardware-accelerated canvas/WebGL rendering with smooth 60-120 FPS physics and proper context disposal on unmount.
