import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { Breadcrumb } from '@/common/components/Breadcrumb';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { Education } from '@/modules/about/Education';
import { CareerJourney } from '@/modules/about/CareerJourney';
import { SkillsMatrix } from '@/modules/about/SkillsMatrix';
import { DeveloperSetup } from '@/modules/home/DeveloperSetup';

export default function AboutPage() {
  const t = useTranslations('about');
  const tNav = useTranslations('nav');

  return (
    <Container className="py-16">
      <Breadcrumb items={[{ label: tNav('about') }]} />
      <ScrollReveal className="mb-12">
        <span className="font-mono text-xs uppercase tracking-wider text-sky-500 dark:text-sky-400 font-semibold">
          {t('title')}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          {t('heading')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
          {t('description')}
        </p>
      </ScrollReveal>

      <div className="space-y-16">
        <ScrollReveal>
          <CareerJourney />
        </ScrollReveal>
        <ScrollReveal>
          <Education />
        </ScrollReveal>
        <ScrollReveal>
          <SkillsMatrix />
        </ScrollReveal>
        <ScrollReveal>
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {t('devEnvironmentTitle')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('devEnvironmentSubtitle')}
            </p>
            <DeveloperSetup />
          </section>
        </ScrollReveal>
      </div>
    </Container>
  );
}
