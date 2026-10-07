export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Diki04',
  WAKATIME_KEY: process.env.WAKATIME_API_KEY || '',
  ADMIN_SECRET: process.env.ADMIN_SECRET_KEY || 'admin123',
  IS_PROD: process.env.NODE_ENV === 'production',
};
