'use client';

import React from 'react';
import Image from 'next/image';
import { Achievement } from '@/types';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Badge } from '@/common/components/Badge';
import { Button } from '@/common/components/Button';
import { Award, ExternalLink, Eye, Calendar } from 'lucide-react';

interface CertificateCardProps {
  achievement: Achievement;
  onOpenModal: (achievement: Achievement) => void;
}

export function CertificateCard({
  achievement,
  onOpenModal,
}: CertificateCardProps) {
  const t = useTranslations('achievements');

  return (
    <SpotlightCard className="flex flex-col h-full p-5 justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-white/30 active:scale-[0.985]">
      <div className="space-y-4">
        {/* Certificate Preview Image */}
        <div
          onClick={() => onOpenModal(achievement)}
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-black cursor-pointer group/img transition-transform duration-300"
        >
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-black font-mono text-xs font-semibold border border-white shadow-2xl backdrop-blur-md transform scale-90 group-hover/img:scale-100 transition-all duration-200">
              <Eye className="w-4 h-4 text-black" />
              <span>{t('viewCertificate')}</span>
            </span>
          </div>
          <div className="absolute top-2.5 right-2.5 z-10">
            <Badge variant="accent">{achievement.category}</Badge>
          </div>
        </div>

        {/* Title & Issuer */}
        <div onClick={() => onOpenModal(achievement)} className="cursor-pointer">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-zinc-200 transition-colors flex items-center justify-between gap-2">
            <span>{achievement.title}</span>
            <Eye className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all shrink-0" />
          </h3>
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400 mt-2">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">
              <Award className="w-3.5 h-3.5 text-zinc-400" />
              {achievement.issuer}
            </span>
            <span className="flex items-center gap-1 text-slate-400 dark:text-zinc-500">
              <Calendar className="w-3 h-3" />
              {achievement.issueDate}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center gap-2">
        {achievement.credentialUrl && (
          <a
            href={achievement.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="secondary" size="sm" className="w-full text-xs">
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              <span>{t('verifyCredential')}</span>
            </Button>
          </a>
        )}
        <Button
          onClick={() => onOpenModal(achievement)}
          variant="outline"
          size="sm"
          className={achievement.credentialUrl ? '' : 'w-full'}
        >
          <Eye className="w-3.5 h-3.5" />
        </Button>
      </div>
    </SpotlightCard>
  );
}
