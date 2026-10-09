'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';

interface ProfileProps {
  data?: {
    name?: string;
    addedAt?: number;
    streak?: number;
    maxStreak?: number;
    xp?: number;
    typingStats?: {
      startedTests?: number;
      completedTests?: number;
      timeTyping?: number;
    };
  };
}

export const MonkeytypeProfile = ({ data }: ProfileProps) => {
  const t = useTranslations('dashboard');

  const name = data?.name || 'Rizkillah';
  const streak = data?.streak || 5;
  const maxStreak = data?.maxStreak || 12;

  const addedAtDate = data?.addedAt ? new Date(data.addedAt) : new Date(2024, 2, 9);
  const formattedJoined = addedAtDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const timeTyping = data?.typingStats?.timeTyping || 4820;
  const hours = Math.floor(timeTyping / 3600);
  const minutes = Math.floor((timeTyping % 3600) / 60);
  const seconds = Math.floor(timeTyping % 60);
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Level & XP math
  let remainingXp = data?.xp || 3450;
  let level = 1;
  let xpNeeded = 100;
  while (remainingXp >= xpNeeded) {
    remainingXp -= xpNeeded;
    xpNeeded += 49;
    level++;
  }
  const xpToNextLevel = level * 49 + 100;
  const progressPercent = Math.min(100, Math.round((remainingXp / xpToNextLevel) * 100));

  return (
    <SpotlightCard className="p-4 sm:p-6 flex flex-col lg:flex-row items-center gap-6">
      {/* Left: Avatar + Details + XP */}
      <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[320px]">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 flex-shrink-0">
            <Image
              src="/avatar.jpg"
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              {name}
            </h3>
            <span className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              {t('joined')} {formattedJoined}
            </span>
            <span className="text-xs text-slate-500 dark:text-zinc-400">
              {t('currentStreak')}: <b className="text-slate-800 dark:text-zinc-200">{streak} {t('daysUnit')}</b> (Max {maxStreak})
            </span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="flex items-center gap-3 pt-1">
          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
            Lv.{level}
          </span>
          <div className="relative flex-1 h-2 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-slate-900 dark:bg-white"
            />
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 whitespace-nowrap">
            {remainingXp}/{xpToNextLevel} XP
          </span>
        </div>
      </div>

      {/* Vertical divider */}
      <div className="hidden lg:block w-[1px] h-20 bg-slate-200 dark:bg-white/[0.08]" />

      {/* Right: Typing Stats Grid */}
      <div className="flex-1 w-full grid grid-cols-3 gap-2 text-center py-2 bg-slate-50/50 dark:bg-zinc-950/40 rounded-xl border border-slate-200/60 dark:border-white/[0.04]">
        <div className="flex flex-col items-center justify-center p-2">
          <span className="text-xs text-slate-500 dark:text-zinc-400">{t('testsStarted')}</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {data?.typingStats?.startedTests || 158}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-2 border-x border-slate-200/60 dark:border-white/[0.06]">
          <span className="text-xs text-slate-500 dark:text-zinc-400">{t('testsCompleted')}</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {data?.typingStats?.completedTests || 142}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-2">
          <span className="text-xs text-slate-500 dark:text-zinc-400">{t('timeTyping')}</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {formattedTime}
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default MonkeytypeProfile;
