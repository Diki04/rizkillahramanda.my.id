'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Project, Achievement, ChatMessage } from '@/types';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import {
  Database,
  Download,
  RefreshCw,
  CheckCircle2,
  Shield,
  Layers,
  HardDrive,
  Cpu,
} from 'lucide-react';
import { isSupabaseConfigured } from '@/services/supabase/client';

interface AdminSettingsProps {
  projects: Project[];
  achievements: Achievement[];
  messages: ChatMessage[];
  onRefresh: () => void;
}

export function AdminSettings({
  projects,
  achievements,
  messages,
  onRefresh,
}: AdminSettingsProps) {
  const t = useTranslations('admin');
  const locale = useLocale();
  const isEn = locale === 'en';
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownloadBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      metadata: {
        totalProjects: projects.length,
        totalAchievements: achievements.length,
        totalMessages: messages.length,
      },
      projects,
      achievements,
      messages,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToastMessage(t('settings.successExport'));
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRefreshData = () => {
    onRefresh();
    setToastMessage(t('settings.successRefreshed'));
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-navy-900/40">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-sky-500" />
          <span>{t('settings.title')}</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {t('settings.subtitle')}
        </p>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Grid of Diagnostics & Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Database Connectivity Diagnostics */}
        <SpotlightCard className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.06] pb-3">
            <HardDrive className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t('settings.dbConnection')}
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {isEn ? 'Engine' : 'Mesin Basis Data'}
              </span>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                PostgreSQL (Supabase)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {isEn ? 'Integration Mode' : 'Mode Integrasi'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {isSupabaseConfigured ? t('settings.dbConnected') : t('settings.dbFallback')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {isEn ? 'Security Scope' : 'Cakupan Keamanan'}
              </span>
              <span className="text-xs font-mono text-sky-600 dark:text-sky-400">
                Row Level Security (RLS)
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {isEn
              ? 'The system automatically routes requests through Supabase when keys are populated in .env.local, falling back smoothly to verified local datasets.'
              : 'Sistem secara otomatis mengarahkan permintaan ke Supabase jika environment variables tersedia, atau beralih mulus ke dataset lokal terverifikasi.'}
          </p>
        </SpotlightCard>

        {/* Cache Refresh & Data Synchronization */}
        <SpotlightCard className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.06] pb-3">
            <RefreshCw className="w-4 h-4 text-sky-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t('settings.cachePurge')}
            </h3>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('settings.cachePurgeDesc')}
          </p>

          <div className="pt-2">
            <Button onClick={handleRefreshData} variant="secondary" size="md" className="w-full text-xs">
              <RefreshCw className="w-3.5 h-3.5 mr-2" />
              <span>{t('settings.refreshNow')}</span>
            </Button>
          </div>
        </SpotlightCard>

        {/* Offline Backup & Export Snapshot */}
        <SpotlightCard className="p-6 space-y-4 md:col-span-2">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.06] pb-3">
            <Download className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t('settings.exportData')}
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              {t('settings.exportDesc')}
            </p>

            <Button
              onClick={handleDownloadBackup}
              variant="outline"
              size="md"
              className="shrink-0 text-xs border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
            >
              <Download className="w-4 h-4 mr-2" />
              <span>{t('settings.downloadJson')}</span>
            </Button>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
