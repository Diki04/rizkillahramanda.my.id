'use client';

import React, { useState } from 'react';
import { Container } from '@/common/components/Container';
import { Badge } from '@/common/components/Badge';
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
    brandColor: '#FFFFFF',
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
    brandColor: '#FFFFFF',
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
    brandColor: '#FFFFFF',
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
    brandColor: '#FFFFFF',
    level: 'Advanced',
    description: 'Edge networks, continuous deployments & preview URLs',
  },
];

const categories = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'aiml', label: 'AI & Machine Learning' },
  { id: 'database', label: 'Database & Cloud' },
  { id: 'tools', label: 'DevOps & Tools' },
] as const;

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTechnologies = technologies.filter((tech) => {
    const matchesCategory =
      selectedCategory === 'all' || tech.category === selectedCategory;
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="tech-stack" className="py-20 border-y border-white/[0.08] bg-navy-950/40 relative">
      <Container size="xl">
        <div className="flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/20 bg-sky-400/10 text-sky-400 text-xs font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Stack</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Engineering Stack & Tooling
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Official libraries, frameworks, and developer tools powering my fullstack applications and AI research.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tech stack..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-white/[0.08] bg-navy-900/60 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-accent-blue/50 transition-colors"
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
                    ? 'bg-accent-blue/20 border border-accent-blue/50 text-accent-blue font-semibold shadow-sm'
                    : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.06]'
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
                  className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-white/[0.06] bg-navy-900/30 hover:bg-navy-900/80 hover:border-white/[0.15] transition-all duration-200 text-center cursor-default overflow-hidden"
                >
                  {/* Subtle hover backlight */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: tech.brandColor }}
                  />

                  {/* Icon */}
                  <div className="relative p-2.5 rounded-xl bg-navy-950/80 border border-white/[0.04] mb-2.5 group-hover:scale-110 transition-transform duration-200">
                    <Icon
                      className="w-6 h-6 transition-colors duration-200"
                      style={{ color: tech.brandColor }}
                    />
                  </div>

                  {/* Name */}
                  <span className="font-mono text-xs font-semibold text-slate-200 truncate w-full">
                    {tech.name}
                  </span>

                  {/* Level Pill */}
                  <span className="text-[10px] font-mono text-slate-500 mt-1">
                    {tech.level}
                  </span>
                </div>
              );
            })}
          </div>

          {filteredTechnologies.length === 0 && (
            <div className="text-center py-12 border border-dashed border-white/[0.08] rounded-xl">
              <Layers className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
              <p className="font-mono text-xs text-slate-400">
                No technologies matching &ldquo;{searchQuery}&rdquo;.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
