'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Activity, Globe, RefreshCw } from 'lucide-react';
import { SectionHeading } from '@/modules/dashboard/components/SectionHeading';
import { SectionSubHeading } from '@/modules/dashboard/components/SectionSubHeading';
import { UmamiOverview } from '@/modules/dashboard/components/Umami/Overview';
import { TrafficTrendsChart } from '@/modules/dashboard/components/Umami/TrafficTrendsChart';

export const UmamiSection = () => {
  const t = useTranslations('dashboard');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [domain, setDomain] = useState('all');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/umami?domain=${domain}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => console.error('Error fetching Umami analytics:', err))
      .finally(() => setLoading(false));
  }, [domain]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <SectionHeading
          title={t('umamiTitle')}
          icon={<Activity className="w-5 h-5 text-slate-900 dark:text-white" />}
        />
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry Live</span>
          </span>
        </div>
      </div>

      <SectionSubHeading>
        <p>{t('umamiSubtitle')}</p>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
          <Globe className="w-3.5 h-3.5" />
          <span>Domain: portfolio.diki04.dev</span>
        </div>
      </SectionSubHeading>

      <div className="space-y-5">
        <UmamiOverview data={data} />
        <TrafficTrendsChart data={data} />
      </div>
    </section>
  );
};

export default UmamiSection;
