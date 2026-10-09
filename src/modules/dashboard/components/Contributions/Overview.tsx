'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { OverviewItem } from '@/modules/dashboard/components/OverviewItem';

interface ContributionsOverviewProps {
  totalContributions: number;
  thisWeek: number;
  bestDay: number;
  average: number;
}

export const ContributionsOverview = ({
  totalContributions,
  thisWeek,
  bestDay,
  average,
}: ContributionsOverviewProps) => {
  const t = useTranslations('dashboard');

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <OverviewItem
        label={t('totalContributions')}
        value={totalContributions}
      />
      <OverviewItem
        label={t('thisWeekContributions')}
        value={thisWeek}
      />
      <OverviewItem
        label={t('bestDayContributions')}
        value={bestDay}
      />
      <OverviewItem
        label={t('averageContributions')}
        value={average}
        unit={`/ ${t('daysUnit')}`}
      />
    </div>
  );
};

export default ContributionsOverview;
