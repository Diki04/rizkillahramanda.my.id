'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { OverviewItem } from '@/modules/dashboard/components/OverviewItem';

interface CodewarsOverviewProps {
  data?: {
    ranks?: {
      overall?: {
        rank: number;
        name: string;
      };
    };
    honor?: number;
    codeChallenges?: {
      totalCompleted: number;
    };
    leaderboardPosition?: number | null;
    clan?: string | null;
    skills?: string[] | null;
  };
}

export const CodewarsOverview = ({ data }: CodewarsOverviewProps) => {
  const t = useTranslations('dashboard');

  const rawRank = data?.ranks?.overall?.rank ?? -8;
  const rank = Math.abs(rawRank);
  const honor = data?.honor ?? 1;
  const completed = data?.codeChallenges?.totalCompleted ?? 0;
  const leaderboard = data?.leaderboardPosition ? `#${data.leaderboardPosition}` : 'Top 10%';
  const clan = data?.clan || 'Independent';
  const skills = data?.skills && data.skills.length > 0 ? data.skills.join(', ') : 'TypeScript, JavaScript, Python';

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewItem
          label={t('codewarsRank')}
          value={rank}
          unit="kyu"
        />
        <OverviewItem
          label={t('codewarsHonor')}
          value={honor}
        />
        <OverviewItem
          label={t('codewarsCompleted')}
          value={completed}
        />
        <OverviewItem
          label={t('codewarsLeaderboard')}
          value={leaderboard}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <OverviewItem
          label={t('codewarsClan')}
          value={clan}
        />
        <OverviewItem
          label={t('codewarsSkills')}
          value={skills}
        />
      </div>
    </div>
  );
};

export default CodewarsOverview;
