# Architecture Documentation

## Overview
This application is designed as a **Clean Modular Monolith** built on the **Next.js 14 App Router**.
It leverages TypeScript for strict type safety, Tailwind CSS for deterministic design tokens, and a decoupled data provider pattern for hybrid cloud/fallback execution.

## Directory Structure
```
src/
├── app/                  # Next.js 14 App Router (Routing, Layouts, API endpoints)
│   ├── [locale]/         # Internationalized route groups (id / en)
│   └── api/              # Decoupled RESTful API endpoints
├── common/               # Domain-agnostic reusable foundation
│   ├── components/       # Atomic UI primitives (Buttons, Cards, Modals, Canvas)
│   ├── hooks/            # Custom React hooks (telemetry, shortcuts, observers)
│   └── utils/            # Pure mathematical & formatting functions
├── modules/              # Domain-specific feature modules
│   ├── home/             # Hero, TechStack, Featured showcases
│   ├── about/            # Career journey, Education, Skills
│   ├── projects/         # Project filter grid, detail modal
│   ├── dashboard/        # GitHub stats, Wakatime, typing telemetry
│   ├── achievements/     # Certificate cards, credential inspection
│   ├── chat/             # Guestbook form and message feed
│   ├── contact/          # Contact form, direct mail, social links
│   └── admin/            # Passcode-authenticated CRUD managers
├── services/             # Data access layer, Supabase clients & types
└── __tests__/            # Native Node test suites
```

## Resilience & Hybrid Fallback
All services utilize an offline-first resilient fallback. If Supabase credentials are missing or the database is paused, the application degrades gracefully to verified static mock records rather than failing.
