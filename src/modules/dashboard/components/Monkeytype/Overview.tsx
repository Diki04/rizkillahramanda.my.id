'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MonkeytypeOverviewItem } from '@/modules/dashboard/components/Monkeytype/OverviewItem';

interface OverviewProps {
  data?: {
    personalBests?: {
      time?: Record<string, any[]>;
      words?: Record<string, any[]>;
    };
  };
}

export const MonkeytypeOverview = ({ data }: OverviewProps) => {
  const t = useTranslations('dashboard');

  const timeData = data?.personalBests?.time;
  const wordsData = data?.personalBests?.words;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {timeData && (
        <MonkeytypeOverviewItem
          data={timeData}
          type={t('secondsUnit')}
        />
      )}
      {wordsData && (
        <MonkeytypeOverviewItem
          data={wordsData}
          type={t('wordsUnit')}
        />
      )}
    </div>
  );
};

export default MonkeytypeOverview;
