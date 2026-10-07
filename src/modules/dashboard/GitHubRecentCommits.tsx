'use client';

import React from 'react';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { GitCommit, GitBranch, ArrowUpRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

interface CommitItem {
  repo: string;
  branch: string;
  sha: string;
  message: string;
  time: string;
  url: string;
}

const RECENT_COMMITS: CommitItem[] = [
  {
    repo: 'Diki04/rizkillahramanda.my.id',
    branch: 'main',
    sha: '7f21c58',
    message: 'feat(projects): render official brand icons on tags inside ProjectModal',
    time: 'Baru saja',
    url: 'https://github.com/Diki04/rizkillahramanda.my.id/commit/7f21c58',
  },
  {
    repo: 'Diki04/rizkillahramanda.my.id',
    branch: 'main',
    sha: '94f9cf4',
    message: 'feat(tech-stack): integrate official react-icons brand logos with interactive filters',
    time: '1 jam yang lalu',
    url: 'https://github.com/Diki04/rizkillahramanda.my.id/commit/94f9cf4',
  },
  {
    repo: 'Diki04/rizkillahramanda.my.id',
    branch: 'main',
    sha: '4ac37d5',
    message: 'feat(home): assemble full-screen section architecture with SectionNavigator',
    time: '2 jam yang lalu',
    url: 'https://github.com/Diki04/rizkillahramanda.my.id/commit/4ac37d5',
  },
  {
    repo: 'Diki04/Pantau-Pangan-PKU',
    branch: 'main',
    sha: 'b82e14a',
    message: 'feat(dashboard): integrate market staple prices and inflation charts',
    time: '3 hari yang lalu',
    url: 'https://github.com/Diki04/Pantau-Pangan-PKU',
  },
  {
    repo: 'Diki04/human-activity-recognition',
    branch: 'main',
    sha: 'd19c43f',
    message: 'feat(training): optimize CNN-LSTM pipeline for real-time accelerometer telemetry',
    time: '1 minggu yang lalu',
    url: 'https://github.com/Diki04',
  },
];

export function GitHubRecentCommits() {
  return (
    <SpotlightCard className="p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-navy-950 border border-white/[0.08]">
            <SiGithub className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Recent Git Commits</h4>
            <p className="text-[11px] font-mono text-slate-400">
              Live commit log across active repositories
            </p>
          </div>
        </div>

        <a
          href="https://github.com/Diki04?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono text-accent-blue hover:text-white transition-colors"
        >
          <span>All Repositories</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="space-y-3">
        {RECENT_COMMITS.map((commit) => (
          <a
            key={commit.sha}
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-navy-950/60 border border-white/[0.04] hover:border-white/[0.12] hover:bg-navy-900/80 transition-all duration-150"
          >
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="text-white font-semibold truncate">{commit.repo}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <GitBranch className="w-3 h-3 text-sky-400" />
                  {commit.branch}
                </span>
                <span>•</span>
                <span className="px-1.5 py-0.2 rounded bg-navy-900 border border-white/[0.08] text-sky-400 font-mono text-[10px]">
                  {commit.sha}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-300 group-hover:text-accent-blue transition-colors truncate">
                {commit.message}
              </p>
            </div>

            <div className="text-[11px] font-mono text-slate-500 shrink-0 self-end sm:self-auto">
              {commit.time}
            </div>
          </a>
        ))}
      </div>
    </SpotlightCard>
  );
}
