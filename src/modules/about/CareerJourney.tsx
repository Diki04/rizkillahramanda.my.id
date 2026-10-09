'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import {
  Briefcase,
  ChevronRight,
  ChevronDown,
  Check,
  ListTodo,
  Lightbulb,
  Rocket,
  Code2,
  FolderGit2,
  GraduationCap,
} from 'lucide-react';
import { getTechIcon } from '@/common/utils/techIcons';

interface CareerExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  countryCode: string;
  period: string;
  duration: string;
  employmentType: string;
  workMode: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  tasks: string[];
  learned: string[];
  impact: string[];
  tags: string[];
}

export function CareerJourney() {
  const locale = useLocale();
  const t = useTranslations('about');
  const isEn = locale === 'en';

  // Card 2 is expanded by default to mirror user reference comp
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'fullstack-lead': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const experiences: CareerExperience[] = isEn
    ? [
        {
          id: 'fullstack-contract',
          role: 'Full-Stack Developer & AI Systems Engineer',
          company: 'Software Engineering & AI Solutions',
          location: 'Pekanbaru, Indonesia',
          countryCode: 'ID',
          period: 'Jul 2025 - Present',
          duration: 'Active',
          employmentType: 'Contract / Project',
          workMode: 'Hybrid',
          icon: Code2,
          iconBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
          tasks: [
            'Architected and implemented production-ready web applications using Next.js App Router, TypeScript, and Tailwind CSS.',
            'Built robust RESTful API microservices and managed relational data storage with Supabase (PostgreSQL).',
            'Integrated client-side state management using Redux Toolkit with persistent caching and optimistic UI updates.',
          ],
          learned: [
            'Deepened understanding of scalable monolith architecture, SSR hydration cycles, and high-performance React rendering.',
            'Honed client collaboration, sprint estimation, and rapid feature prototyping under real deadlines.',
          ],
          impact: [
            'Decreased time-to-interactive by 40% through code-splitting and asset optimization.',
            'Delivered stable, bug-free applications maintaining 100% test coverage.',
          ],
          tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Redux'],
        },
        {
          id: 'fullstack-lead',
          role: 'Frontend Engineering & Open Source Lead',
          company: 'GitHub Open Source Ecosystem (@Diki04)',
          location: 'Pekanbaru, Indonesia',
          countryCode: 'ID',
          period: 'Dec 2024 - Dec 2025',
          duration: '1 year',
          employmentType: 'Part-time',
          workMode: 'Remote',
          icon: FolderGit2,
          iconBg: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
          tasks: [
            'Maintained and shipped 20+ open-source repositories with strict ESLint and Vitest automation pipelines.',
            'Engineered modern motion physics, WebGL canvas effects, and responsive design systems across projects.',
            'Completed industry developer programs on Dicoding, earning advanced certifications in frontend and machine learning.',
          ],
          learned: [
            'Mastered advanced Git trunk-based workflows, automated continuous integration, and systematic debugging.',
            'Gained hands-on expertise in browser rendering optimizations and micro-animations.',
          ],
          impact: [
            'Built a portfolio of 40+ public GitHub repositories actively starred and referenced.',
            'Mentored junior peers in web development fundamentals and clean code architecture.',
          ],
          tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vitest', 'Git'],
        },
        {
          id: 'academic-fellow',
          role: 'Academic Informatics & Research Collaborator',
          company: 'Universitas Riau (Department of Informatics)',
          location: 'Pekanbaru, Indonesia',
          countryCode: 'ID',
          period: 'Aug 2024 - Dec 2024',
          duration: '5 months',
          employmentType: 'Academic',
          workMode: 'Onsite',
          icon: GraduationCap,
          iconBg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
          tasks: [
            'Researched computer vision and deep learning classification pipelines with Python and PyTorch.',
            'Analyzed algorithm complexity and discrete data structures for computing lab challenges.',
            'Collaborated with student research groups to develop smart computational prototypes.',
          ],
          learned: [
            'Strengthened foundational computer science theory, linear algebra, and statistical machine learning.',
            'Developed critical technical writing and experimental analysis methodologies.',
          ],
          impact: [
            'Maintained top academic GPA standing while completing all practical lab milestones with honors.',
            'Built reusable algorithmic modules integrated into academic project demonstrations.',
          ],
          tags: ['Python', 'Machine Learning', 'Algorithms', 'C++', 'Data Structures'],
        },
      ]
    : [
        {
          id: 'fullstack-contract',
          role: 'Full-Stack Developer & AI Systems Engineer',
          company: 'Software Engineering & AI Solutions',
          location: 'Pekanbaru, Indonesia',
          countryCode: 'ID',
          period: 'Jul 2025 - Sekarang',
          duration: 'Aktif',
          employmentType: 'Kontrak / Proyek',
          workMode: 'Hybrid',
          icon: Code2,
          iconBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
          tasks: [
            'Merancang dan membangun aplikasi web berstandar produksi menggunakan Next.js App Router, TypeScript, dan Tailwind CSS.',
            'Mengembangkan API berkecepatan tinggi serta mengelola penyimpanan basis data relasional via Supabase (PostgreSQL).',
            'Menerapkan state management terstruktur menggunakan Redux Toolkit dengan caching persisten.',
          ],
          learned: [
            'Memperdalam pemahaman arsitektur perangkat lunak monolitik skalabel, siklus SSR, dan optimasi performa rendering.',
            'Mengasah manajemen waktu proyek mandiri, estimasi sprint, dan komunikasi berorientasi solusi.',
          ],
          impact: [
            'Mempercepat time-to-interactive hingga 40% melalui code-splitting dan kompresi aset teroptimasi.',
            'Menghasilkan sistem web yang stabil, tangguh, dan siap pakai dengan 100% verifikasi pengujian.',
          ],
          tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Redux'],
        },
        {
          id: 'fullstack-lead',
          role: 'Frontend Engineering & Open Source Lead',
          company: 'Ekosistem Open Source GitHub (@Diki04)',
          location: 'Pekanbaru, Indonesia',
          countryCode: 'ID',
          period: 'Des 2024 - Des 2025',
          duration: '1 tahun',
          employmentType: 'Part-time',
          workMode: 'Remote',
          icon: FolderGit2,
          iconBg: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
          tasks: [
            'Mengembangkan dan memelihara 20+ repositori open-source dengan standar linting ketat dan pipeline pengujian otomatis.',
            'Mengintegrasikan dinamika fisika motion, efek WebGL canvas, dan sistem desain responsif di seluruh portofolio.',
            'Menyelesaikan kurikulum kompetensi profesional Dicoding dan meraih sertifikasi front-end serta machine learning.',
          ],
          learned: [
            'Menguasai alur kerja Git tingkat lanjut, code review kolaboratif, dan prinsip clean architecture.',
            'Mendapatkan keahlian praktis dalam penulisan automated unit tests menggunakan Vitest dan debugging terstruktur.',
          ],
          impact: [
            'Membangun portofolio 40+ repositori publik dengan kontribusi aktif dan integrasi otomatis.',
            'Membantu rekan mahasiswa dalam memahami fondasi arsitektur web modern dan praktik pemrograman terbaik.',
          ],
          tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vitest', 'Git'],
        },
        {
          id: 'academic-fellow',
          role: 'Informatika Akademik & Kolaborator Riset',
          company: 'Universitas Riau (Jurusan Teknik Informatika)',
          location: 'Pekanbaru, Indonesia',
          countryCode: 'ID',
          period: 'Agu 2024 - Des 2024',
          duration: '5 bulan',
          employmentType: 'Akademik',
          workMode: 'Onsite',
          icon: GraduationCap,
          iconBg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
          tasks: [
            'Meneliti pipeline klasifikasi computer vision dan deep learning menggunakan Python dan PyTorch.',
            'Menganalisis kompleksitas algoritma dan struktur data diskrit untuk pemecahan masalah komputasi laboratorium.',
            'Berkolaborasi dalam tim riset mahasiswa guna membangun purwarupa komputasi cerdas.',
          ],
          learned: [
            'Memperkuat fondasi teori ilmu komputer, aljabar linier terapan, serta pemodelan matematika data.',
            'Mengembangkan kemampuan penulisan teknis dan metodologi analisis eksperimen.',
          ],
          impact: [
            'Mempertahankan prestasi akademik IPK tinggi dan menyelesaikan seluruh praktikum dengan predikat terbaik.',
            'Menciptakan modul algoritma modular yang diterapkan pada presentasi riset akademik.',
          ],
          tags: ['Python', 'Machine Learning', 'Algoritma', 'C++', 'Data Structures'],
        },
      ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2.5">
          <Briefcase className="w-6 h-6 text-black dark:text-white shrink-0 transition-colors" />
          <span>{t('careerJourneyTitle')}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1 font-normal">
          {t('careerSubtitle')}
        </p>
      </div>

      {/* Experience Cards */}
      <div className="space-y-4">
        {experiences.map((exp) => {
          const isExpanded = !!expandedIds[exp.id];
          const IconComponent = exp.icon;

          return (
            <SpotlightCard
              key={exp.id}
              className="p-5 sm:p-6 bg-white/95 dark:bg-zinc-950/80 border-slate-300/90 dark:border-white/10 shadow-sm rounded-2xl transition-all duration-200"
            >
              {/* Header block with Logo, Title, and Metadata */}
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border shadow-xs ${exp.iconBg}`}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white leading-snug">
                    {exp.role}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium flex items-center gap-1.5 flex-wrap">
                    <span>{exp.company}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-zinc-300">
                      {exp.countryCode}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500 dark:text-zinc-500 font-mono flex items-center gap-1.5 flex-wrap pt-0.5">
                    <span>{exp.period}</span>
                    <span>•</span>
                    <span>{exp.duration}</span>
                    <span>•</span>
                    <span>{exp.employmentType}</span>
                    <span>•</span>
                    <span>{exp.workMode}</span>
                  </p>
                </div>
              </div>

              {/* Expand / Collapse Button */}
              <button
                type="button"
                onClick={() => toggleExpand(exp.id)}
                className="mt-3.5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer select-none group/btn"
              >
                {isExpanded ? (
                  <>
                    <ChevronDown className="w-4 h-4 text-slate-500 dark:text-zinc-400 group-hover/btn:text-slate-950 dark:group-hover/btn:text-white transition-colors" />
                    <span>{t('hideDetail')}</span>
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4 text-slate-500 dark:text-zinc-400 group-hover/btn:text-slate-950 dark:group-hover/btn:text-white transition-colors" />
                    <span>{t('showDetail')}</span>
                  </>
                )}
              </button>

              {/* Expandable Details Area */}
              {isExpanded && (
                <div className="mt-5 pt-5 border-t border-slate-200/90 dark:border-white/[0.08] space-y-5 animate-in fade-in duration-200">
                  {/* Tasks Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-amber-500 dark:text-[#facc15] font-mono text-xs font-bold uppercase tracking-wider">
                      <ListTodo className="w-4 h-4" />
                      <span>{t('tasksLabel')}</span>
                    </div>
                    <ul className="space-y-2 pl-1">
                      {exp.tasks.map((task, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed"
                        >
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2-Column Section: What I Learned & Impact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-slate-200/80 dark:border-white/[0.06]">
                    {/* What I Learned */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-amber-500 dark:text-[#facc15] font-mono text-xs font-bold uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4" />
                        <span>{t('learnedLabel')}</span>
                      </div>
                      <ul className="space-y-2 pl-1">
                        {exp.learned.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed"
                          >
                            <Check className="w-4 h-4 text-amber-500 dark:text-[#facc15] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-amber-500 dark:text-[#facc15] font-mono text-xs font-bold uppercase tracking-wider">
                        <Rocket className="w-4 h-4" />
                        <span>{t('impactLabel')}</span>
                      </div>
                      <ul className="space-y-2 pl-1">
                        {exp.impact.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed"
                          >
                            <Check className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/80 dark:border-white/[0.06]">
                    {exp.tags.map((tag) => {
                      const { icon: TechIcon, color } = getTechIcon(tag);
                      return (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-black text-slate-800 dark:text-zinc-300 border border-slate-200 dark:border-white/[0.06] shadow-2xs"
                        >
                          <TechIcon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                          <span>{tag}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
