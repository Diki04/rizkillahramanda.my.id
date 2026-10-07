'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MetricsCard } from '@/modules/dashboard/MetricsCard';
import { GitHubContributionCalendar } from '@/modules/dashboard/GitHubContributionCalendar';
import { GitHubRecentCommits } from '@/modules/dashboard/GitHubRecentCommits';
import { GitHubStats as IGitHubStats } from '@/types';
import { Github, FolderGit2, Star, Users, UserPlus, ExternalLink } from 'lucide-react';
import { Button } from '@/common/components/Button';

export function GitHubStats() {
  const t = useTranslations('dashboard');
  const [stats, setStats] = useState<IGitHubStats>({
    login: 'Diki04',
    avatarUrl: 'https://avatars.githubusercontent.com/u/162100984?v=4',
    publicRepos: 49,
    followers: 36,
    following: 37,
    totalStars: 15,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setStats(json.data);
        }
      })
      .catch((err) => console.error('Error fetching github data', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Github className="w-5 h-5 text-accent-blue" />
            <span>{t('githubStats')}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Open-source repositories, activity heatmaps, and continuous commit cadence.
          </p>
        </div>
        <a
          href={`https://github.com/${stats.login}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="sm" className="text-xs font-mono text-accent-blue border border-white/[0.08]">
            <span>@{stats.login}</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </a>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricsCard
          title={t('publicRepos')}
          value={stats.publicRepos}
          subtitle="Open-source repositories"
          icon={FolderGit2}
          color="blue"
        />
        <MetricsCard
          title={t('totalStars')}
          value={stats.totalStars}
          subtitle="Across repositories"
          icon={Star}
          color="amber"
        />
        <MetricsCard
          title={t('followers')}
          value={stats.followers}
          subtitle="Developers following"
          icon={Users}
          color="emerald"
        />
        <MetricsCard
          title={t('following')}
          value={stats.following}
          subtitle="Developers followed"
          icon={UserPlus}
          color="purple"
        />
      </div>

      {/* Contribution Calendar Heatmap */}
      <GitHubContributionCalendar />

      {/* Recent Git Commits Log */}
      <GitHubRecentCommits />
    </div>
  );
}
