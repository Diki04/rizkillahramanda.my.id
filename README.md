# Rizkillah Ramanda Sinyo — Personal Engineering Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwind-css)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-orange?logo=pnpm)](https://pnpm.io/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A high-performance personal portfolio, developer telemetry dashboard, and engineering showcase built for **Rizkillah Ramanda Sinyo (Diki)**, an Informatics Engineering student at **Universitas Riau**.

---

## ✨ Features

- 🌌 **Deep Navy & Electric Cyan Palette**: Anti-AI-slop design aesthetic with micro-borders and zero blurry gradient slop.
- 🔦 **Interactive Cursor Spotlight**: Realtime mouse boundary illumination on all cards and interactive panels.
- 🌐 **Multi-Language (i18n)**: Native bilingual support for Indonesian (`id`) and English (`en`).
- 📊 **Developer Telemetry Dashboard**: Live statistics from GitHub API, Wakatime coding activity, typing velocity, and problem-solving rank.
- 💼 **Project Showcase**: Tag filtering, instant search, responsive detail modal, and direct GitHub links.
- 📜 **Verified Credentials**: Showcase of professional certifications, courses, and honors.
- 💬 **Interactive Guestbook**: Supabase PostgreSQL comments feed with offline fallback resilience.
- 🔐 **Admin Management Portal**: Passcode-secured portal (`/admin`) to insert and update projects and certificates.
- ⌨️ **Command Palette (`Ctrl+K`)**: Instant keyboard navigation across all routes and shortcuts.
- 💻 **Interactive CLI Easter Egg**: Terminal simulation in 404 page.

---

## 🛠️ Architecture

Clean Modular Monolith architecture ensuring separation of concerns:

```
src/
├── app/               # Next.js 14 App Router & API Endpoints
├── common/            # Reusable UI Primitives, Hooks & Math Utils
├── modules/           # Domain Features (Home, About, Projects, Dashboard, Chat, Admin)
└── services/          # Supabase Layer & Type Definitions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.17.0
- pnpm >= 8.0.0

### Installation
```bash
# Clone the repository
git clone https://github.com/Diki04/rizkillahramanda.my.id.git

# Navigate to project directory
cd rizkillahramanda.my.id

# Install dependencies using pnpm
pnpm install

# Setup environment variables
cp .env.example .env.local

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🔒 Admin Access
- Navigate to `/admin` or press `Ctrl+K` -> "Admin Portal".
- Enter the administrative passcode configured in your environment variable (`ADMIN_SECRET_KEY`).

---

## 📄 License
Released under the [MIT License](LICENSE).
