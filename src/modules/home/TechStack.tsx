'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { Badge } from '@/common/components/Badge';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiPytorch,
  SiTensorflow,
  SiOpencv,
  SiPostgresql,
  SiSupabase,
  SiMongodb,
  SiMysql,
  SiPrisma,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiPostman,
  SiVercel,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { Sparkles, Search, Layers } from 'lucide-react';

interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'aiml' | 'database' | 'tools';
  icon: IconType;
  brandColor: string;
  level: string;
  description: string;
}

const technologies: TechItem[] = [
  // Frontend
  {
    name: 'React.js',
    category: 'frontend',
    icon: SiReact,
    brandColor: '#61DAFB',
    level: 'Advanced',
    description: 'Component architecture, custom hooks & concurrency',
  },
  {
    name: 'Next.js',
    category: 'frontend',
    icon: SiNextdotjs,
    brandColor: '#38BDF8',
    level: 'Advanced',
    description: 'App Router, SSR, Server Components & SEO optimization',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: SiTypescript,
    brandColor: '#3178C6',
    level: 'Advanced',
    description: 'Strict type safety, generics & compile-time correctness',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: SiTailwindcss,
    brandColor: '#38BDF8',
    level: 'Expert',
    description: 'Responsive design tokens, micro-interactions & modern UI',
  },
  {
    name: 'Redux Toolkit',
    category: 'frontend',
    icon: SiRedux,
    brandColor: '#764ABC',
    level: 'Proficient',
    description: 'Global state slices, thunks & RTK Query caching',
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    icon: SiJavascript,
    brandColor: '#F7DF1E',
    level: 'Advanced',
    description: 'Async/await, event loop, Web APIs & DOM manipulation',
  },

  // Backend
  {
    name: 'Node.js',
    category: 'backend',
    icon: SiNodedotjs,
    brandColor: '#339933',
    level: 'Advanced',
    description: 'Scalable event-driven backends & microservices',
  },
  {
    name: 'Express.js',
    category: 'backend',
    icon: SiExpress,
    brandColor: '#64748B',
    level: 'Proficient',
    description: 'RESTful API routing, middleware & auth handling',
  },
  {
    name: 'Python',
    category: 'backend',
    icon: SiPython,
    brandColor: '#3776AB',
    level: 'Advanced',
    description: 'Backend scripting, algorithmic automation & ML pipelines',
  },
  {
    name: 'FastAPI',
    category: 'backend',
    icon: SiFastapi,
    brandColor: '#009688',
    level: 'Proficient',
    description: 'High-performance asynchronous RESTful microservices',
  },

  // AI & Machine Learning
  {
    name: 'PyTorch',
    category: 'aiml',
    icon: SiPytorch,
    brandColor: '#EE4C2C',
    level: 'Proficient',
    description: 'Deep neural networks, computer vision & HAR classification',
  },
  {
    name: 'TensorFlow',
    category: 'aiml',
    icon: SiTensorflow,
    brandColor: '#FF6F00',
    level: 'Intermediate',
    description: 'Model training, serialization & inference pipelines',
  },
  {
    name: 'OpenCV',
    category: 'aiml',
    icon: SiOpencv,
    brandColor: '#5C3EE8',
    level: 'Proficient',
    description: 'Image preprocessing, feature extraction & video analysis',
  },

  // Database & Cloud
  {
    name: 'PostgreSQL',
    category: 'database',
    icon: SiPostgresql,
    brandColor: '#4169E1',
    level: 'Advanced',
    description: 'Relational modeling, indexing, joins & query performance',
  },
  {
    name: 'Supabase',
    category: 'database',
    icon: SiSupabase,
    brandColor: '#3ECF8E',
    level: 'Advanced',
    description: 'Row Level Security, Postgres Auth, Realtime & Storage',
  },
  {
    name: 'MongoDB',
    category: 'database',
    icon: SiMongodb,
    brandColor: '#47A248',
    level: 'Intermediate',
    description: 'NoSQL document storage, schemas & aggregation',
  },
  {
    name: 'MySQL',
    category: 'database',
    icon: SiMysql,
    brandColor: '#4479A1',
    level: 'Advanced',
    description: 'Structured relational databases & transaction management',
  },
  {
    name: 'Prisma ORM',
    category: 'database',
    icon: SiPrisma,
    brandColor: '#2D3748',
    level: 'Proficient',
    description: 'Type-safe database client & schema migrations',
  },

  // DevOps & Tooling
  {
    name: 'Docker',
    category: 'tools',
    icon: SiDocker,
    brandColor: '#2496ED',
    level: 'Proficient',
    description: 'Containerization, multi-stage builds & docker-compose',
  },
  {
    name: 'Git',
    category: 'tools',
    icon: SiGit,
    brandColor: '#F05032',
    level: 'Advanced',
    description: 'Atomic commits, branching, rebasing & merge workflows',
  },
  {
    name: 'GitHub',
    category: 'tools',
    icon: SiGithub,
    brandColor: '#64748B',
    level: 'Advanced',
    description: 'Actions CI/CD, issue tracking & code review PRs',
  },
  {
    name: 'Linux',
    category: 'tools',
    icon: SiLinux,
    brandColor: '#FCC624',
    level: 'Proficient',
    description: 'Bash scripting, server configuration & process managers',
  },
  {
    name: 'Postman',
    category: 'tools',
    icon: SiPostman,
    brandColor: '#FF6C37',
    level: 'Advanced',
    description: 'API testing, automated collections & mock servers',
  },
  {
    name: 'Vercel',
    category: 'tools',
    icon: SiVercel,
    brandColor: '#000000',
    level: 'Advanced',
    description: 'Edge networks, continuous deployments & preview URLs',
  },
];

export function TechStack() {
  const t = useTranslations('techStack');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: t('categoryAll') },
    { id: 'frontend', label: t('categoryFrontend') },
    { id: 'backend', label: t('categoryBackend') },
    { id: 'aiml', label: t('categoryAiml') },
    { id: 'database', label: t('categoryDatabase') },
    { id: 'tools', label: t('categoryTools') },
  ];

  const filteredTechnologies = technologies.filter((tech) => {
    const matchesCategory =
      selectedCategory === 'all' || tech.category === selectedCategory;
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScrollReveal id="tech-stack" className="py-20 border-y border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-navy-950/40 relative">
      <Container size="xl">
        <div className="flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/20 bg-sky-400/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-medium">
                <Sparkles className="w-4 h-4" />
                <span>{t('badge')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t('title')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
                {t('subtitle')}
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900/60 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-400/50 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500/15 border border-sky-500/50 text-sky-600 dark:text-sky-300 font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tech Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredTechnologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="group relative flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white/80 dark:bg-navy-900/40 hover:bg-white dark:hover:bg-navy-850 hover:border-sky-400/50 dark:hover:border-white/[0.22] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-500/10 active:scale-95 transition-all duration-300 text-center cursor-default overflow-hidden shadow-xs"
                >
                  {/* Dynamic Brand Color Glow Background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none blur-xl"
                    style={{ backgroundColor: tech.brandColor }}
                  />

                  {/* Icon with Hover Scale & Rotation */}
                  <div className="relative p-3 rounded-2xl bg-slate-100 dark:bg-navy-950/80 border border-slate-200 dark:border-white/[0.06] mb-2.5 group-hover:scale-115 group-hover:rotate-3 transition-transform duration-300 shadow-xs">
                    <Icon
                      className="w-6 h-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]"
                      style={{ color: tech.brandColor }}
                    />
                  </div>

                  {/* Name */}
                  <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 truncate w-full group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                    {tech.name}
                  </span>

                  {/* Level Pill */}
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                    {tech.level}
                  </span>
                </div>
              );
            })}
          </div>

          {filteredTechnologies.length === 0 && (
            <div className="text-center py-12 border border-dashed border-slate-200 dark:border-white/[0.08] rounded-xl">
              <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                No technologies matching &ldquo;{searchQuery}&rdquo;.
              </p>
            </div>
          )}
        </div>
      </Container>
    </ScrollReveal>
  );
}
