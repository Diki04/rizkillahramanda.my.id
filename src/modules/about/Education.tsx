import React from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export function Education() {
  const t = useTranslations('about');

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-zinc-400 dark:text-zinc-400" />
        <span>{t('educationTitle')}</span>
      </h3>

      <SpotlightCard className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/[0.06] pb-4">
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Universitas Riau</h4>
            <p className="font-mono text-sm text-slate-700 dark:text-zinc-300 font-medium">{t('degree')}</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
              {t('educationPeriod')}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
              {t('educationLocation')}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          {t('educationDesc')}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-black text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/[0.06]">
            {t('educationTag1')}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-black text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/[0.06]">
            {t('educationTag2')}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-black text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/[0.06]">
            {t('educationTag3')}
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
}
