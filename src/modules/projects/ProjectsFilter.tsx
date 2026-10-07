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
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-navy-900/60 border border-white/[0.08] backdrop-blur-sm">
        {categories.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200',
                active
                  ? 'bg-navy-800 text-accent-blue shadow-sm shadow-cyan-950/40 border border-accent-blue/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-navy-800/40'
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari proyek atau teknologi..."
          className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-navy-900/80 border border-white/[0.08] text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/50 transition-all"
        />
      </div>
    </div>
  );
}
