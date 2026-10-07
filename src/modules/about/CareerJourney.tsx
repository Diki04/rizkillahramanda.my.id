import React from 'react';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Briefcase, Code, Terminal, GitCommit } from 'lucide-react';

export function CareerJourney() {
  const milestones = [
    {
      year: '2026',
      role: 'Full-Stack Developer & ML Explorer',
      description:
        'Fokus mendalami arsitektur modular Next.js, integrasi Supabase, state management Redux Toolkit, dan proyek computer vision berbasis deep learning.',
      tags: ['Next.js', 'Redux', 'Python', 'Supabase'],
    },
    {
      year: '2025',
      role: 'Frontend Engineering & Open Source',
      description:
        'Membangun puluhan proyek web open-source di GitHub (@Diki04), menyelesaikan sertifikasi fundamental front-end dan machine learning di Dicoding.',
      tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Git'],
    },
    {
      year: '2024',
      role: 'Awal Studi Teknik Informatika',
      description:
        'Memulai perjalanan akademis di Universitas Riau dengan memperkuat algoritma pemrograman dan logika dasar rekayasa sistem.',
      tags: ['C++', 'Python', 'Algoritma'],
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-accent-blue" />
        <span>Perjalanan & Milestone</span>
      </h3>

      <div className="space-y-3">
        {milestones.map((m) => (
          <SpotlightCard key={m.year} className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent-blue/30 bg-accent-blue/10 text-accent-blue font-mono text-sm font-bold">
                {m.year}
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-semibold text-white">{m.role}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {m.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-950/80 text-slate-400 border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
