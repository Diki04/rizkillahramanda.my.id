'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { useTheme } from '@/common/contexts/ThemeContext';
import { Bookmark, Plus, Globe } from 'lucide-react';
import { getTechIcon } from '@/common/utils/techIcons';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEn = locale === 'en';

  // Interactive local reaction counts
  const [reactions, setReactions] = useState(
    project.reactions || [
      { emoji: '🌐', count: 3 },
      { emoji: '🤪', count: 3 },
      { emoji: '🤓', count: 2 },
    ]
  );
  const [userReacted, setUserReacted] = useState(false);

  const handleAddReaction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userReacted) {
      setReactions((prev) => [
        ...prev,
        { emoji: '🚀', count: 1 },
      ]);
      setUserReacted(true);
    }
  };

  return (
    <SpotlightCard
      spotlightColor={isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(250, 204, 21, 0.15)'}
      className="flex flex-col h-full p-4 sm:p-5 justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-300/40 dark:hover:shadow-white/5 hover:border-slate-400 dark:hover:border-white/25 rounded-2xl cursor-pointer bg-white/95 dark:bg-zinc-950/80 border-slate-300/90 dark:border-white/10"
    >
      <div className="space-y-4" onClick={() => onOpenModal(project)}>
        {/* Thumbnail with Featured Ribbon */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-zinc-900/60 group/img">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
          />

          {/* Yellow Featured Badge in Top Right */}
          {project.featured && (
            <div className="absolute top-0 right-0 z-10">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#facc15] text-black font-mono text-[11px] font-black rounded-bl-xl shadow-md">
                <Bookmark className="w-3 h-3 fill-black text-black" />
                <span>{t('featured')}</span>
              </span>
            </div>
          )}
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

      {/* Bottom Reactions & View Pills */}
      <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-200 dark:border-white/10 flex-wrap">
        {/* Views Count Pill */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 border border-slate-200 dark:border-white/10">
          <Globe className="w-3 h-3 text-slate-500 dark:text-zinc-400" />
          <span>{project.views || 3}</span>
        </span>

        {/* Emoji Reactions */}
        {reactions.map((react, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-300 border border-slate-200 dark:border-white/10"
          >
            <span>{react.emoji}</span>
            <span>{react.count}</span>
          </span>
        ))}

        {/* Interactive Add Reaction Button */}
        <button
          type="button"
          onClick={handleAddReaction}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors text-xs font-bold"
          title="Add reaction"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </SpotlightCard>
  );
}
