'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { ProjectsFilter } from '@/modules/projects/ProjectsFilter';
import { ProjectCard } from '@/modules/projects/ProjectCard';
import { ProjectModal } from '@/modules/projects/ProjectModal';
import { mockProjects } from '@/services/data/mock-projects';
import { Project, ProjectCategory } from '@/types';
import { FolderGit2 } from 'lucide-react';

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchCategory =
        activeCategory === 'all' || project.category === activeCategory;
      const matchSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-16 md:py-20 space-y-12">
      <Container size="xl">
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/10 text-accent-blue text-xs font-mono font-medium">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Curated Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {t('title')}
          </h1>
          <p className="text-base text-slate-400">{t('subtitle')}</p>
        </div>

        {/* Filter & Search Bar */}
        <div className="pt-4">
          <ProjectsFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenModal={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-2xl border border-white/[0.06] bg-navy-900/40">
            <p className="font-mono text-sm text-slate-400">
              Tidak ada proyek yang sesuai dengan pencarian Anda.
            </p>
          </div>
        )}
      </Container>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
