'use client';

import React, { useState } from 'react';
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

export interface MonthItem {
  name: string;
  firstDay: string;
  startWeekIndex: number;
  totalWeeks: number;
}

interface CalendarProps {
  weeks: WeekData[];
  months?: MonthItem[];
}

export const ContributionsCalendar = ({ weeks = [], months = [] }: CalendarProps) => {
  const [selectContribution, setSelectContribution] = useState<{
    count: number | null;
    date: string | null;
  }>({
    count: null,
    date: null,
  });

  const t = useTranslations('dashboard');
  const locale = useLocale();

  // Monochrome level styles
  const getLevelClass = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600';
      case 2:
        return 'bg-zinc-500 dark:bg-zinc-500 hover:bg-zinc-600 dark:hover:bg-zinc-400';
      case 3:
        return 'bg-zinc-700 dark:bg-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-200';
      case 4:
        return 'bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-zinc-100';
      case 0:
      default:
        return 'bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700/80';
    }
  };

  // Fallback month derivation if not provided
  const derivedMonths: MonthItem[] = React.useMemo(() => {
    if (months && months.length > 0) return months;
    const result: MonthItem[] = [];
    let currentM = -1;
    let curr: MonthItem | null = null;

    weeks.forEach((w, idx) => {
      if (w.contributionDays && w.contributionDays.length > 0) {
        const d = new Date(w.contributionDays[0].date);
        const m = d.getMonth();
        if (m !== currentM) {
          if (curr) curr.totalWeeks = idx - curr.startWeekIndex;
          currentM = m;
          curr = {
            name: d.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { month: 'short' }),
            firstDay: w.contributionDays[0].date,
            startWeekIndex: idx,
            totalWeeks: 1,
          };
          result.push(curr);
        } else if (curr) {
          curr.totalWeeks++;
        }
      }
    });
    return result;
  }, [months, weeks, locale]);

  return (
    <SpotlightCard className="p-4 sm:p-6 space-y-4">
      {/* Calendar Heatmap Container with Horizontal Scroll support */}
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-zinc-700">
        <div className="min-w-[780px] w-full flex flex-col gap-2">
          {/* Header Row: Month Labels Aligned above Weeks */}
          <div className="flex items-center">
            {/* Left Spacer for day labels */}
            <div className="w-7 flex-shrink-0" />

            {/* 53-Column Grid for Month Names */}
            <div
              className="flex-1 grid gap-[3px]"
              style={{ gridTemplateColumns: `repeat(${weeks.length || 53}, minmax(0, 1fr))` }}
            >
              {derivedMonths.map((m, idx) => (
                <div
                  key={`${m.name}-${idx}`}
                  style={{
                    gridColumnStart: m.startWeekIndex + 1,
                    gridColumnEnd: `span ${m.totalWeeks}`,
                  }}
                  className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 overflow-visible whitespace-nowrap"
                >
                  {m.name}
                </div>
              ))}
            </div>
          </div>

          {/* Body Row: Day Labels + 53-Column Weeks Grid */}
          <div className="flex items-center">
            {/* Day Labels (Mon, Wed, Fri) */}
            <div className="w-7 flex-shrink-0 flex flex-col justify-between h-[96px] sm:h-[108px] text-[9px] font-mono text-slate-400 dark:text-zinc-500 select-none pr-2">
              <span className="leading-none mt-3.5">Mon</span>
              <span className="leading-none">Wed</span>
              <span className="leading-none mb-3.5">Fri</span>
            </div>

            {/* 53 Columns Weeks Grid */}
            <div
              className="flex-1 grid gap-[3px]"
              style={{ gridTemplateColumns: `repeat(${weeks.length || 53}, minmax(0, 1fr))` }}
            >
              {weeks.map((week, wIdx) => (
                <div key={week.firstDay || wIdx} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day) => {
                    const isHovered = selectContribution.date === day.date;
                    return (
                      <motion.div
                        key={day.date}
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.15 }}
                        onMouseEnter={() =>
                          setSelectContribution({ count: day.count, date: day.date })
                        }
                        onMouseLeave={() =>
                          setSelectContribution({ count: null, date: null })
                        }
                        className={clsx(
                          'aspect-square w-full rounded-[2.5px] transition-colors cursor-pointer',
                          getLevelClass(day.level),
                          isHovered && 'ring-2 ring-slate-900 dark:ring-white z-20 scale-125'
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Less/More Legend & Realtime Hover Tooltip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono border-t border-slate-200/60 dark:border-white/[0.04]">
        <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
          <span>{t('less')}</span>
          <div className="flex gap-1 items-center">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 dark:bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-300 dark:bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-500 dark:bg-zinc-500" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-700 dark:bg-zinc-300" />
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
