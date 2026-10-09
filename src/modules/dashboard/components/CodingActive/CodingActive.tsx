'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Clock, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/modules/dashboard/components/SectionHeading';
import { SectionSubHeading } from '@/modules/dashboard/components/SectionSubHeading';
import { CodingActiveOverview } from '@/modules/dashboard/components/CodingActive/Overview';
import { CodingActiveList } from '@/modules/dashboard/components/CodingActive/CodingActiveList';

export const CodingActiveSection = () => {
  const t = useTranslations('dashboard');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/read-stats')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => console.error('Error fetching coding telemetry:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="space-y-4">
      <SectionHeading
        title={t('codingActiveTitle')}
        icon={<Clock className="w-5 h-5 text-slate-900 dark:text-white" />}
      />

      <SectionSubHeading>
        <p>{t('codingActiveSubtitle')}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
            {t('lastUpdate')}: {data?.last_update ? new Date(data.last_update).toLocaleDateString() : 'Just now'}
          </span>
          <Link
            href="https://wakatime.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white"
          >
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </SectionSubHeading>

      <div className="space-y-4">
        <CodingActiveOverview data={data} />
        <CodingActiveList
          languages={data?.languages || []}
          editors={data?.editors || []}
        />
      </div>
    </section>
  );
};

export default CodingActiveSection;
