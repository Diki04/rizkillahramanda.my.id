'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Badge } from '@/common/components/Badge';
import { Button } from '@/common/components/Button';
import { ExternalLink, Github, Eye } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const isEn = locale === 'en';

  return (
    <SpotlightCard className="flex flex-col h-full p-5 justify-between">
      <div className="space-y-4">
        {/* Thumbnail */}
        <div
          onClick={() => onOpenModal(project)}
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/[0.08] bg-navy-950 cursor-pointer group/img"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900/90 text-white font-mono text-xs border border-white/[0.1]">
              <Eye className="w-3.5 h-3.5 text-accent-blue" />
              Detail
            </span>
          </div>
          <div className="absolute top-2.5 right-2.5">
            <Badge variant="accent">{project.category}</Badge>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3
            onClick={() => onOpenModal(project)}
            className="text-base font-semibold text-white group-hover:text-accent-blue transition-colors cursor-pointer"
          >
            {project.title}
          </h3>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {isEn ? project.description.en : project.description.id}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-950/80 text-slate-300 border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-navy-950/50 text-slate-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-4 mt-4 border-t border-white/[0.06]">
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
            className="w-full text-xs border-white/[0.1]"
          >
            <Github className="w-3.5 h-3.5 mr-1" />
            <span>{t('sourceCode')}</span>
          </Button>
        </a>
      </div>
    </SpotlightCard>
  );
}
