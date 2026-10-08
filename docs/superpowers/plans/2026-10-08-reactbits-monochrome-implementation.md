# ReactBits & Pure OLED Monochrome Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 7 interactive components from React Bits (`MicroSlats`, `GlideSelect`, `SpotlightCard`, `SpecularButton`, `MagicBento`, `TechText`, `BorderGlow`) and transform the website theme into Pure OLED Monochrome (`#000000`, white highlights, silver neutrals), accompanied by an ultra-granular git commit history.

**Architecture:** Create dedicated modular components in `src/common/components/reactbits/`, integrate WebGL/canvas pipelines using `ogl` and animations via `gsap`, adapt core UI tokens in `tailwind.config.ts` and `globals.css`, and connect components across root layout, hero, navbar, projects, and the bottom homepage bento grid.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, WebGL (`ogl`), GSAP 3, Lucide Icons, Vitest.

**Spec:** [`docs/superpowers/specs/2026-10-08-reactbits-monochrome-design.md`](file:///D:/Ngoding%20bro/Fullstack/Portofolio/docs/superpowers/specs/2026-10-08-reactbits-monochrome-design.md)

## Global Constraints
- Target background is Pure OLED Black (`#000000`), with `#09090b` and `#121214` elevation surfaces.
- All 39 existing unit tests in `src/__tests__/` must remain 100% passing.
- TypeScript compiler check (`pnpm tsc --noEmit`) must exit with 0 errors.
- Every task must commit atomically to git immediately upon verification.

---

### Task 1: Dependencies Installation (`ogl` & `gsap`)

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

**Interfaces:**
- Produces: `ogl` exports (`Renderer`, `Program`, `Mesh`, `Triangle`, `Color`, `RenderTarget`, `Texture`), `gsap` exports (`gsap`).

- [ ] **Step 1: Install `ogl` and `gsap` dependencies**
Run: `pnpm add ogl gsap`

- [ ] **Step 2: Install type definitions if needed**
Run: `pnpm add -D @types/gsap` (or verify built-in types)

- [ ] **Step 3: Verify installation via TypeScript check**
Run: `pnpm tsc --noEmit`

- [ ] **Step 4: Commit**
```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): install ogl and gsap for reactbits WebGL and animations"
```

---

### Task 2: Pure OLED Monochrome Theme & Tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/common/layouts/AppShell.tsx`

**Interfaces:**
- Produces: Pure black background `#000000`, zinc elevation tokens, monochrome text selection, updated scrollbar colors.

- [ ] **Step 1: Update Tailwind configuration with OLED monochrome colors**
Update `tailwind.config.ts` with pure black `#000000`, neutral slate/zinc dark surfaces, and monochrome accents.

- [ ] **Step 2: Update `globals.css` with monochrome variables and selection styles**
Set `:root` and `.dark` variables to `#000000` base, white text, and `selection:bg-white/20 selection:text-white`.

- [ ] **Step 3: Update `AppShell.tsx` to use pure black backgrounds**
Update background classes from `dark:bg-navy-950` to `dark:bg-black`.

- [ ] **Step 4: Run tests & type check**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 5: Commit**
```bash
git add tailwind.config.ts src/app/globals.css src/common/layouts/AppShell.tsx
git commit -m "theme(tokens): switch global color palette to pure OLED monochrome"
```

---

### Task 3: MicroSlats Background Component (`MicroSlats.tsx`)

**Files:**
- Create: `src/common/components/reactbits/MicroSlats.tsx`
- Create: `src/common/components/reactbits/index.ts`
- Create: `src/__tests__/microSlats.test.ts`

**Interfaces:**
- Produces: `<MicroSlats backgroundColor="#000000" color="#52525b" glintColor="#ffffff" preset="swell" />`

- [ ] **Step 1: Write unit test for MicroSlats export and props**
Verify component imports and renders without throwing in test environment.

- [ ] **Step 2: Implement `MicroSlats.tsx`**
Implement the WebGL `ogl` perspective wave background with fluid cursor interaction, canvas auto-resizing, and context cleanup.

- [ ] **Step 3: Export in `src/common/components/reactbits/index.ts`**
Export `MicroSlats` and `MicroSlatsProps`.

- [ ] **Step 4: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 5: Commit**
```bash
git add src/common/components/reactbits/MicroSlats.tsx src/common/components/reactbits/index.ts src/__tests__/microSlats.test.ts
git commit -m "feat(reactbits): add MicroSlats WebGL wave background component"
```

---

### Task 4: TechText Vector Canvas Text Component (`TechText.tsx`)

**Files:**
- Create: `src/common/components/reactbits/TechText.tsx`
- Modify: `src/common/components/reactbits/index.ts`
- Create: `src/__tests__/techText.test.ts`

**Interfaces:**
- Produces: `<TechText text="Rizkillah Ramanda" color="#ffffff" accentColor="#a1a1aa" />`

- [ ] **Step 1: Write unit test for TechText**
Verify component renders canvas and responds to text props.

- [ ] **Step 2: Implement `TechText.tsx`**
Implement HTML5 canvas vector rendering where glyphs break down into dashed lines on pointer hover.

- [ ] **Step 3: Export from `reactbits/index.ts`**
Add export `TechText`.

- [ ] **Step 4: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 5: Commit**
```bash
git add src/common/components/reactbits/TechText.tsx src/common/components/reactbits/index.ts src/__tests__/techText.test.ts
git commit -m "feat(reactbits): add TechText interactive dashed vector text component"
```

---

### Task 5: SpecularButton WebGL Shader Button Component (`SpecularButton.tsx`)

**Files:**
- Create: `src/common/components/reactbits/SpecularButton.tsx`
- Modify: `src/common/components/reactbits/index.ts`
- Create: `src/__tests__/specularButton.test.ts`

**Interfaces:**
- Produces: `<SpecularButton size="md" radius={14} lineColor="#ffffff" baseColor="#3f3f46">Click</SpecularButton>`

- [ ] **Step 1: Write unit test for SpecularButton**
Verify component renders button element with children and handles click.

- [ ] **Step 2: Implement `SpecularButton.tsx`**
Implement WebGL SDF rounded rectangle shader with cursor-proximity specular highlight.

- [ ] **Step 3: Export from `reactbits/index.ts`**
Add export `SpecularButton`.

- [ ] **Step 4: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 5: Commit**
```bash
git add src/common/components/reactbits/SpecularButton.tsx src/common/components/reactbits/index.ts src/__tests__/specularButton.test.ts
git commit -m "feat(reactbits): add SpecularButton WebGL specular rim lighting button"
```

---

### Task 6: SpotlightCard Monochrome Component (`SpotlightCard.tsx`)

**Files:**
- Create: `src/common/components/reactbits/SpotlightCard.tsx`
- Modify: `src/common/components/SpotlightCard.tsx`
- Modify: `src/common/components/reactbits/index.ts`

**Interfaces:**
- Produces: `<SpotlightCard spotlightColor="rgba(255, 255, 255, 0.14)">{children}</SpotlightCard>`

- [ ] **Step 1: Implement `src/common/components/reactbits/SpotlightCard.tsx`**
Implement ReactBits SpotlightCard with smooth radial gradient tracking pointer coordinates.

- [ ] **Step 2: Update existing `src/common/components/SpotlightCard.tsx` adapter**
Ensure existing usage throughout the app defaults to monochrome spotlight (`rgba(255, 255, 255, 0.14)`) and dark borders (`border-white/10`).

- [ ] **Step 3: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 4: Commit**
```bash
git add src/common/components/reactbits/SpotlightCard.tsx src/common/components/SpotlightCard.tsx src/common/components/reactbits/index.ts
git commit -m "feat(reactbits): add monochrome SpotlightCard component and update adapter"
```

---

### Task 7: GlideSelect Spring Selector Component (`GlideSelect.tsx`)

**Files:**
- Create: `src/common/components/reactbits/GlideSelect.tsx`
- Modify: `src/common/components/reactbits/index.ts`
- Create: `src/__tests__/glideSelect.test.ts`

**Interfaces:**
- Produces: `<GlideSelect options={[{ value: 'id', label: 'ID' }, { value: 'en', label: 'EN' }]} value={locale} onChange={...} />`

- [ ] **Step 1: Write unit test for GlideSelect**
Test option normalization, selection callback, and keyboard focus.

- [ ] **Step 2: Implement `GlideSelect.tsx`**
Implement spring-physics sliding select using Lucide icons (`ChevronDown`, `Check`), monochrome styling, and ARIA attributes.

- [ ] **Step 3: Export from `reactbits/index.ts`**
Add export `GlideSelect`.

- [ ] **Step 4: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 5: Commit**
```bash
git add src/common/components/reactbits/GlideSelect.tsx src/common/components/reactbits/index.ts src/__tests__/glideSelect.test.ts
git commit -m "feat(reactbits): add GlideSelect spring selector component"
```

---

### Task 8: BorderGlow Dynamic Perimeter Component (`BorderGlow.tsx`)

**Files:**
- Create: `src/common/components/reactbits/BorderGlow.tsx`
- Modify: `src/common/components/reactbits/index.ts`
- Create: `src/__tests__/borderGlow.test.ts`

**Interfaces:**
- Produces: `<BorderGlow glowColor="0 0% 100%" borderRadius={16}>{children}</BorderGlow>`

- [ ] **Step 1: Write unit test for BorderGlow**
Verify container renders children and parses HSL monochrome glow properly.

- [ ] **Step 2: Implement `BorderGlow.tsx`**
Implement edge-sensitivity and mouse-tracking conical perimeter glow.

- [ ] **Step 3: Export from `reactbits/index.ts`**
Add export `BorderGlow`.

- [ ] **Step 4: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 5: Commit**
```bash
git add src/common/components/reactbits/BorderGlow.tsx src/common/components/reactbits/index.ts src/__tests__/borderGlow.test.ts
git commit -m "feat(reactbits): add BorderGlow perimeter glow component"
```

---

### Task 9: MagicBento GSAP 3D Interactive Grid (`MagicBento.tsx` & `MagicBentoSection.tsx`)

**Files:**
- Create: `src/common/components/reactbits/MagicBento.tsx`
- Create: `src/modules/home/MagicBentoSection.tsx`
- Modify: `src/common/components/reactbits/index.ts`
- Create: `src/__tests__/magicBento.test.ts`

**Interfaces:**
- Produces: `<MagicBento />` with GSAP tilt, particle effects, and engineering showcase cards; `<MagicBentoSection />` container.

- [ ] **Step 1: Write unit test for MagicBento**
Verify bento card data structures and render tree.

- [ ] **Step 2: Implement `MagicBento.tsx`**
Implement GSAP 3D tilt, spotlight, and particle interactions with monochrome cards.

- [ ] **Step 3: Implement `MagicBentoSection.tsx`**
Wrap `MagicBento` in a full-width section with monochrome heading and description.

- [ ] **Step 4: Export from `reactbits/index.ts`**
Add export `MagicBento`.

- [ ] **Step 5: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 6: Commit**
```bash
git add src/common/components/reactbits/MagicBento.tsx src/modules/home/MagicBentoSection.tsx src/common/components/reactbits/index.ts src/__tests__/magicBento.test.ts
git commit -m "feat(reactbits): add MagicBento GSAP interactive 3D bento grid"
```

---

### Task 10: Root Layout & Background Integration

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/common/components/index.ts`

**Interfaces:**
- Mounts: `<MicroSlats />` as global fixed background layer.

- [ ] **Step 1: Mount `MicroSlats` dynamically in `RootLayout`**
Add dynamic import for `MicroSlats` behind existing app elements, removing legacy gradients.

- [ ] **Step 2: Update HTML and body classes in `RootLayout`**
Ensure background is `bg-black` with monochrome text selection.

- [ ] **Step 3: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 4: Commit**
```bash
git add src/app/[locale]/layout.tsx src/common/components/index.ts
git commit -m "feat(layout): integrate MicroSlats background into root layout"
```

---

### Task 11: Hero Section Integration (`TechText` & `SpecularButton`)

**Files:**
- Modify: `src/modules/home/Hero.tsx`

**Interfaces:**
- Replaces name header with `<TechText text="Rizkillah Ramanda" />`.
- Updates primary CTA buttons with `<SpecularButton>`.

- [ ] **Step 1: Integrate `TechText` for developer name in `Hero.tsx`**
Replace typewriter text on name with interactive canvas `TechText`.

- [ ] **Step 2: Integrate `SpecularButton` for primary hero action**
Enhance "Lihat Proyek" / "View Projects" and "Hubungi Saya" buttons with specular rim effects.

- [ ] **Step 3: Clean up hero ambient glow to monochrome**
Replace sky/cyan glows with subtle white/zinc ambient reflections.

- [ ] **Step 4: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 5: Commit**
```bash
git add src/modules/home/Hero.tsx
git commit -m "feat(hero): integrate TechText canvas animation and SpecularButton in Hero"
```

---

### Task 12: Navbar & Locale Switcher Integration (`GlideSelect`)

**Files:**
- Modify: `src/common/components/LocaleSwitcher.tsx`
- Modify: `src/common/layouts/Navbar.tsx`

**Interfaces:**
- Embeds `<GlideSelect>` into `LocaleSwitcher` for ID/EN switching with smooth animated indicator.

- [ ] **Step 1: Refactor `LocaleSwitcher.tsx` to use `GlideSelect`**
Replace native dropdown with `GlideSelect` and forward locale changes to `useRouter()`.

- [ ] **Step 2: Update navbar styling to monochrome glass**
Ensure navbar backdrop is `bg-black/80 backdrop-blur-md border-b border-white/10`.

- [ ] **Step 3: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 4: Commit**
```bash
git add src/common/components/LocaleSwitcher.tsx src/common/layouts/Navbar.tsx
git commit -m "feat(nav): integrate GlideSelect into LocaleSwitcher with monochrome styling"
```

---

### Task 13: Homepage Bottom Bento Integration

**Files:**
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Mounts `<MagicBentoSection />` at the very bottom of the homepage.

- [ ] **Step 1: Add `MagicBentoSection` to `HomePage`**
Insert section as the final element of `HomePage` after `ContactCta`.

- [ ] **Step 2: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 3: Commit**
```bash
git add src/app/[locale]/page.tsx
git commit -m "feat(home): mount MagicBento interactive grid at bottom of homepage"
```

---

### Task 14: Project & Feature Cards Monochrome & BorderGlow Integration

**Files:**
- Modify: `src/modules/home/FeaturedProjects.tsx`
- Modify: `src/modules/projects/ProjectCard.tsx`

**Interfaces:**
- Applies `BorderGlow` and monochrome `SpotlightCard` to featured projects.

- [ ] **Step 1: Wrap top featured project in `BorderGlow`**
Apply monochrome edge glow on priority project showcase.

- [ ] **Step 2: Update card styling to pure monochrome**
Convert project tags, icons, and links to high-contrast white & zinc palette.

- [ ] **Step 3: Run tests & verify**
Run: `pnpm tsc --noEmit; pnpm test -- --run`

- [ ] **Step 4: Commit**
```bash
git add src/modules/home/FeaturedProjects.tsx src/modules/projects/ProjectCard.tsx
git commit -m "feat(projects): apply BorderGlow and monochrome SpotlightCard to projects"
```

---

### Task 15: Full Verification, TypeScript Check & Final Git Push

**Files:**
- Run checks across the entire repository.

- [ ] **Step 1: Run TypeScript compiler**
Run: `pnpm tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 2: Run all unit tests**
Run: `pnpm test -- --run`
Expected: 100% passing tests (including all new tests).

- [ ] **Step 3: Check git log & push to origin main**
Run: `git push origin main`

- [ ] **Step 4: Commit and finalize**
```bash
git commit --allow-empty -m "chore(release): complete reactbits integration and pure OLED monochrome redesign"
git push origin main
```
