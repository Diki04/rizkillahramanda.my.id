'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Project, Achievement, ChatMessage } from '@/types';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { Badge } from '@/common/components/Badge';
import {
  FolderGit2,
  Award,
  MessageSquare,
  Database,
  Plus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Download,
  Sparkles,
} from 'lucide-react';
import { isSupabaseConfigured } from '@/services/supabase/client';

interface AdminOverviewProps {
  projects: Project[];
  achievements: Achievement[];
  messages: ChatMessage[];
  onNavigateTab: (tab: 'overview' | 'projects' | 'achievements' | 'messages' | 'settings') => void;
  onOpenCreateProject: () => void;
  onOpenCreateAchievement: () => void;
  onExportData: () => void;
}

export function AdminOverview({
  projects,
  achievements,
  messages,
  onNavigateTab,
  onOpenCreateProject,
  onOpenCreateAchievement,
  onExportData,
}: AdminOverviewProps) {
  const t = useTranslations('admin');
  const locale = useLocale();
  const isEn = locale === 'en';

  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <SpotlightCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase">
              {t('kpi.totalProjects')}
            </span>
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white border border-slate-200 dark:border-white/20">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {projects.length}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-zinc-200 border border-slate-200 dark:border-white/20">
                <Sparkles className="w-3 h-3" />
                {featuredCount} {t('kpi.featuredProjects')}
              </span>
            </div>
          </div>
        </SpotlightCard>

        {/* Total Achievements */}
        <SpotlightCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase">
              {t('kpi.totalAchievements')}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {achievements.length}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                {t('kpi.verified')}
              </span>
            </div>
          </div>
        </SpotlightCard>

        {/* Guestbook Messages */}
        <SpotlightCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase">
              {t('kpi.guestbookMessages')}
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {messages.length}
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2">
              {isEn ? 'Visitor greetings & notes' : 'Salam & catatan pengunjung'}
            </p>
          </div>
        </SpotlightCard>

        {/* Database Health */}
        <SpotlightCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase">
              {t('kpi.databaseStatus')}
            </span>
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white border border-slate-200 dark:border-white/20">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                {isSupabaseConfigured ? 'Supabase Live' : 'Hybrid Fallback'}
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2">
              {isSupabaseConfigured
                ? isEn ? 'Production Cloud' : 'Cloud Produksi'
                : isEn ? 'Local Data Provider' : 'Penyedia Data Lokal'}
            </p>
          </div>
        </SpotlightCard>
      </div>

      {/* Quick Actions Bar */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-zinc-900/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {t('overview.quickActions')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isEn
              ? 'Quickly launch new records or export offline snapshots'
              : 'Tambah entitas baru atau unduh cadangan mandiri'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button onClick={onOpenCreateProject} variant="secondary" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span>{t('addProject')}</span>
          </Button>

          <Button onClick={onOpenCreateAchievement} variant="outline" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
            <span>{t('addAchievement')}</span>
          </Button>

          <Button onClick={onExportData} variant="ghost" size="sm" className="border border-slate-200 dark:border-white/[0.08]">
            <Download className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
            <span>{t('settings.downloadJson')}</span>
          </Button>
        </div>
      </div>

      {/* Two-Column Snapshot View: Recent Projects & Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects Card */}
        <SpotlightCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-slate-900 dark:text-white" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('overview.recentProjects')}
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('projects')}
              className="text-xs font-mono text-slate-900 dark:text-white hover:underline flex items-center gap-1"
            >
              <span>{t('overview.viewAll')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/[0.04] hover:border-white/30 transition-all"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {p.title}
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                    {p.tags.slice(0, 3).join(' • ')}
                  </p>
                </div>
                <Badge variant={p.featured ? 'accent' : 'default'} className="shrink-0 text-[10px]">
                  {p.category}
                </Badge>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Recent Achievements Card */}
        <SpotlightCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-900 dark:text-white" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('overview.recentAchievements')}
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('achievements')}
              className="text-xs font-mono text-slate-900 dark:text-white hover:underline flex items-center gap-1"
            >
              <span>{t('overview.viewAll')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {achievements.slice(0, 4).map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/[0.04] hover:border-white/30 transition-all"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {a.title}
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                    {a.issuer} • {a.issueDate}
                  </p>
                </div>
                <Badge variant="accent" className="shrink-0 text-[10px]">
                  {a.category}
                </Badge>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
