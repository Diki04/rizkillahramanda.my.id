# Database Documentation & Supabase Schema

## Tables

### 1. `projects`
- `id` (UUID, Primary Key)
- `title` (TEXT, NOT NULL)
- `description` (TEXT, NOT NULL)
- `category` (TEXT)
- `tech_stack` (TEXT[])
- `image_url` (TEXT)
- `github_url` (TEXT)
- `demo_url` (TEXT)
- `featured` (BOOLEAN, DEFAULT false)
- `created_at` (TIMESTAMPTZ, DEFAULT NOW())

### 2. `achievements`
- `id` (UUID, Primary Key)
- `title` (TEXT, NOT NULL)
- `issuer` (TEXT, NOT NULL)
- `date` (TEXT, NOT NULL)
- `category` (TEXT)
- `credential_url` (TEXT)
- `image_url` (TEXT)
- `skills` (TEXT[])
- `created_at` (TIMESTAMPTZ, DEFAULT NOW())

### 3. `guestbook_messages`
- `id` (UUID, Primary Key)
- `sender_name` (TEXT, NOT NULL)
- `content` (TEXT, NOT NULL)
- `is_approved` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMPTZ, DEFAULT NOW())

## Row Level Security (RLS)
- Public read access is granted to everyone via `anon` role.
- Mutations require service role key or administrative authorization.
