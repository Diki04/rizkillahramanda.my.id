'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import { X, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { Button } from '@/common/components/Button';
import { Badge } from '@/common/components/Badge';
import { getTechIcon } from '@/common/utils/techIcons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const isEn = locale === 'en';

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.12] bg-navy-900 p-6 shadow-2xl shadow-cyan-950/40 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-navy-800 text-slate-400 hover:text-white border border-white/[0.08] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/[0.08] bg-navy-950">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="accent">{project.category}</Badge>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-accent-blue" />
              <span>{project.createdAt}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300 leading-relaxed">
            {isEn ? project.description.en : project.description.id}
          </p>

          {/* Technologies */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-accent-blue" />
              Tech Stack & Libraries
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => {
                const { icon: TechIcon, color } = getTechIcon(tag);
                return (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-navy-950 text-slate-200 border border-white/[0.08] hover:border-white/[0.15] transition-colors"
                  >
                    <TechIcon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                    <span>{tag}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="secondary" size="md" className="w-full text-xs">
                  <ExternalLink className="w-4 h-4 mr-1.5" />
                  <span>{t('liveDemo')}</span>
                </Button>
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={project.demoUrl ? 'flex-1' : 'w-full'}
            >
              <Button variant="outline" size="md" className="w-full text-xs">
                <Github className="w-4 h-4 mr-1.5" />
                <span>{t('sourceCode')}</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
