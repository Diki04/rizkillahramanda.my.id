'use client';

import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';

export interface DayCell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface WeekData {
  firstDay: string;
  contributionDays: DayCell[];
}

interface CalendarProps {
  weeks: WeekData[];
}

export const ContributionsCalendar = ({ weeks }: CalendarProps) => {
  const [selectContribution, setSelectContribution] = useState<{
    count: number | null;
    date: string | null;
  }>({
    count: null,
    date: null,
  });

  const t = useTranslations('dashboard');
  const locale = useLocale();

  // Color mappings for light/dark mode levels 0-4
  const getLevelClass = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-slate-300 dark:bg-zinc-700';
      case 2:
        return 'bg-slate-500 dark:bg-zinc-500';
      case 3:
        return 'bg-slate-700 dark:bg-zinc-300';
      case 4:
        return 'bg-slate-900 dark:bg-white';
      case 0:
      default:
        return 'bg-slate-100 dark:bg-zinc-800/80';
    }
  };

  // Derive unique month labels from weeks
  const monthLabels = useMemo(() => {
    const labels: { name: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, wIndex) => {
      if (week.contributionDays && week.contributionDays.length > 0) {
        const d = new Date(week.contributionDays[0].date);
        const m = d.getMonth();
        if (m !== lastMonth) {
          labels.push({
            name: d.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { month: 'short' }),
            weekIndex: wIndex,
          });
          lastMonth = m;
        }
      }
    });

    return labels;
  }, [weeks, locale]);

  return (
    <SpotlightCard className="p-4 sm:p-6 space-y-4">
      {/* Scrollable Calendar Container */}
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-zinc-700">
        <div className="min-w-[720px] flex flex-col gap-1.5">
          {/* Month labels */}
          <div className="flex gap-[3px] text-[11px] font-mono text-slate-500 dark:text-zinc-400 pl-6 h-5">
            {monthLabels.map((m, idx) => (
              <span
                key={`${m.name}-${idx}`}
                style={{
                  marginLeft: idx === 0 ? `${m.weekIndex * 15}px` : `${Math.max(0, (m.weekIndex - (monthLabels[idx - 1]?.weekIndex || 0) - 1) * 15)}px`,
                }}
                className="whitespace-nowrap"
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* Calendar Grid: Weeks Columns */}
          <div className="flex gap-[3.5px]">
            {/* Day name indicators (Mon, Wed, Fri) */}
            <div className="flex flex-col justify-between text-[9px] font-mono text-slate-400 dark:text-zinc-500 pr-2 py-0.5 select-none">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {weeks.map((week, wIdx) => (
              <div key={week.firstDay || wIdx} className="flex flex-col gap-[3.5px]">
                {week.contributionDays.map((day) => {
                  const isHovered = selectContribution.date === day.date;
                  return (
                    <motion.div
                      key={day.date}
                      whileHover={{ scale: 1.35 }}
                      transition={{ duration: 0.15 }}
                      onMouseEnter={() =>
                        setSelectContribution({ count: day.count, date: day.date })
                      }
                      onMouseLeave={() =>
                        setSelectContribution({ count: null, date: null })
                      }
                      className={clsx(
                        'w-[11.5px] h-[11.5px] rounded-[2px] transition-colors cursor-pointer',
                        getLevelClass(day.level),
                        isHovered && 'ring-2 ring-slate-900 dark:ring-white z-10'
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend & Hover Status Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
          <span>{t('less')}</span>
          <div className="flex gap-1 items-center">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 dark:bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-300 dark:bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-500 dark:bg-zinc-500" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-700 dark:bg-zinc-300" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-900 dark:bg-white" />
          </div>
          <span>{t('more')}</span>
        </div>

        <div
          className={clsx(
            'px-3 py-1 rounded-md text-xs font-mono transition-opacity duration-200 border',
            selectContribution.date
              ? 'opacity-100 bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white border-slate-200 dark:border-white/10'
              : 'opacity-0 pointer-events-none'
          )}
        >
          <b>{selectContribution.count ?? 0}</b>{' '}
          {locale === 'en' ? 'contributions on' : 'kontribusi pada'}{' '}
          <span className="text-slate-600 dark:text-zinc-300">{selectContribution.date}</span>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default ContributionsCalendar;
