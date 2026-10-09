'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { OverviewItem } from '@/modules/dashboard/components/OverviewItem';

interface CodingActiveOverviewProps {
  data?: {
    human_readable_total?: string;
    human_readable_daily_average?: string;
    best_day?: {
      text?: string;
      date?: string;
    };
    all_time_since_today?: {
      text?: string;
    };
    start_date?: string;
    end_date?: string;
  };
}

export const CodingActiveOverview = ({ data }: CodingActiveOverviewProps) => {
  const t = useTranslations('dashboard');

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const startDate = formatDate(data?.start_date);
  const endDate = formatDate(data?.end_date);
  const dailyAverage = data?.human_readable_daily_average || '3 hrs 45 mins';
  const totalThisWeek = data?.human_readable_total || '24 hrs 15 mins';
  const bestDay = data?.best_day?.text ? `${formatDate(data.best_day.date)} (${data.best_day.text})` : '6 hrs 45 mins';
  const allTimeSinceToday = data?.all_time_since_today?.text || '342 hrs 10 mins';

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <OverviewItem label={t('startDate')} value={startDate} />
      <OverviewItem label={t('endDate')} value={endDate} />
      <OverviewItem label={t('dailyAverage')} value={dailyAverage} />
      <OverviewItem label={t('totalThisWeek')} value={totalThisWeek} />
      <OverviewItem label={t('bestDay')} value={bestDay} />
      <OverviewItem label={t('allTimeSinceJoined')} value={allTimeSinceToday} />
    </div>
  );
};

export default CodingActiveOverview;
