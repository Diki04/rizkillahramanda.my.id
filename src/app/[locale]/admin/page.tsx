'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/common/components/Container';
import { AdminLogin } from '@/modules/admin/AdminLogin';
import { AdminOverview } from '@/modules/admin/AdminOverview';
import { ProjectManager } from '@/modules/admin/ProjectManager';
import { CertificateManager } from '@/modules/admin/CertificateManager';
import { AdminMessages } from '@/modules/admin/AdminMessages';
import { AdminSettings } from '@/modules/admin/AdminSettings';
import { Project, Achievement, ChatMessage } from '@/types';
import { mockProjects } from '@/services/data/mock-projects';
import { mockAchievements } from '@/services/data/mock-achievements';
import { Button } from '@/common/components/Button';
import { Badge } from '@/common/components/Badge';
import {
  ShieldCheck,
  FolderGit2,
  Award,
  LogOut,
  Database,
  LayoutDashboard,
  MessageSquare,
  Settings,
  RefreshCw,
} from 'lucide-react';
import { isSupabaseConfigured } from '@/services/supabase/client';

type AdminTab = 'overview' | 'projects' | 'achievements' | 'messages' | 'settings';

export default function AdminPage() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const isEn = locale === 'en';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        }
      } catch {
        // Not authenticated
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuthStatus();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projRes, achRes, msgRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/achievements'),
        fetch('/api/chat'),
      ]);

      const projJson = await projRes.json();
      const achJson = await achRes.json();
      const msgJson = await msgRes.json();

      if (projJson.success && projJson.data) setProjects(projJson.data);
      if (achJson.success && achJson.data) setAchievements(achJson.data);
      if (msgJson.success && msgJson.data) setMessages(msgJson.data);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
  };

  const handleExportData = () => {
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
  };

  if (checkingAuth) {
    return (
      <div className="py-24 text-center">
        <Container size="md">
          <div className="flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-5 h-5 text-sky-500 animate-spin" />
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {t('checkingSession')}
            </p>
          </div>
        </Container>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="py-20">
        <Container size="md">
          <AdminLogin onSuccess={handleLoginSuccess} />
        </Container>
      </div>
    );
  }

  const navTabs = [
    { id: 'overview' as const, label: t('tabs.overview'), icon: LayoutDashboard },
    {
      id: 'projects' as const,
      label: t('tabs.projects'),
      icon: FolderGit2,
      count: projects.length,
    },
    {
      id: 'achievements' as const,
      label: t('tabs.achievements'),
      icon: Award,
      count: achievements.length,
    },
    {
      id: 'messages' as const,
      label: t('tabs.messages'),
      icon: MessageSquare,
      count: messages.length,
    },
    { id: 'settings' as const, label: t('tabs.settings'), icon: Settings },
  ];

  return (
    <div className="py-16 md:py-20 space-y-8">
      <Container size="xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {t('title')}
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {t('subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-navy-900 text-xs font-mono">
              <Database className="w-3.5 h-3.5 text-sky-500 dark:text-accent-blue" />
              <span className="text-slate-700 dark:text-slate-300">
                {isSupabaseConfigured ? 'Supabase Live' : 'Hybrid Local Fallback'}
              </span>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-xs font-mono text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 dark:border-rose-500/30 dark:hover:bg-rose-500/10"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              <span>{t('logout')}</span>
            </Button>
          </div>
        </div>

        {/* Tab Navigation with Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-white/[0.08]">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 ${
                  active
                    ? 'bg-sky-50 dark:bg-navy-800 text-sky-600 dark:text-accent-blue border border-sky-300 dark:border-accent-blue/40 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-900 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <Badge variant={active ? 'accent' : 'default'} className="text-[10px]">
                    {tab.count}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab View */}
        <div className="pt-2">
          {activeTab === 'overview' && (
            <AdminOverview
              projects={projects}
              achievements={achievements}
              messages={messages}
              onNavigateTab={setActiveTab}
              onOpenCreateProject={() => setActiveTab('projects')}
              onOpenCreateAchievement={() => setActiveTab('achievements')}
              onExportData={handleExportData}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectManager projects={projects} onRefresh={loadData} />
          )}

          {activeTab === 'achievements' && (
            <CertificateManager achievements={achievements} onRefresh={loadData} />
          )}

          {activeTab === 'messages' && (
            <AdminMessages messages={messages} onRefresh={loadData} />
          )}

          {activeTab === 'settings' && (
            <AdminSettings
              projects={projects}
              achievements={achievements}
              messages={messages}
              onRefresh={loadData}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
