import React from 'react';
import { Container } from '@/common/components/Container';
import {
  Code2,
  Database,
  Layers,
  Cpu,
  Terminal,
  Globe,
  Binary,
  Workflow,
} from 'lucide-react';

const technologies = [
  { name: 'Next.js (App Router)', icon: Globe },
  { name: 'React.js', icon: Code2 },
  { name: 'TypeScript', icon: Binary },
  { name: 'Redux Toolkit', icon: Layers },
  { name: 'Tailwind CSS', icon: Terminal },
  { name: 'Supabase / PostgreSQL', icon: Database },
  { name: 'Python & Machine Learning', icon: Cpu },
  { name: 'REST APIs & Architecture', icon: Workflow },
];

export function TechStack() {
  return (
    <section className="py-12 border-y border-white/[0.08] bg-navy-900/40">
      <Container size="xl">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
              Core Engineering Tech Stack
            </span>
            <span className="font-mono text-xs text-accent-blue">
              Monolith & Scalable Systems
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-white/[0.06] bg-navy-950/60 hover:bg-navy-800/80 hover:border-accent-blue/30 transition-all duration-200 group text-center"
                >
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-accent-blue transition-colors" />
                  <span className="font-mono text-xs text-slate-300 font-medium line-clamp-1">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
