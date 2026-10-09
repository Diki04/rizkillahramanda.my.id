import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { GraduationCap } from 'lucide-react';
import { UnriEmblem, HighSchoolEmblem } from './EducationEmblems';

export function Education() {
  const t = useTranslations('about');
  const locale = useLocale();
  const isEn = locale === 'en';

  const educationList = [
    {
      id: 'unri',
      institution: 'Universitas Riau',
      degree: isEn
        ? "Bachelor's degree • Informatics Engineering, (S.Kom) • GPA: 3.80/4.00"
        : 'Sarjana (S1) • Teknik Informatika, (S.Kom) • IPK: 3.80 / 4.00',
      period: isEn ? '2024 - 2028 (Present)' : '2024 - 2028 (Sekarang)',
      location: 'Pekanbaru, Riau, Indonesia',
      countryCode: 'ID',
      emblem: UnriEmblem,
    },
    {
      id: 'sma',
      institution: isEn ? 'SMAN (Senior High School)' : 'SMAN (Sekolah Menengah Atas)',
      degree: isEn
        ? 'Senior High School • Science / Mathematics (MIPA)'
        : 'Sekolah Menengah Atas • MIPA (Ilmu Pengetahuan Alam)',
      period: '2021 - 2024',
      location: 'Riau, Indonesia',
      countryCode: 'ID',
      emblem: HighSchoolEmblem,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header with Black Icon in Light Mode */}
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2.5">
          <GraduationCap className="w-6 h-6 text-black dark:text-white shrink-0 transition-colors" />
          <span>{t('educationTitle')}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1 font-normal">
          {t('educationSubtitle')}
        </p>
      </div>

      {/* Education Cards */}
      <div className="space-y-3.5">
        {educationList.map((item) => {
          const EmblemComponent = item.emblem;
          return (
            <SpotlightCard
              key={item.id}
              className="p-5 sm:p-6 bg-white/95 dark:bg-zinc-950/80 border-slate-300/90 dark:border-white/10 shadow-sm rounded-2xl transition-all duration-200 hover:border-slate-400 dark:hover:border-white/20"
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <EmblemComponent className="w-14 h-14 sm:w-16 sm:h-16 shrink-0" />
                <div className="space-y-1 min-w-0 flex-1">
                  <h4 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white truncate">
                    {item.institution}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-medium">
                    {item.degree}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-zinc-500 font-mono flex items-center gap-1.5 flex-wrap">
                    <span>{item.period}</span>
                    <span>•</span>
                    <span>{item.location}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-zinc-300">
                      {item.countryCode}
                    </span>
                  </p>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
