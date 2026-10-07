'use client';

import React, { useEffect, useState } from 'react';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { GitCommit, GitBranch, ArrowUpRight, RefreshCw } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

interface CommitItem {
  repo: string;
  branch: string;
  sha: string;
  message: string;
  time: string;
  url: string;
}

const FALLBACK_COMMITS: CommitItem[] = [
  {
    repo: 'Diki04/rizkillahramanda.my.id',
    branch: 'main',
    sha: '3cc1cdb',
    message: 'feat(ui): add ScrollReveal viewport animations and calibrate balanced typography',
    time: 'Baru saja',
    url: 'https://github.com/Diki04/rizkillahramanda.my.id',
  },
  {
    repo: 'Diki04/rizkillahramanda.my.id',
    branch: 'main',
    sha: '7a43383',
    message: 'feat(sidebar): widen sidebar to w-80 and enrich interactive hover animations',
    time: '1 jam yang lalu',
    url: 'https://github.com/Diki04/rizkillahramanda.my.id',
  },
  {
    repo: 'Diki04/rizkillahramanda.my.id',
    branch: 'main',
    sha: '57b5513',
    message: 'feat(ui): intensify background color contrast for cursor hover',
    time: '2 jam yang lalu',
    url: 'https://github.com/Diki04/rizkillahramanda.my.id',
  },
  {
    repo: 'Diki04/rizkillahramanda.my.id',
    branch: 'main',
    sha: '26e5ce4',
    message: 'test(dashboard): add unit tests for GitHub contribution levels and streak algorithms',
    time: '3 jam yang lalu',
    url: 'https://github.com/Diki04/rizkillahramanda.my.id',
  },
];

export function GitHubRecentCommits() {
  const [commits, setCommits] = useState<CommitItem[]>(FALLBACK_COMMITS);
  const [loading, setLoading] = useState(true);

  const fetchCommits = () => {
    setLoading(true);
    fetch('/api/github/commits')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setCommits(json.data);
        }
      })
      .catch((err) => console.error('Error fetching live commits:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCommits();
  }, []);

  return (
    <SpotlightCard className="p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08]">
            <SiGithub className="w-4 h-4 text-slate-800 dark:text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recent Git Commits</h4>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live API
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Real-time commit telemetry from GitHub repository
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchCommits}
            title="Refresh commit log"
            className="p-1.5 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-navy-900 text-slate-500 hover:text-sky-500 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <a
            href="https://github.com/Diki04?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono text-sky-600 dark:text-accent-blue hover:text-sky-700 dark:hover:text-white transition-colors"
          >
            <span>All Repositories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="space-y-3">
        {commits.map((commit) => (
          <a
            key={commit.sha}
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-white/[0.04] hover:border-sky-400/40 dark:hover:border-white/[0.12] hover:bg-slate-100 dark:hover:bg-navy-900/80 transition-all duration-150"
          >
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="text-slate-900 dark:text-white font-semibold truncate">{commit.repo}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <GitBranch className="w-3 h-3 text-sky-500" />
                  {commit.branch}
                </span>
                <span>•</span>
                <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-navy-900 border border-slate-300 dark:border-white/[0.08] text-sky-600 dark:text-sky-400 font-mono text-[10px]">
                  {commit.sha}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-accent-blue transition-colors truncate">
                {commit.message}
              </p>
            </div>

            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 shrink-0 self-end sm:self-auto">
              {commit.time}
            </div>
          </a>
        ))}
      </div>
    </SpotlightCard>
  );
}
