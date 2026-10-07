'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { CertificateCard } from '@/modules/achievements/CertificateCard';
import { CertificateModal } from '@/modules/achievements/CertificateModal';
import { mockAchievements } from '@/services/data/mock-achievements';
import { Achievement } from '@/types';
import { Award } from 'lucide-react';

export default function AchievementsPage() {
  const t = useTranslations('achievements');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  return (
    <div className="py-16 md:py-20 space-y-12">
      <Container size="xl">
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/20 bg-sky-400/10 text-sky-600 dark:text-accent-blue text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">{t('subtitle')}</p>
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {mockAchievements.map((achievement) => (
            <CertificateCard
              key={achievement.id}
              achievement={achievement}
              onOpenModal={setSelectedAchievement}
            />
          ))}
        </div>
      </Container>

      {/* Certificate Modal */}
      <CertificateModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </div>
  );
}
