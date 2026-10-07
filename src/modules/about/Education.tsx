import React from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export function Education() {
  const t = useTranslations('about');

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-accent-blue" />
        <span>{t('educationTitle')}</span>
      </h3>

      <SpotlightCard className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/[0.06] pb-4">
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Universitas Riau</h4>
            <p className="font-mono text-sm text-accent-blue font-medium">{t('degree')}</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              2024 - Sekarang
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              Pekanbaru, Riau
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Mempelajari fondasi ilmu komputer dan rekayasa perangkat lunak secara komprehensif, mencakup struktur data & algoritma, arsitektur basis data, pengembangan web full-stack, serta kecerdasan buatan dan machine learning.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-navy-950/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.06]">
            GPA Oriented & Research Active
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-navy-950/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.06]">
            Algoritma & Struktur Data
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-navy-950/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.06]">
            Rekayasa Perangkat Lunak
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
}
