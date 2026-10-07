# Deployment Guide

## Vercel Deployment (Recommended)
1. Push this repository to GitHub: `https://github.com/Diki04/rizkillahramanda.my.id.git`.
2. Import project into Vercel Dashboard.
3. Framework Preset: **Next.js**.
4. Package Manager: **pnpm**.
5. Configure Environment Variables:
   ```env
   ADMIN_SECRET_KEY=your_secure_admin_passcode_here
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
6. Click **Deploy**.

## Self-Hosted Docker Deployment
```dockerfile
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```
