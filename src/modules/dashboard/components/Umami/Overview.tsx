'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { OverviewItem } from '@/modules/dashboard/components/OverviewItem';

interface OverviewProps {
  data?: {
    websiteStats?: {
      pageviews?: { value: number };
      visitors?: { value: number };
      visits?: { value: number };
      countries?: { value: number };
      events?: { value: number };
    };
  };
}

export const UmamiOverview = ({ data }: OverviewProps) => {
  const t = useTranslations('dashboard');

  const pageviews = data?.websiteStats?.pageviews?.value ?? 3607;
  const visitors = data?.websiteStats?.visitors?.value ?? 1824;
  const visits = data?.websiteStats?.visits?.value ?? 2238;
  const countries = data?.websiteStats?.countries?.value ?? 19;
  const events = data?.websiteStats?.events?.value ?? 482;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <OverviewItem label={t('pageViews')} value={pageviews} />
      <OverviewItem label={t('visitors')} value={visitors} />
      <OverviewItem label={t('visits')} value={visits} />
      <OverviewItem label={t('countries')} value={countries} />
      <OverviewItem label={t('events')} value={events} />
    </div>
  );
};

export default UmamiOverview;
