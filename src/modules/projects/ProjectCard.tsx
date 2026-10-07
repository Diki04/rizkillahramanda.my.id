'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Badge } from '@/common/components/Badge';
import { Button } from '@/common/components/Button';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { getTechIcon } from '@/common/utils/techIcons';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const isEn = locale === 'en';

  return (
    <SpotlightCard className="flex flex-col h-full p-5 justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-500/10 hover:border-sky-400/40 active:scale-[0.985]">
      <div className="space-y-4">
        {/* Thumbnail */}
        <div
          onClick={() => onOpenModal(project)}
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-navy-950 cursor-pointer group/img transition-transform duration-300"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-500/90 text-white font-mono text-xs font-semibold border border-white/20 shadow-2xl backdrop-blur-md transform scale-90 group-hover/img:scale-100 transition-all duration-200">
              <Eye className="w-4 h-4 text-white" />
              <span>{isEn ? 'View Details' : 'Lihat Detail'}</span>
            </span>
          </div>
          <div className="absolute top-2.5 right-2.5 z-10">
            <Badge variant="accent">{project.category}</Badge>
          </div>
        </div>

        {/* Title & Description */}
        <div onClick={() => onOpenModal(project)} className="cursor-pointer">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-300 transition-colors flex items-center justify-between gap-2">
            <span>{project.title}</span>
            <Eye className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-sky-500 transition-all shrink-0" />
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {isEn ? project.description.en : project.description.id}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => {
            const { icon: TechIcon, color } = getTechIcon(tag);
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-navy-950/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.06] hover:border-sky-400/40 transition-colors"
              >
                <TechIcon className="w-3 h-3 shrink-0" style={{ color }} />
                <span>{tag}</span>
              </span>
            );
          })}
          {project.tags.length > 4 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-navy-950/50 text-slate-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-200 dark:border-white/[0.06]">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="secondary" size="sm" className="w-full text-xs">
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              <span>{t('liveDemo')}</span>
            </Button>
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={project.demoUrl ? '' : 'flex-1'}
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs border-slate-200 dark:border-white/[0.1]"
          >
            <Github className="w-3.5 h-3.5 mr-1" />
            <span>{t('sourceCode')}</span>
          </Button>
        </a>
      </div>
    </SpotlightCard>
  );
}
