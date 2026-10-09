-- =========================================================================
-- Supabase Schema for Rizkillah Ramanda Portfolio (rizkillahramanda.my.id)
-- Run this script in your Supabase SQL Editor
-- =========================================================================

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description JSONB NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  "githubUrl" TEXT NOT NULL,
  "demoUrl" TEXT,
  featured BOOLEAN DEFAULT false,
  "createdAt" TEXT NOT NULL
);

-- 2. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  "issueDate" TEXT NOT NULL,
  "credentialUrl" TEXT,
  image TEXT NOT NULL,
  category TEXT NOT NULL
);

-- 3. Guestbook Messages Table
CREATE TABLE IF NOT EXISTS public.guestbook_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  avatar TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Project Views Table (Real Visitor Counter)
CREATE TABLE IF NOT EXISTS public.project_views (
  slug TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guestbook_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_views ENABLE ROW LEVEL SECURITY;

-- 6. Policies for Public Read Access
CREATE POLICY "Allow public read for projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read for achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Allow public read for guestbook" ON public.guestbook_messages FOR SELECT USING (true);
CREATE POLICY "Allow public read for project_views" ON public.project_views FOR SELECT USING (true);
CREATE POLICY "Allow public upsert for project_views" ON public.project_views FOR ALL USING (true);

-- 6. Policy for Public Insert on Guestbook
CREATE POLICY "Allow public insert for guestbook" ON public.guestbook_messages FOR INSERT WITH CHECK (true);

-- 7. Policy for Admin Management (Full access with service key or anon for simple setups)
CREATE POLICY "Allow admin full access to projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow admin full access to achievements" ON public.achievements FOR ALL USING (true);

-- 8. Storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Assets" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Allow Upload Assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-assets');
