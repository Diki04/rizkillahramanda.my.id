'use client';

import React from 'react';
import { ProjectCategory } from '@/types';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { cn } from '@/common/utils/cn';

interface ProjectsFilterProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProjectsFilter({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: ProjectsFilterProps) {
  const t = useTranslations('projects');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: t('filterAll') },
    { id: 'fullstack', label: t('filterFullstack') },
    { id: 'frontend', label: t('filterFrontend') },
    { id: 'ml', label: t('filterMl') },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-navy-900/60 border border-slate-200 dark:border-white/[0.08] backdrop-blur-sm">
        {categories.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200',
                active
                  ? 'bg-white dark:bg-navy-800 text-sky-600 dark:text-accent-blue shadow-sm border border-slate-200 dark:border-accent-blue/30 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-navy-800/40'
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari proyek atau teknologi..."
          className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-navy-900/80 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
        />
      </div>
    </div>
  );
}
