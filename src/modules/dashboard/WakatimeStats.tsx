'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { MetricsCard } from '@/modules/dashboard/MetricsCard';
import { WakatimeStats as IWakatimeStats } from '@/types';
import { Clock, Flame, Code2, BarChart2 } from 'lucide-react';

export function WakatimeStats() {
  const t = useTranslations('dashboard');
  const [stats, setStats] = useState<IWakatimeStats>({
    totalHours: '142 hrs 30 mins',
    dailyAverage: '3 hrs 45 mins',
    languages: [
      { name: 'TypeScript', percent: 42.5, text: '60 hrs 35 mins' },
      { name: 'JavaScript', percent: 28.1, text: '40 hrs 05 mins' },
      { name: 'Python', percent: 18.4, text: '26 hrs 15 mins' },
      { name: 'HTML & CSS', percent: 7.2, text: '10 hrs 15 mins' },
      { name: 'Other', percent: 3.8, text: '5 hrs 20 mins' },
    ],
  });

  useEffect(() => {
    fetch('/api/wakatime')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setStats(json.data);
        }
      })
      .catch((err) => console.error('Error fetching wakatime data', err));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-zinc-400 dark:text-zinc-400" />
          <span>{t('wakatimeStats')}</span>
        </h3>
        <span className="text-xs font-mono text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 px-2.5 py-1 rounded-full">
          Live Coding Stream
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricsCard
          title={t('totalHours')}
          value={stats.totalHours}
          subtitle="Total recorded time"
          icon={Flame}
          color="amber"
        />
        <MetricsCard
          title={t('dailyAverage')}
          value={stats.dailyAverage}
          subtitle="Daily coding discipline"
          icon={Code2}
          color="emerald"
        />
      </div>

      {/* Language Breakdown */}
      <SpotlightCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] pb-3">
          <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-zinc-400 dark:text-zinc-400" />
            {t('topLanguages')}
          </span>
          <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">By usage percentage</span>
        </div>

        <div className="space-y-3 pt-2">
          {stats.languages.map((lang) => (
            <div key={lang.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 dark:text-zinc-200 font-medium">{lang.name}</span>
                <span className="text-slate-500 dark:text-zinc-400">{lang.percent}% ({lang.text})</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-black overflow-hidden border border-slate-200 dark:border-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-zinc-700 to-white dark:from-zinc-500 dark:to-white transition-all duration-700"
                  style={{ width: `${lang.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </div>
  );
}
