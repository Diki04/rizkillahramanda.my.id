'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Achievement } from '@/types';
import { useTranslations } from 'next-intl';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AchievementDetailModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementDetailModal({
  achievement,
  onClose,
}: AchievementDetailModalProps) {
  const t = useTranslations('achievements');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!achievement) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [achievement, onClose]);

  if (!mounted || !achievement) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Morphing Card Modal */}
        <motion.div
          layoutId={`card-${achievement.id}`}
          onClick={(e) => e.stopPropagation()}
          className="relative z-[10000] flex max-w-5xl w-full flex-col md:flex-row overflow-hidden rounded-2xl md:rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 shadow-2xl max-h-[92vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-[10001] rounded-full bg-black/50 hover:bg-black/75 text-white p-2 backdrop-blur-md transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Certificate Image Canvas */}
          <div className="w-full md:w-[60%] lg:w-[64%] bg-slate-100 dark:bg-zinc-900/60 p-5 sm:p-8 flex items-center justify-center">
            <motion.div
              layoutId={`image-${achievement.id}`}
              className="relative w-full aspect-[4/3] max-h-[60vh] md:max-h-[75vh]"
            >
              <Image
                src={achievement.image}
                alt={achievement.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain drop-shadow-md rounded-lg"
                priority
              />
            </motion.div>
          </div>

          {/* Right Details Sidebar */}
          <div className="w-full md:w-[40%] lg:w-[36%] p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-950">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight">
                {achievement.title}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">
                {achievement.issuer}
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-medium">
                    {t('credentialId')}
                  </p>
                  <p className="text-sm font-mono text-slate-800 dark:text-zinc-200 mt-0.5 break-all">
                    {achievement.credentialId || '-'}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-medium">
                    {t('type')}
                  </p>
                  <p className="text-sm font-medium capitalize text-slate-800 dark:text-zinc-200 mt-0.5">
                    {achievement.type || '-'}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-medium">
                    {t('category')}
                  </p>
                  <p className="text-sm font-medium capitalize text-slate-800 dark:text-zinc-200 mt-0.5">
                    {achievement.category || '-'}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-medium">
                    {t('issueDate')}
                  </p>
                  <p className="text-sm font-medium text-slate-800 dark:text-zinc-200 mt-0.5">
                    {achievement.issueDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Action button */}
            {achievement.credentialUrl && (
              <div className="pt-6">
                <a
                  href={achievement.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center justify-between gap-3 px-5 py-2.5 rounded-full bg-[#facc15] hover:bg-[#eab308] text-black font-semibold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all group cursor-pointer"
                >
                  <span>{t('credentialUrl')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
