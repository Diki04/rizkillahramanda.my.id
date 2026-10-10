'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Github, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/modules/dashboard/components/SectionHeading';
import { SectionSubHeading } from '@/modules/dashboard/components/SectionSubHeading';
import { ContributionsOverview } from '@/modules/dashboard/components/Contributions/Overview';
import { ContributionsCalendar } from '@/modules/dashboard/components/Contributions/Calendar';
import { GitHubRecentCommits } from '@/modules/dashboard/GitHubRecentCommits';

export const ContributionsSection = () => {
  const t = useTranslations('dashboard');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github/contributions')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => console.error('Error fetching contributions:', err))
      .finally(() => setLoading(false));
  }, []);

  const totalContributions = data?.totalContributions || 844;
  const thisWeek = data?.thisWeek || 14;
  const bestDay = data?.bestDay || 47;
  const average = data?.average || 3;
  const weeks = data?.weeks || [];

  return (
    <section className="space-y-4">
      <SectionHeading
        title={t('githubContributionsTitle')}
        icon={<Github className="w-5 h-5 text-slate-900 dark:text-white" />}
      />

      <SectionSubHeading>
        <p>{t('githubContributionsSubtitle')}</p>
        <Link
          href="https://github.com/Diki04"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-md bg-white/50 dark:bg-zinc-900/50"
        >
          <span>@Diki04</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </SectionSubHeading>

      <div className="space-y-4">
        <ContributionsOverview
          totalContributions={totalContributions}
          thisWeek={thisWeek}
          bestDay={bestDay}
          average={average}
        />
        <ContributionsCalendar weeks={weeks} months={data?.months} />
        <GitHubRecentCommits />
      </div>
    </section>
  );
};

export default ContributionsSection;
