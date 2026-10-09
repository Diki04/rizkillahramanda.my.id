'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/common/components/Container';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Badge } from '@/common/components/Badge';
import { Button } from '@/common/components/Button';
import { mockProjects } from '@/services/data/mock-projects';
import { Project } from '@/types';
import { ProjectModal } from '@/modules/projects/ProjectModal';
import { ArrowUpRight, Github, ExternalLink, Eye } from 'lucide-react';
import { getTechIcon } from '@/common/utils/techIcons';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { BorderGlow } from '@/common/components/reactbits';
import { useTheme } from '@/common/contexts/ThemeContext';
import { cn } from '@/common/utils/cn';

export function FeaturedProjects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEn = locale === 'en';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featured = mockProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <ScrollReveal id="projects" className="py-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
      <Container size="xl">
        <div className="flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-300 dark:border-white/10 bg-white/95 dark:bg-zinc-900/80 text-slate-950 dark:text-zinc-200 text-xs font-mono uppercase tracking-wider font-bold mb-2 shadow-xs">
                <span>{t('featured')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white mt-1">
                {t('title')}
              </h2>
              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-300 mt-1 max-w-xl font-medium">
                {t('subtitle')}
              </p>
            </div>
            <Link href="/projects">
              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-slate-100 border-slate-300 text-slate-950 dark:bg-zinc-900/80 dark:border-white/10 dark:text-zinc-200 dark:hover:text-white dark:hover:bg-zinc-800 dark:hover:border-white/20 transition-colors font-semibold shadow-xs"
              >
                <span>{t('filterAll')}</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, index) => {
              const cardContent = (
                <SpotlightCard
                  spotlightColor={isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(67, 75, 206, 0.15)'}
                  className={cn(
                    'flex flex-col h-full p-5 justify-between cursor-pointer group transition-all duration-300 active:scale-[0.985] bg-white/95 dark:bg-zinc-950/80 border-slate-300 dark:border-white/10 shadow-sm',
                    index === 0
                      ? 'border-transparent dark:border-transparent bg-transparent dark:bg-transparent hover:border-transparent dark:hover:border-transparent'
                      : 'hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-300/40 dark:hover:shadow-white/5 hover:border-slate-400 dark:hover:border-white/30'
                  )}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="space-y-4">
                    {/* Project Image Banner */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-zinc-900/60 group/img transition-transform duration-300">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/90 text-white font-mono text-xs font-semibold border border-white/20 shadow-2xl backdrop-blur-md transform scale-90 group-hover:scale-100 transition-all duration-200">
                          <Eye className="w-4 h-4 text-white" />
                          <span>{isEn ? 'View Details' : 'Lihat Detail'}</span>
                        </span>
                      </div>
                      <div className="absolute top-2.5 right-2.5 z-10">
                        <Badge className="bg-slate-950 text-white dark:bg-zinc-900/90 border-slate-700 dark:border-white/20 font-bold shadow-xs">
                          {project.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg font-extrabold text-black dark:text-white group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-950 dark:text-zinc-300 mt-2 line-clamp-3 leading-relaxed font-medium">
                        {isEn ? project.description.en : project.description.id}
                      </p>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => {
                        const { icon: TechIcon, color } = getTechIcon(tag);
                        return (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-zinc-900/80 text-slate-950 dark:text-zinc-200 border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 hover:text-black dark:hover:text-white transition-colors font-bold shadow-xs"
                          >
                            <TechIcon className="w-3 h-3 shrink-0" style={{ color }} />
                            <span>{tag}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div
                    className="flex items-center gap-2 pt-5 mt-4 border-t border-slate-200 dark:border-white/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      onClick={() => setSelectedProject(project)}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs font-bold bg-white hover:bg-slate-100 border-slate-300 text-slate-950 dark:bg-zinc-900/80 dark:border-white/10 dark:text-zinc-200 dark:hover:text-white dark:hover:bg-zinc-800 dark:hover:border-white/20 transition-colors shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      <span>Detail</span>
                    </Button>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs font-bold bg-white hover:bg-slate-100 border-slate-300 text-slate-950 dark:bg-zinc-900/80 dark:border-white/10 dark:text-zinc-200 dark:hover:text-white dark:hover:bg-zinc-800 dark:hover:border-white/20 transition-colors shadow-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs font-bold bg-white hover:bg-slate-100 border-slate-300 text-slate-950 dark:bg-zinc-900/80 dark:border-white/10 dark:text-zinc-200 dark:hover:text-white dark:hover:bg-zinc-800 dark:hover:border-white/20 transition-colors shadow-xs"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </Button>
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              );

              if (index === 0) {
                return (
                  <BorderGlow
                    key={project.id}
                    glowColor={isDark ? '0 0% 100%' : '236 65% 55%'}
                    backgroundColor={isDark ? '#09090b' : '#ffffff'}
                    borderRadius={16}
                    glowIntensity={0.85}
                    className="h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-300/40 dark:hover:shadow-white/5"
                    contentClassName="h-full"
                  >
                    {cardContent}
                  </BorderGlow>
                );
              }

              return (
                <div key={project.id} className="h-full">
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </ScrollReveal>
  );
}
