'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { SpecularButton } from '@/common/components/reactbits';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { useTheme } from '@/common/contexts/ThemeContext';
import { Link } from '@/i18n/routing';
import { Mail, MessageSquare, ArrowUpRight, Sparkles } from 'lucide-react';

export function ContactCta() {
  const t = useTranslations('contactCta');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ScrollReveal
      id="contact-cta"
      className="py-16 md:py-24 border-t border-slate-200 dark:border-white/[0.08] min-h-[calc(100vh-5rem)] flex flex-col justify-center relative overflow-hidden"
    >
      <Container size="xl">
        <div className="relative rounded-3xl border border-slate-300 dark:border-white/[0.1] bg-white/95 dark:bg-gradient-to-b dark:from-zinc-900/60 dark:to-zinc-950/80 backdrop-blur-xl p-6 sm:p-12 md:p-14 text-center overflow-hidden shadow-lg shadow-slate-900/5 dark:shadow-none">
          {/* Subtle monochrome ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/[0.06] text-slate-950 dark:text-white text-xs font-mono font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-slate-800 dark:text-zinc-300" />
              <span>{t('badge')}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
              {t('headlinePrefix')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-indigo-900 to-slate-900 dark:from-white dark:via-zinc-200 dark:to-zinc-400">
                {t('headlineHighlight')}
              </span>{' '}
              {t('headlineSuffix')}
            </h2>

            <p className="text-sm sm:text-base text-slate-950 dark:text-zinc-200 leading-relaxed max-w-xl mx-auto font-semibold">
              {t('description')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full">
              <Link href="/contact" className="w-full sm:w-auto">
                <SpecularButton
                  size="md"
                  baseColor={isDark ? '#18181b' : '#ffffff'}
                  lineColor={isDark ? '#ffffff' : '#1e1b4b'}
                  textColor={isDark ? '#ffffff' : '#000000'}
                  className="w-full sm:w-auto font-bold text-slate-950 dark:text-white shadow-xs"
                >
                  <Mail className="w-4 h-4 mr-2 text-slate-950 dark:text-white" />
                  <span>{t('sendMessage')}</span>
                </SpecularButton>
              </Link>
              <Link href="/chat" className="w-full sm:w-auto">
                <SpecularButton
                  size="md"
                  baseColor={isDark ? '#09090b' : '#ffffff'}
                  lineColor={isDark ? '#71717a' : '#1e1b4b'}
                  textColor={isDark ? '#ffffff' : '#000000'}
                  className="w-full sm:w-auto font-bold text-slate-950 dark:text-white shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-slate-900 dark:text-zinc-300" />
                  <span>{t('leaveNote')}</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 text-slate-900 dark:text-zinc-400" />
                </SpecularButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </ScrollReveal>
  );
}
