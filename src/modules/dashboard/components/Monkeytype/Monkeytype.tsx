'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Keyboard, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/modules/dashboard/components/SectionHeading';
import { SectionSubHeading } from '@/modules/dashboard/components/SectionSubHeading';
import { MonkeytypeProfile } from '@/modules/dashboard/components/Monkeytype/Profile';
import { MonkeytypeLeaderboard } from '@/modules/dashboard/components/Monkeytype/Leaderboard';
import { MonkeytypeOverview } from '@/modules/dashboard/components/Monkeytype/Overview';

export const MonkeytypeSection = () => {
  const t = useTranslations('dashboard');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/monkeytype')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => console.error('Error fetching Monkeytype data:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="space-y-4">
      <SectionHeading
        title={t('monkeytypeTitle')}
        icon={<Keyboard className="w-5 h-5 text-slate-900 dark:text-white" />}
      />

      <SectionSubHeading>
        <p>{t('monkeytypeSubtitle')}</p>
        <Link
          href="https://monkeytype.com/profile/rizkillah"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-md bg-white/50 dark:bg-zinc-900/50"
        >
          <span>Monkeytype / {data?.name || 'Rizkillah'}</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </SectionSubHeading>

      <div className="space-y-4">
        <MonkeytypeProfile data={data} />
        <MonkeytypeLeaderboard data={data} />
        <MonkeytypeOverview data={data} />
      </div>
    </section>
  );
};

export default MonkeytypeSection;
