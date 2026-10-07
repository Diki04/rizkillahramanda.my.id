import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { GitHubStats } from '@/modules/dashboard/GitHubStats';
import { WakatimeStats } from '@/modules/dashboard/WakatimeStats';
import { Activity } from 'lucide-react';

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="py-16 md:py-20 space-y-12">
      <Container size="xl">
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/10 text-accent-blue text-xs font-mono font-medium">
            <Activity className="w-3.5 h-3.5" />
            <span>Developer Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {t('title')}
          </h1>
          <p className="text-base text-slate-400">{t('subtitle')}</p>
        </div>

        {/* Dashboard Sections */}
        <div className="space-y-12 mt-8">
          <GitHubStats />
          <WakatimeStats />
        </div>
      </Container>
    </div>
  );
}
