'use client';

import React from 'react';
import Image from 'next/image';
import { Achievement } from '@/types';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { ArrowRight, Link2 } from 'lucide-react';
import { useTheme } from '@/common/contexts/ThemeContext';

interface AchievementCardProps {
  achievement: Achievement;
  onOpenModal: (achievement: Achievement) => void;
}

export function AchievementCard({
  achievement,
  onOpenModal,
}: AchievementCardProps) {
  const t = useTranslations('achievements');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      layoutId={`card-${achievement.id}`}
      onClick={() => onOpenModal(achievement)}
      className="h-full cursor-pointer select-none"
    >
      <SpotlightCard
        spotlightColor={isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(250, 204, 21, 0.15)'}
        className="group flex flex-col h-full overflow-hidden rounded-2xl border border-slate-300/90 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-950/85 hover:border-slate-400 dark:hover:border-zinc-700 transition-all duration-300 shadow-sm hover:shadow-2xl hover:-translate-y-1"
      >
        {/* Certificate Image Banner */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-slate-100 dark:bg-zinc-900">
          <motion.div
            layoutId={`image-${achievement.id}`}
            className="relative w-full h-full"
          >
            <Image
              src={achievement.image}
              alt={achievement.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>

          {/* Hover Overlay with View Detail */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              {t('viewDetail')}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 space-y-4">
          <div className="space-y-1.5">
            {achievement.credentialId && (
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-500 truncate">
                {achievement.credentialId}
              </p>
            )}
            <h3 className="line-clamp-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors leading-snug">
              {achievement.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
              {achievement.issuer}
            </p>
          </div>

          <div className="space-y-3">
            {/* Pill Tags: Type & Category */}
            <div className="flex flex-wrap gap-1.5">
              {achievement.type && (
                <span className="rounded-full border border-slate-300/80 dark:border-zinc-700/80 bg-slate-100 dark:bg-zinc-900 px-2.5 py-0.5 text-[10px] font-mono capitalize text-slate-700 dark:text-zinc-300">
                  {achievement.type}
                </span>
              )}
              {achievement.category && (
                <span className="rounded-full border border-slate-300/80 dark:border-zinc-700/80 bg-slate-100 dark:bg-zinc-900 px-2.5 py-0.5 text-[10px] font-mono capitalize text-slate-700 dark:text-zinc-300">
                  {achievement.category}
                </span>
              )}
            </div>

            {/* Issued on date & Link */}
            <div className="border-t border-slate-200 dark:border-zinc-800/80 pt-2.5 flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 dark:text-zinc-500">
              <span className="truncate">
                {t('issuedOn')} {achievement.issueDate}
              </span>
              {achievement.credentialUrl && (
                <a
                  href={achievement.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors shrink-0 ml-2"
                  title="Credential URL"
                >
                  <Link2 className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
