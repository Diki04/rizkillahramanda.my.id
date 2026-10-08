import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { Breadcrumb } from '@/common/components/Breadcrumb';
import { ScrollReveal } from '@/common/components/ScrollReveal';

const GitHubStats = dynamic(
  () => import('@/modules/dashboard/GitHubStats').then((mod) => mod.GitHubStats),
  { ssr: true }
);

const MonkeytypeStats = dynamic(
  () => import('@/modules/dashboard/MonkeytypeStats').then((mod) => mod.MonkeytypeStats),
  { ssr: true }
);

const CodewarsStats = dynamic(
  () => import('@/modules/dashboard/CodewarsStats').then((mod) => mod.CodewarsStats),
  { ssr: true }
);

const WakatimeStats = dynamic(
  () => import('@/modules/dashboard/WakatimeStats').then((mod) => mod.WakatimeStats),
  { ssr: true }
);

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tNav = useTranslations('nav');

  return (
    <Container className="py-16">
      <Breadcrumb items={[{ label: tNav('dashboard') }]} />
      <ScrollReveal className="mb-12">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-900 dark:text-zinc-400 font-semibold">
          {t('badge')}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          {t('mainHeading')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
          {t('mainDescription')}
        </p>
      </ScrollReveal>

      <div className="space-y-10">
        <ScrollReveal>
          <GitHubStats />
        </ScrollReveal>
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MonkeytypeStats />
            <CodewarsStats />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <WakatimeStats />
        </ScrollReveal>
      </div>
    </Container>
  );
}
