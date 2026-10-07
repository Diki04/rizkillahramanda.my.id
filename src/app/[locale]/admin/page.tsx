'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { AdminLogin } from '@/modules/admin/AdminLogin';
import { ProjectManager } from '@/modules/admin/ProjectManager';
import { CertificateManager } from '@/modules/admin/CertificateManager';
import { Project, Achievement } from '@/types';
import { mockProjects } from '@/services/data/mock-projects';
import { mockAchievements } from '@/services/data/mock-achievements';
import { Button } from '@/common/components/Button';
import { Badge } from '@/common/components/Badge';
import { ShieldCheck, FolderGit2, Award, LogOut, Database } from 'lucide-react';
import { isSupabaseConfigured } from '@/services/supabase/client';

export default function AdminPage() {
  const t = useTranslations('admin');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'achievements'>('projects');
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
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
      const [projRes, achRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/achievements'),
      ]);

      const projJson = await projRes.json();
      const achJson = await achRes.json();

      if (projJson.success && projJson.data) setProjects(projJson.data);
      if (achJson.success && achJson.data) setAchievements(achJson.data);
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

  if (checkingAuth) {
    return (
      <div className="py-24 text-center">
        <Container size="md">
          <p className="text-xs font-mono text-slate-400">Memeriksa status sesi admin...</p>
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

  return (
    <div className="py-16 md:py-20 space-y-10">
      <Container size="xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-accent-blue/10 text-accent-blue">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Panel Pengelolaan Portofolio & Sertifikat Rizkillah Ramanda
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-navy-900 text-xs font-mono">
              <Database className="w-3.5 h-3.5 text-accent-blue" />
              <span className="text-slate-300">
                {isSupabaseConfigured ? 'Supabase Live' : 'Hybrid Local Fallback'}
              </span>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-xs font-mono"
            >
              <LogOut className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <span>{t('logout')}</span>
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeTab === 'projects'
                ? 'bg-navy-800 text-accent-blue border border-accent-blue/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-navy-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>{t('projectsTab')}</span>
            <Badge variant="accent">{projects.length}</Badge>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeTab === 'achievements'
                ? 'bg-navy-800 text-accent-blue border border-accent-blue/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-navy-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{t('achievementsTab')}</span>
            <Badge variant="accent">{achievements.length}</Badge>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'projects' ? (
          <ProjectManager
            projects={projects}
            onRefresh={loadData}
          />
        ) : (
          <CertificateManager
            achievements={achievements}
            onRefresh={loadData}
          />
        )}
      </Container>
    </div>
  );
}
