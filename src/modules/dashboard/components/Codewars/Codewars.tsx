'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Terminal, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/modules/dashboard/components/SectionHeading';
import { SectionSubHeading } from '@/modules/dashboard/components/SectionSubHeading';
import { CodewarsOverview } from '@/modules/dashboard/components/Codewars/Overview';

export const CodewarsSection = () => {
  const t = useTranslations('dashboard');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/codewars')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => console.error('Error fetching Codewars data:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="space-y-4">
      <SectionHeading
        title={t('codewarsTitle')}
        icon={<Terminal className="w-5 h-5 text-slate-900 dark:text-white" />}
      />

      <SectionSubHeading>
        <p>{t('codewarsSubtitle')}</p>
        <Link
          href="https://www.codewars.com/users/Diki04"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-md bg-white/50 dark:bg-zinc-900/50"
        >
          <span>Codewars / Diki04</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </SectionSubHeading>

      <CodewarsOverview data={data} />
    </section>
  );
};

export default CodewarsSection;
