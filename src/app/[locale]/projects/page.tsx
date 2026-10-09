'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { ProjectsFilter } from '@/modules/projects/ProjectsFilter';
import { ProjectCard } from '@/modules/projects/ProjectCard';
import { mockProjects } from '@/services/data/mock-projects';
import { ProjectTypeFilter, ProjectCategoryFilter } from '@/types';
import { FolderGit2 } from 'lucide-react';

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const [activeType, setActiveType] = useState<ProjectTypeFilter>('all');
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchType =
        activeType === 'all' || project.projectType === activeType;
      const matchCategory =
        activeCategory === 'all' ||
        project.projectCategory === activeCategory;
      const matchSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchType && matchCategory && matchSearch;
    });
  }, [activeType, activeCategory, searchQuery]);

  return (
    <div className="py-16 md:py-20 space-y-12">
      <Container size="xl">
        {/* Header */}
        <ScrollReveal className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white text-xs font-mono font-medium">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">{t('subtitle')}</p>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <ScrollReveal className="pt-4" delay={0.1}>
          <ProjectsFilter
            activeType={activeType}
            onSelectType={setActiveType}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </ScrollReveal>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4" delay={0.2}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ScrollReveal>
        ) : (
          <ScrollReveal className="py-20 text-center rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-100 dark:bg-black/40">
            <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
              {t('emptyState')}
            </p>
          </ScrollReveal>
        )}
      </Container>
    </div>
  );
}
