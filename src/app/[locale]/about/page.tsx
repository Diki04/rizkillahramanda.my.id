import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { Breadcrumb } from '@/common/components/Breadcrumb';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { AboutIntro } from '@/modules/about/AboutIntro';
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
      
      <ScrollReveal className="mb-16">
        <AboutIntro />
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
