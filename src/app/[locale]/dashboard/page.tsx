import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { Breadcrumb } from '@/common/components/Breadcrumb';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { Breakline } from '@/common/components/Breakline';

const ContributionsSection = dynamic(
  () => import('@/modules/dashboard/components/Contributions/Contributions').then((mod) => mod.ContributionsSection),
  { ssr: true }
);

const CodingActiveSection = dynamic(
  () => import('@/modules/dashboard/components/CodingActive/CodingActive').then((mod) => mod.CodingActiveSection),
  { ssr: true }
);

const CodewarsSection = dynamic(
  () => import('@/modules/dashboard/components/Codewars/Codewars').then((mod) => mod.CodewarsSection),
  { ssr: true }
);

const MonkeytypeSection = dynamic(
  () => import('@/modules/dashboard/components/Monkeytype/Monkeytype').then((mod) => mod.MonkeytypeSection),
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

      <div className="space-y-4">
        {/* 1. GitHub Contributions & Heatmap */}
        <ScrollReveal>
          <ContributionsSection />
        </ScrollReveal>

        <Breakline className="my-10" />

        {/* 2. Coding Activity & Repository Languages */}
        <ScrollReveal>
          <CodingActiveSection />
        </ScrollReveal>

        <Breakline className="my-10" />

        {/* 3. Codewars / Problem Solving */}
        <ScrollReveal>
          <CodewarsSection />
        </ScrollReveal>

        <Breakline className="my-10" />

        {/* 4. Monkeytype / Typing Metrics */}
        <ScrollReveal>
          <MonkeytypeSection />
        </ScrollReveal>
      </div>
    </Container>
  );
}
