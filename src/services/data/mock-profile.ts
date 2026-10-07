import { Profile, SkillItem } from '@/types';

export const mockProfile: Profile = {
  name: 'Rizkillah Ramanda Sinyo',
  nickname: 'Diki',
  headline: {
    en: 'Informatics Engineering Student & Full-Stack Developer specializing in modern web applications, scalable state management, and machine learning.',
    id: 'Mahasiswa Teknik Informatika & Full-Stack Developer yang berfokus pada aplikasi web modern, manajemen state yang scalable, dan machine learning.',
  },
  bio: {
    en: 'An undergraduate Informatics Engineering student at Universitas Riau with deep enthusiasm for software architecture, responsive UI design, and data-driven systems. Passionate about building robust monolith and distributed architectures using Next.js, TypeScript, React, and Python.',
    id: 'Mahasiswa Teknik Informatika Universitas Riau dengan minat mendalam pada arsitektur perangkat lunak, perancangan antarmuka pengguna yang responsif, dan sistem berbasis data. Berpengalaman membangun arsitektur monolitik yang rapi dan terukur menggunakan Next.js, TypeScript, React, dan Python.',
  },
  avatar: 'https://avatars.githubusercontent.com/u/162100984?v=4',
  location: 'Pekanbaru, Riau, Indonesia',
  university: 'Universitas Riau',
  major: 'Teknik Informatika (Informatics Engineering)',
  email: 'rizkillahramanda@gmail.com',
  github: 'https://github.com/Diki04',
  linkedin: 'https://www.linkedin.com/in/rizkillah-ramanda-sinyo/',
  website: 'https://rizkillahramanda.my.id',
  stats: {
    yearsOfExperience: '2+ Years',
    completedProjects: 24,
    githubRepositories: 49,
  },
};

export const mockSkills: SkillItem[] = [
  // Frontend
  { name: 'React.js', level: 'Advanced', category: 'frontend' },
  { name: 'Next.js (App Router)', level: 'Advanced', category: 'frontend' },
  { name: 'TypeScript', level: 'Advanced', category: 'frontend' },
  { name: 'Redux / Redux Toolkit', level: 'Advanced', category: 'frontend' },
  { name: 'Tailwind CSS', level: 'Advanced', category: 'frontend' },
  { name: 'HTML5 & Modern CSS', level: 'Advanced', category: 'frontend' },
  
  // Backend & Database
  { name: 'Node.js', level: 'Intermediate', category: 'backend' },
  { name: 'Supabase (PostgreSQL)', level: 'Advanced', category: 'backend' },
  { name: 'RESTful APIs', level: 'Advanced', category: 'backend' },
  { name: 'Next.js API Routes', level: 'Advanced', category: 'backend' },
  
  // Machine Learning & Data
  { name: 'Python', level: 'Advanced', category: 'ml' },
  { name: 'Deep Learning / CNN', level: 'Intermediate', category: 'ml' },
  { name: 'Jupyter Notebooks', level: 'Advanced', category: 'ml' },
  { name: 'Data Preprocessing & NLP', level: 'Intermediate', category: 'ml' },

  // Tools & DevOps
  { name: 'Git & GitHub', level: 'Advanced', category: 'tools' },
  { name: 'pnpm / npm', level: 'Advanced', category: 'tools' },
  { name: 'Vercel Deployment', level: 'Advanced', category: 'tools' },
  { name: 'VS Code & Postman', level: 'Advanced', category: 'tools' },
];
