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

import { Terminal } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('about');
  const tNav = useTranslations('nav');

  return (
    <Container size="xl" className="min-h-[calc(100vh-5rem)] py-12 md:py-16">
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
          <section className="space-y-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2.5">
                <Terminal className="w-6 h-6 text-black dark:text-white shrink-0 transition-colors" />
                <span>{t('devEnvironmentTitle')}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1">
                {t('devEnvironmentSubtitle')}
              </p>
            </div>
            <DeveloperSetup />
          </section>
        </ScrollReveal>
      </div>
    </Container>
  );
}
