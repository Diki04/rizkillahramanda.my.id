'use client';

import React from 'react';
import { Container } from '@/common/components/Container';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { DeveloperSetup } from './DeveloperSetup';
import { QuoteCard } from './QuoteCard';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, GitBranch, Clock, Sparkles } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export function DevHighlights() {
  return (
    <section id="highlights" className="py-20 border-t border-white/[0.08] min-h-[calc(100vh-5rem)] flex flex-col justify-center">
      <Container size="xl">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/20 bg-sky-400/10 text-sky-400 text-xs font-mono font-medium mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Workflow & Philosophy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Developer Environment & Philosophy
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                The setup, engineering habits, and continuous metrics that drive high-quality software craftsmanship.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-white transition-colors"
              >
                <span>Live Metrics</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Workstation Specs */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-2xl border border-white/[0.08] bg-navy-900/30">
              <div className="space-y-2 mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-sky-400" />
                  <span>Workstation & Engineering Environment</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Reliable local development toolchain optimized for speed and DX.
                </p>
              </div>

              <DeveloperSetup />
            </div>

            {/* Right 5 Columns: Daily Quote & Live Activity Badge */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              <QuoteCard />

              <SpotlightCard className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-navy-950 border border-white/[0.08]">
                    <SiGithub className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-white">
                      Active GitHub Profile
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400">
                      @Diki04 • 49+ Public Repos
                    </p>
                  </div>
                </div>

                <a
                  href="https://github.com/Diki04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-white/[0.1] bg-navy-900/60 hover:bg-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  Visit Profile
                </a>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
