'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Achievement, AchievementCategory } from '@/types';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { Badge } from '@/common/components/Badge';
import { Plus, Edit2, Trash2, Check, X, Award, Search, ExternalLink } from 'lucide-react';

interface CertificateManagerProps {
  achievements: Achievement[];
  secretKey?: string;
  onRefresh: () => void;
}

export function CertificateManager({
  achievements,
  secretKey,
  onRefresh,
}: CertificateManagerProps) {
  const t = useTranslations('admin');
  const locale = useLocale();
  const isEn = locale === 'en';

  const [editingCert, setEditingCert] = useState<Achievement | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const initialNewCert: Achievement = {
    id: `cert-${Date.now()}`,
    title: '',
    issuer: 'Dicoding Indonesia',
    issueDate: '2026',
    credentialUrl: '',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    category: 'certificate',
  };

  const [formState, setFormState] = useState<Achievement>(initialNewCert);

  const startCreate = () => {
    const fresh = { ...initialNewCert, id: `cert-${Date.now()}` };
    setFormState(fresh);
    setIsCreating(true);
    setEditingCert(null);
  };

  const startEdit = (cert: Achievement) => {
    setFormState(cert);
    setEditingCert(cert);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievement: formState }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || (isEn ? 'Failed to save certificate' : 'Gagal menyimpan sertifikat'));
      }

      setMessage(isEn ? 'Certificate saved successfully!' : 'Sertifikat berhasil disimpan!');
      setIsCreating(false);
      setEditingCert(null);
      onRefresh();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isEn ? 'Are you sure you want to delete this certificate?' : 'Apakah Anda yakin ingin menghapus sertifikat ini?')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/achievements', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || (isEn ? 'Failed to delete certificate' : 'Gagal menghapus sertifikat'));
      }

      setMessage(isEn ? 'Certificate deleted successfully!' : 'Sertifikat berhasil dihapus!');
      onRefresh();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredAchievements = useMemo(() => {
    if (!searchQuery) return achievements;
    return achievements.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [achievements, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-navy-900/40">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-500" />
            <span>{t('achievementsTab')}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
            Total {achievements.length} {isEn ? 'verified credentials' : 'kredensial terverifikasi'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={isEn ? 'Search certificates...' : 'Cari sertifikat...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl text-xs font-mono border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-navy-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-400 w-44 sm:w-56"
            />
          </div>

          {!isCreating && !editingCert && (
            <Button onClick={startCreate} variant="secondary" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              <span>{t('addAchievement')}</span>
            </Button>
          )}
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-600 dark:text-emerald-400">
          {message}
        </div>
      )}

      {/* Edit / Create Form */}
      {(isCreating || editingCert) && (
        <SpotlightCard className="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {isCreating ? t('addAchievement') : `${t('edit')}: ${editingCert?.title}`}
              </h4>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingCert(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {isEn ? 'Title / Award Name' : 'Nama Sertifikat / Penghargaan'}
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) =>
                    setFormState({ ...formState, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {isEn ? 'Issuing Organization' : 'Lembaga Penerbit (Issuer)'}
                </label>
                <input
                  type="text"
                  required
                  value={formState.issuer}
                  onChange={(e) =>
                    setFormState({ ...formState, issuer: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {isEn ? 'Year' : 'Tahun Terbit'}
                </label>
                <input
                  type="text"
                  required
                  value={formState.issueDate}
                  onChange={(e) =>
                    setFormState({ ...formState, issueDate: e.target.value })
                  }
                  placeholder="2026"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {isEn ? 'Category' : 'Kategori'}
                </label>
                <select
                  value={formState.category}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      category: e.target.value as AchievementCategory,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="certificate">{isEn ? 'Certificate' : 'Sertifikat'}</option>
                  <option value="award">{isEn ? 'Award / Honor' : 'Penghargaan'}</option>
                  <option value="course">{isEn ? 'Course / Specialization' : 'Kursus / Workshop'}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {isEn ? 'Certificate Image URL' : 'URL Gambar Sertifikat'}
                </label>
                <input
                  type="text"
                  required
                  value={formState.image}
                  onChange={(e) =>
                    setFormState({ ...formState, image: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {isEn ? 'Credential Verification URL' : 'URL Verifikasi Kredensial (Opsional)'}
                </label>
                <input
                  type="url"
                  value={formState.credentialUrl || ''}
                  onChange={(e) =>
                    setFormState({ ...formState, credentialUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-white/[0.08]">
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={loading}
                className="text-xs font-mono"
              >
                <Check className="w-4 h-4 mr-1.5" />
                <span>{loading ? (isEn ? 'Saving...' : 'Menyimpan...') : t('save')}</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsCreating(false);
                  setEditingCert(null);
                }}
                className="text-xs font-mono"
              >
                {t('cancel')}
              </Button>
            </div>
          </form>
        </SpotlightCard>
      )}

      {/* Achievements List */}
      <div className="space-y-3">
        {filteredAchievements.map((cert) => (
          <SpotlightCard key={cert.id} className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {cert.title}
                  </h4>
                  <Badge variant="accent">{cert.category}</Badge>
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                  {cert.issuer} • {cert.issueDate}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] hover:text-emerald-500 text-slate-500 transition-colors"
                    title="Verify Credential"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <Button
                  onClick={() => startEdit(cert)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  <span>{t('edit')}</span>
                </Button>
                <Button
                  onClick={() => handleDelete(cert.id)}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
