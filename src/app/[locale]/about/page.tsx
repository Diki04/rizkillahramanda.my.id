import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/common/components/Container';
import { Education } from '@/modules/about/Education';
import { CareerJourney } from '@/modules/about/CareerJourney';
import { SkillsMatrix } from '@/modules/about/SkillsMatrix';
import { mockProfile } from '@/services/data/mock-profile';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { User, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  const isEn = locale === 'en';

  return (
    <div className="py-16 md:py-20 space-y-16">
      <Container size="xl">
        {/* Page Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/10 text-accent-blue text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {t('title')}
          </h1>
          <p className="text-base text-slate-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Bio Section */}
        <div className="mt-10">
          <SpotlightCard className="p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-accent-blue font-mono text-sm font-semibold">
              <User className="w-4 h-4" />
              <span>{t('bioTitle')}</span>
            </div>
            <p className="text-base text-slate-300 leading-relaxed max-w-4xl">
              {isEn ? mockProfile.bio.en : mockProfile.bio.id}
            </p>
          </SpotlightCard>
        </div>

        {/* Grid: Education & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <Education />
          <CareerJourney />
        </div>

        {/* Skills Matrix */}
        <div className="mt-12">
          <SkillsMatrix />
        </div>
      </Container>
    </div>
  );
}
