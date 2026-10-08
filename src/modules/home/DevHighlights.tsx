'use client';

import React from 'react';
import { Container } from '@/common/components/Container';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { DeveloperSetup } from './DeveloperSetup';
import { QuoteCard } from './QuoteCard';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, GitBranch, Sparkles } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

import { useTranslations } from 'next-intl';

export function DevHighlights() {
  const t = useTranslations('devHighlights');

  return (
    <ScrollReveal
      id="highlights"
      className="py-20 border-t border-slate-200 dark:border-white/[0.08] min-h-[calc(100vh-5rem)] flex flex-col justify-center"
    >
      <Container size="xl">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 dark:border-white/20 bg-white/95 dark:bg-white/10 text-slate-950 dark:text-zinc-200 text-xs font-mono font-bold mb-2 shadow-xs">
                <Sparkles className="w-4 h-4 text-slate-800 dark:text-zinc-300" />
                <span>{t('badge')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {t('title')}
              </h2>
              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-300 mt-1 max-w-xl font-medium">
                {t('subtitle')}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-800 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors font-bold"
              >
                <span>{t('liveMetrics')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Workstation Specs */}
            <div className="lg:col-span-7 flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-slate-300 dark:border-white/[0.08] bg-white/95 dark:bg-zinc-950/80 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-300/40 dark:hover:shadow-white/5 hover:border-slate-400 dark:hover:border-white/25 transition-all duration-300">
              <div className="space-y-2 mb-4">
                <h3 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-slate-900 dark:text-white" />
                  <span>{t('workstationTitle')}</span>
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-normal">
                  {t('workstationSubtitle')}
                </p>
              </div>

              <DeveloperSetup />
            </div>

            {/* Right 5 Columns: Daily Quote & Live Activity Badge */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              <QuoteCard />

              <SpotlightCard className="p-5 flex items-center justify-between bg-white/95 dark:bg-zinc-950/80 border-slate-300 dark:border-white/[0.08] shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-white/[0.08]">
                    <SiGithub className="w-5 h-5 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-950 dark:text-white">
                      Active GitHub Profile
                    </h4>
                    <p className="text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300">
                      @Diki04 • 49+ Public Repos
                    </p>
                  </div>
                </div>

                <a
                  href="https://github.com/Diki04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-white/[0.1] bg-white dark:bg-zinc-900/60 hover:bg-slate-100 dark:hover:bg-white/[0.08] text-xs font-mono font-bold text-slate-900 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors shadow-xs"
                >
                  Visit Profile
                </a>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </Container>
    </ScrollReveal>
  );
}
