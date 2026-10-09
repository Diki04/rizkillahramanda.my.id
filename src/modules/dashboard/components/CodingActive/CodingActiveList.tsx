'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { CodingProgress } from '@/modules/dashboard/components/CodingActive/Progress';
import { Code2, Laptop } from 'lucide-react';

interface ItemProps {
  name: string;
  percent?: number;
  text?: string;
}

interface CodingActiveListProps {
  languages?: ItemProps[];
  editors?: ItemProps[];
}

export const CodingActiveList = ({ languages = [], editors = [] }: CodingActiveListProps) => {
  const t = useTranslations('dashboard');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Languages */}
      <SpotlightCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] pb-3">
          <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Code2 className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
            {t('languages')}
          </span>
          <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">By usage percentage</span>
        </div>

        <div className="space-y-2.5 pt-1">
          {languages.map((lang) => (
            <CodingProgress key={lang.name} data={lang} />
          ))}
        </div>
      </SpotlightCard>

      {/* Editors */}
      <SpotlightCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] pb-3">
          <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Laptop className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
            {t('editors')}
          </span>
          <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">Development environments</span>
        </div>

        <div className="space-y-2.5 pt-1">
          {editors.map((ed) => (
            <CodingProgress key={ed.name} data={ed} />
          ))}
        </div>
      </SpotlightCard>
    </div>
  );
};

export default CodingActiveList;
