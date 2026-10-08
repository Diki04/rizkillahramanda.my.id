'use client';

import React from 'react';
import Image from 'next/image';
import { Achievement } from '@/types';
import { useTranslations } from 'next-intl';
import { X, ExternalLink, Calendar, Award } from 'lucide-react';
import { Button } from '@/common/components/Button';
import { Badge } from '@/common/components/Badge';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificateModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function CertificateModal({ achievement, onClose }: CertificateModalProps) {
  const t = useTranslations('achievements');

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-white/[0.12] bg-white dark:bg-zinc-950 p-6 shadow-2xl dark:shadow-none text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-black">
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
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{achievement.title}</h3>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">
                    <Award className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-400" />
                    {achievement.issuer}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
