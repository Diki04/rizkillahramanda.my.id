'use client';

import React from 'react';
import Image from 'next/image';
import { Achievement } from '@/types';
import { useTranslations } from 'next-intl';
import { X, ExternalLink, Calendar, Award } from 'lucide-react';
import { Button } from '@/common/components/Button';
import { Badge } from '@/common/components/Badge';

interface CertificateModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function CertificateModal({ achievement, onClose }: CertificateModalProps) {
  const t = useTranslations('achievements');

  if (!achievement) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.12] bg-navy-900 p-6 shadow-2xl shadow-cyan-950/40 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-navy-800 text-slate-400 hover:text-white border border-white/[0.08] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-navy-950">
            <Image
              src={achievement.image}
              alt={achievement.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="accent">{achievement.category}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-3.5 h-3.5 text-accent-blue" />
                {achievement.issuer}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {achievement.issueDate}
              </span>
            </div>
          </div>

          {achievement.credentialUrl && (
            <div className="pt-2">
              <a
                href={achievement.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="md" className="w-full text-xs">
                  <ExternalLink className="w-4 h-4 mr-1.5" />
                  <span>{t('verifyCredential')}</span>
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
