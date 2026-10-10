'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Keyboard, Zap, ExternalLink, Trophy, Flame, CheckCircle, Clock, Target } from 'lucide-react';
import { SectionHeading } from '@/modules/dashboard/components/SectionHeading';
import { SectionSubHeading } from '@/modules/dashboard/components/SectionSubHeading';
import { SpotlightCard } from '@/common/components/SpotlightCard';

export const MonkeytypeSection = () => {
  const t = useTranslations('dashboard');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/monkeytype')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => console.error('Error fetching Monkeytype data:', err))
      .finally(() => setLoading(false));
  }, []);

  const name = data?.name || 'Rizkillah';
  const streak = data?.streak || 1;
  const maxStreak = data?.maxStreak || 1;

  // Joined date formatting
  const addedAtDate = data?.addedAt ? new Date(data.addedAt) : new Date(2026, 9, 7);
  const formattedJoined = addedAtDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Typing time calculation
  const timeTyping = data?.typingStats?.timeTyping || 89.05;
  const hours = Math.floor(timeTyping / 3600);
  const minutes = Math.floor((timeTyping % 3600) / 60);
  const seconds = Math.floor(timeTyping % 60);
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Level & XP calculation
  let remainingXp = data?.xp || 194;
  let level = 1;
  let xpNeeded = 100;
  while (remainingXp >= xpNeeded) {
    remainingXp -= xpNeeded;
    xpNeeded += 49;
    level++;
  }
  const xpToNextLevel = level * 49 + 100;
  const progressPercent = Math.min(100, Math.round((remainingXp / xpToNextLevel) * 100));

  // Genuine Personal Best extraction (30s)
  const pb30 = data?.personalBests?.time?.['30']?.[0] || {
    wpm: 55.16,
    raw: 55.16,
    acc: 98.58,
    consistency: 73,
    timestamp: 1791369669270,
    language: 'english',
  };

  const pbDate = pb30.timestamp
    ? new Date(pb30.timestamp).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : formattedJoined;

  return (
    <section className="space-y-4">
      <SectionHeading
        title={t('monkeytypeTitle')}
        icon={<Keyboard className="w-5 h-5 text-slate-900 dark:text-white" />}
      />

      <SectionSubHeading>
        <p>{t('monkeytypeSubtitle')}</p>
        <Link
          href="https://monkeytype.com/profile/rizkillah"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-md bg-white/50 dark:bg-zinc-900/50"
        >
          <span>Monkeytype / {name}</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </SectionSubHeading>

      {/* Balanced 2-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Profil & Level Progression */}
        <SpotlightCard className="p-5 sm:p-6 flex flex-col justify-between space-y-5">
          {/* Top: Avatar, Name, Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 flex-shrink-0 shadow-sm">
                <Image
                  src="/avatar.jpg"
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                    Live Profile
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  <span>{t('joined')} {formattedJoined}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-700 dark:text-zinc-300 font-medium">
                    <Flame className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                    {streak} {t('daysUnit')} streak
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Level & XP Progression Bar */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-slate-200/60 dark:border-white/[0.04]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
                Level {level}
              </span>
              <span className="text-slate-500 dark:text-zinc-400">
                {remainingXp} / {xpToNextLevel} XP ({progressPercent}%)
              </span>
            </div>
            <div className="relative h-2 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-slate-900 dark:bg-white"
              />
            </div>
          </div>

          {/* 3 Symmetrical Stat Counters */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-slate-200/60 dark:border-white/[0.04]">
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 block line-clamp-1">{t('testsStarted')}</span>
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1 block">
                {data?.typingStats?.startedTests ?? 3}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-slate-200/60 dark:border-white/[0.04]">
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 block line-clamp-1">{t('testsCompleted')}</span>
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1 block">
                {data?.typingStats?.completedTests ?? 3}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-slate-200/60 dark:border-white/[0.04]">
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 block line-clamp-1">{t('timeTyping')}</span>
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1 block">
                {formattedTime}
              </span>
            </div>
          </div>
        </SpotlightCard>

        {/* Card 2: Rekor Terbaik (Personal Best Performance) */}
        <SpotlightCard className="p-5 sm:p-6 flex flex-col justify-between space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-slate-900 dark:text-white" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Rekor Terbaik
              </h4>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
              Mode 30s • English
            </span>
          </div>

          {/* Hero Big Metrics: WPM & Accuracy */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-slate-200/60 dark:border-white/[0.04]">
            <div className="space-y-0.5">
              <span className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 font-medium">
                <Target className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
                Kecepatan (WPM)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
                  {Math.round(pb30.wpm)}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">wpm</span>
              </div>
            </div>

            <div className="space-y-0.5 border-l border-slate-200 dark:border-white/[0.06] pl-4">
              <span className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
                Akurasi
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
                  {pb30.acc.toFixed(1)}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">%</span>
              </div>
            </div>
          </div>

          {/* Secondary Stats Row */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-slate-200/60 dark:border-white/[0.04]">
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 block">Raw WPM</span>
              <span className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5 block">
                {pb30.raw.toFixed(1)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-slate-200/60 dark:border-white/[0.04]">
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 block">Konsistensi</span>
              <span className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5 block">
                {pb30.consistency}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-slate-200/60 dark:border-white/[0.04]">
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 block">Tanggal</span>
              <span className="text-xs font-mono text-slate-800 dark:text-zinc-200 mt-1 block truncate">
                {pbDate}
              </span>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};

export default MonkeytypeSection;
