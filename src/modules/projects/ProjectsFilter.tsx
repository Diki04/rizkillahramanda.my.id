'use client';

import React from 'react';
import { ProjectTypeFilter, ProjectCategoryFilter } from '@/types';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { cn } from '@/common/utils/cn';

interface ProjectsFilterProps {
  activeType: ProjectTypeFilter;
  onSelectType: (type: ProjectTypeFilter) => void;
  activeCategory: ProjectCategoryFilter;
  onSelectCategory: (category: ProjectCategoryFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProjectsFilter({
  activeType,
  onSelectType,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: ProjectsFilterProps) {
  const t = useTranslations('projects');

  const typeOptions: { id: ProjectTypeFilter; label: string }[] = [
    { id: 'all', label: t('typeAll') },
    { id: 'web', label: t('typeWeb') },
    { id: 'mobile', label: t('typeMobile') },
  ];

  const categoryOptions: { id: ProjectCategoryFilter; label: string }[] = [
    { id: 'all', label: t('catAll') },
    { id: 'personal', label: t('catPersonal') },
    { id: 'internship', label: t('catInternship') },
    { id: 'freelance', label: t('catFreelance') },
    { id: 'competition', label: t('catCompetition') },
  ];

  return (
    <div className="space-y-4">
      {/* Filters & Search Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-3">
          {/* Row 1: TIPE */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs font-bold text-slate-500 dark:text-zinc-500 tracking-wider min-w-[70px]">
              {t('typeLabel')}
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {typeOptions.map((opt) => {
                const isActive = activeType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelectType(opt.id)}
                    className={cn(
                      'px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 select-none cursor-pointer',
                      isActive
                        ? 'bg-[#facc15] text-black font-extrabold shadow-sm ring-2 ring-yellow-400/40'
                        : 'bg-slate-200/70 dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/80 dark:hover:bg-zinc-800 border border-slate-300/80 dark:border-white/[0.06]'
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: KATEGORI */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs font-bold text-slate-500 dark:text-zinc-500 tracking-wider min-w-[70px]">
              {t('categoryLabel')}
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {categoryOptions.map((opt) => {
                const isActive = activeCategory === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelectCategory(opt.id)}
                    className={cn(
                      'px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 select-none cursor-pointer',
                      isActive
                        ? 'bg-[#facc15] text-black font-extrabold shadow-sm ring-2 ring-yellow-400/40'
                        : 'bg-slate-200/70 dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/80 dark:hover:bg-zinc-800 border border-slate-300/80 dark:border-white/[0.06]'
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72 self-start lg:self-center">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari proyek atau teknologi..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition-all shadow-2xs"
          />
        </div>
      </div>
    </div>
  );
}
