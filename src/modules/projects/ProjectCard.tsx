'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { useTheme } from '@/common/contexts/ThemeContext';
import { Eye } from 'lucide-react';
import { getTechIcon } from '@/common/utils/techIcons';
import { useProjectViews } from '@/common/hooks/useProjectViews';

interface ProjectCardProps {
  project: Project;
  onOpenModal?: (project: Project) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEn = locale === 'en';

  // Real visitor views counter from API
  const { views } = useProjectViews(project.slug);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block h-full select-none"
      onClick={() => onOpenModal?.(project)}
    >
      <SpotlightCard
        spotlightColor={isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(250, 204, 21, 0.15)'}
        className="flex flex-col h-full p-4 sm:p-5 justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-300/40 dark:hover:shadow-white/5 hover:border-slate-400 dark:hover:border-white/25 rounded-2xl cursor-pointer bg-white/95 dark:bg-zinc-950/80 border-slate-300/90 dark:border-white/10"
      >
        <div className="space-y-4">
          {/* Thumbnail */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-zinc-900/60 group/img">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover/img:scale-105"
            />
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
              {isEn ? project.description.en : project.description.id}
            </p>
          </div>

          {/* Tech Icons Row */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            {project.tags.slice(0, 6).map((tag) => {
              const { icon: TechIcon, color } = getTechIcon(tag);
              return (
                <span
                  key={tag}
                  title={tag}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-zinc-300 shadow-2xs hover:scale-110 transition-transform"
                >
                  <TechIcon className="w-4 h-4 shrink-0" style={{ color }} />
                </span>
              );
            })}
          </div>
        </div>

        {/* Real Visitor Views Pill */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 dark:border-white/10 text-xs font-mono">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 border border-slate-200 dark:border-white/10">
            <Eye className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span>
              {views} {t('views')}
            </span>
          </span>
        </div>
      </SpotlightCard>
    </Link>
  );
}
