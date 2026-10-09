import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Briefcase } from 'lucide-react';
import { getTechIcon } from '@/common/utils/techIcons';

export function CareerJourney() {
  const locale = useLocale();
  const t = useTranslations('about');
  const isEn = locale === 'en';

  const milestones = isEn
    ? [
        {
          year: '2026',
          role: 'Full-Stack Developer & ML Explorer',
          description:
            'Focusing on modular Next.js architecture, Supabase integration, Redux Toolkit state management, and deep learning-based computer vision projects.',
          tags: ['Next.js', 'Redux', 'Python', 'Supabase'],
        },
        {
          year: '2025',
          role: 'Frontend Engineering & Open Source',
          description:
            'Built dozens of open-source web projects on GitHub (@Diki04), earning front-end and machine learning competencies from Dicoding.',
          tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Git'],
        },
        {
          year: '2024',
          role: 'Commencement of Informatics Studies',
          description:
            'Started academic journey at Universitas Riau, building a solid foundation in programming algorithms and system engineering principles.',
          tags: ['C++', 'Python', 'Algorithms'],
        },
      ]
    : [
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
            'Membangun puluhan proyek web open-source di GitHub (@Diki04), meraih pencapaian kompetensi front-end dan machine learning di Dicoding.',
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
      <h3 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-slate-900 dark:text-zinc-400" />
        <span>{t('careerJourneyTitle')}</span>
      </h3>

      <div className="space-y-3">
        {milestones.map((m) => (
          <SpotlightCard key={m.year} className="p-5 bg-white/95 dark:bg-zinc-950/80 border-slate-300 dark:border-white/10 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/[0.08] text-slate-950 dark:text-white font-mono text-sm font-black shadow-xs">
                {m.year}
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="text-base font-extrabold text-slate-950 dark:text-white">{m.role}</h4>
                <p className="text-sm text-slate-950 dark:text-zinc-300 leading-relaxed font-medium">
                  {m.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {m.tags.map((t) => {
                    const { icon: TechIcon, color } = getTechIcon(t);
                    return (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold bg-slate-100 dark:bg-black text-slate-950 dark:text-zinc-300 border border-slate-300 dark:border-white/[0.06] hover:border-slate-400 dark:hover:border-white/30 transition-colors shadow-xs"
                      >
                        <TechIcon className="w-3 h-3 shrink-0" style={{ color }} />
                        <span>{t}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
