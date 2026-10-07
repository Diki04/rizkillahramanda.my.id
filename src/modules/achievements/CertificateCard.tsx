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
    <SpotlightCard className="flex flex-col h-full p-5 justify-between">
      <div className="space-y-4">
        {/* Certificate Preview Image */}
        <div
          onClick={() => onOpenModal(achievement)}
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/[0.08] bg-navy-950 cursor-pointer group/img"
        >
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900/90 text-white font-mono text-xs border border-white/[0.1]">
              <Eye className="w-3.5 h-3.5 text-accent-blue" />
              {t('viewCertificate')}
            </span>
          </div>
          <div className="absolute top-2.5 right-2.5">
            <Badge variant="accent">{achievement.category}</Badge>
          </div>
        </div>

        {/* Title & Issuer */}
        <div>
          <h3
            onClick={() => onOpenModal(achievement)}
            className="text-base font-semibold text-white group-hover:text-accent-blue transition-colors cursor-pointer"
          >
            {achievement.title}
          </h3>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-2">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Award className="w-3.5 h-3.5 text-accent-blue" />
              {achievement.issuer}
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-3 h-3" />
              {achievement.issueDate}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center gap-2">
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
