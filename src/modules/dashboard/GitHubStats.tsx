'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { MetricsCard } from '@/modules/dashboard/MetricsCard';
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Github className="w-5 h-5 text-accent-blue" />
          <span>{t('githubStats')}</span>
        </h3>
        <a
          href={`https://github.com/${stats.login}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="sm" className="text-xs font-mono text-accent-blue">
            <span>@{stats.login}</span>
            <ExternalLink className="w-3 h-3 ml-1" />
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
    </div>
  );
}
