# rizkillahramanda.my.id

> 🔥 Modern Personal Developer Platform & Portfolio built from scratch with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **pnpm**, **next-intl**, and **Supabase**.

[![GitHub Stars](https://img.shields.io/github/stars/Diki04/rizkillahramanda.my.id?style=flat-square)](https://github.com/Diki04/rizkillahramanda.my.id/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11-orange?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-emerald?style=flat-square&logo=supabase)](https://supabase.com/)

---

## 📘 Overview

This is the personal website and software engineering platform of **Rizkillah Ramanda Sinyo (Diki)**, an Informatics Engineering student at **Universitas Riau**.

The project is built following the **Clean Feature-Driven Modular Monolith** architecture pattern, emphasizing high cohesion, decoupled domain modules, authentic developer metrics, and an anti-AI-slop design aesthetic using a refined **Deep Navy & Electric Blue Monochrome** palette.

---

## ⚡ Tech Stack

- **⚛️ Framework:** Next.js 14 (App Router)
- **🔰 Language:** TypeScript
- **💠 Styling:** Tailwind CSS v3 with custom Deep Navy color tokens
- **📦 Package Manager:** `pnpm`
- **🌐 Internationalization:** `next-intl` (Indonesian & English)
- **🗄️ Database & Storage:** Supabase (PostgreSQL & Storage Buckets) with zero-crash local fallback
- **➰ Motion & Canvas:** Framer Motion & Native GPU-accelerated HTML5 Canvas
- **🎯 Icons:** Lucide React
- **📊 Analytics:** GitHub REST API & Wakatime Live Coding API

---

## 🚀 Key Features

### 1. 📊 Developer Dashboard & Live Metrics
- Visualizes public GitHub statistics (Repositories, Stars, Followers, Following) for `@Diki04`.
- Displays live Wakatime coding hours, daily averages, and programming language distributions with animated progress bars.
- Graceful cached fallback data ensuring 100% uptime even if external APIs hit rate limits.

### 2. 🗳️ Curated Projects Showcase
- Categorized project cards with interactive tabs: **All**, **Full-Stack**, **Front-End**, **Machine Learning**.
- Real-time search query filtering across project titles and technology tags.
- Detailed project preview modals displaying full descriptions, tech stacks, live demo buttons, and source code links.

### 3. 🛡️ Admin Management Portal (`/admin`)
- Secure passcode-protected admin interface for Rizkillah Ramanda.
- **Project Manager:** Add new projects, edit metadata, upload cover images, toggle featured status, and delete entries.
- **Certificate Manager:** Add new certificates/awards, update issuer details, verification URLs, and credential images.
- Integrates seamlessly with Supabase PostgreSQL tables and storage buckets.

### 4. 🌍 Multi-Language Support (i18n)
- Native Indonesian (`id`) and English (`en`) dictionary translation powered by `next-intl`.
- Clean URL prefixes with auto-negotiation and instant header language switcher.

### 5. 💬 Interactive Guestbook / Chat
- Real-time guestbook feed allowing visitors to leave greetings and reviews.
- Form validation and instant optimistic UI updates.
- Synchronized with Supabase table `guestbook_messages`.

### 6. ✨ Anti-AI Slop Micro-Interactions
- **Custom Cursor Spotlight (`SpotlightCard`):** Smooth radial gradient illumination following cursor coordinates on card borders.
- **Ambient Interactive Canvas:** Subtle constellation network of geometric nodes responding softly to cursor velocity at 60 FPS.
- **Theme Switcher:** Deep Navy / Obsidian Dark mode toggle with clean slate light mode.

### 7. 🚨 Polished Error Boundaries
- Custom engineering-themed **404 Not Found** page (`not-found.tsx`).
- Resilient **500 Error Boundary** (`error.tsx`) with instant recovery/reset buttons.

---

## 📂 Architecture Structure

```text
src/
├── app/
│   ├── [locale]/           # Localized Next.js App Router
│   │   ├── layout.tsx      # Root master layout (Navbar, Footer, Canvas)
│   │   ├── page.tsx        # Landing Page (Hero, TechStack, Featured)
│   │   ├── about/          # Biography, Universitas Riau education, Skills
│   │   ├── projects/       # Filterable projects showcase & modals
│   │   ├── dashboard/      # GitHub & Wakatime analytics
│   │   ├── achievements/   # Verified certificates showcase
│   │   ├── chat/           # Interactive guestbook feed & form
│   │   ├── contact/        # Direct email & social networks
│   │   ├── admin/          # Admin management portal (CRUD)
│   │   ├── not-found.tsx   # Custom 404 page
│   │   └── error.tsx       # Error boundary
│   └── api/                # API route handlers
│       ├── github/         # GitHub statistics fetcher
│       ├── wakatime/       # Wakatime stats fetcher
│       ├── chat/           # Guestbook messages CRUD
│       └── admin/          # Passcode-protected admin endpoints
├── common/                 # Reusable UI primitives
│   ├── components/         # SpotlightCard, Badge, Button, ThemeToggle, Canvas
│   ├── layouts/            # Navbar, MobileNav, Footer, Container
│   └── hooks/              # useSpotlight cursor tracking
├── modules/                # Domain-specific feature modules
│   ├── home/
│   ├── about/
│   ├── projects/
│   ├── dashboard/
│   ├── achievements/
│   ├── chat/
│   ├── contact/
│   └── admin/
├── services/               # Data fetching & Supabase integration
│   ├── data/               # Authentic fallback datasets
│   └── supabase/           # Safe Supabase client & hybrid data provider
└── types/                  # TypeScript interface definitions
```

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Diki04/rizkillahramanda.my.id.git
cd rizkillahramanda.my.id
```

### 2. Install dependencies with pnpm
```bash
pnpm install
```

### 3. Setup Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your credentials:
```env
# Supabase (Optional: uses hybrid local fallback if omitted)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# GitHub Profile
NEXT_PUBLIC_GITHUB_USERNAME=Diki04

# Wakatime (Optional)
WAKATIME_API_KEY=your_wakatime_key

# Admin Passcode
ADMIN_SECRET_KEY=admin123
```

### 4. Supabase Database Setup
If using Supabase, run the SQL script located in `supabase/schema.sql` inside your **Supabase SQL Editor** to automatically generate tables and RLS policies.

### 5. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production
```bash
pnpm build
pnpm start
```

---

## 👤 Author

**Rizkillah Ramanda Sinyo (Diki)**
- 🎓 Informatics Engineering Student at Universitas Riau
- 🌐 Website: [rizkillahramanda.my.id](https://rizkillahramanda.my.id)
- 🐙 GitHub: [@Diki04](https://github.com/Diki04)
- 💼 LinkedIn: [rizkillah-ramanda-sinyo](https://www.linkedin.com/in/rizkillah-ramanda-sinyo/)
- ✉️ Email: [rizkillahramanda@gmail.com](mailto:rizkillahramanda@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
