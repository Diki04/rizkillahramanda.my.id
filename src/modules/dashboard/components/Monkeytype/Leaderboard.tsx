'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Trophy } from 'lucide-react';

interface LeaderboardProps {
  data?: {
    allTimeLbs?: {
      time?: {
        '15'?: { english?: { rank: number; count: number } };
        '60'?: { english?: { rank: number; count: number } };
      };
    };
  };
}

export const MonkeytypeLeaderboard = ({ data }: LeaderboardProps) => {
  const t = useTranslations('dashboard');

  const lb15 = data?.allTimeLbs?.time?.['15']?.english || { rank: 1420, count: 54200 };
  const lb60 = data?.allTimeLbs?.time?.['60']?.english || { rank: 2180, count: 68100 };

  const percent15 = ((lb15.rank / lb15.count) * 100).toFixed(2);
  const percent60 = ((lb60.rank / lb60.count) * 100).toFixed(2);

  return (
    <SpotlightCard className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          {t('leaderboard')}
        </span>
      </div>

      <div className="flex items-center gap-8">
        {/* 15s */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-xs text-slate-500 dark:text-zinc-400">15 {t('secondsUnit')}</span>
            <span className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
              Top {percent15}%
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {lb15.rank}
            </span>
            <span className="text-xs text-slate-400 font-mono ml-0.5">th</span>
          </div>
        </div>

        {/* 60s */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-xs text-slate-500 dark:text-zinc-400">60 {t('secondsUnit')}</span>
            <span className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
              Top {percent60}%
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {lb60.rank}
            </span>
            <span className="text-xs text-slate-400 font-mono ml-0.5">th</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default MonkeytypeLeaderboard;
