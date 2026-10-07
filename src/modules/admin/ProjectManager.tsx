'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Project, ProjectCategory } from '@/types';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { Badge } from '@/common/components/Badge';
import { Plus, Edit2, Trash2, Check, X, FolderGit2, Search, ExternalLink, Github } from 'lucide-react';

interface ProjectManagerProps {
  projects: Project[];
  secretKey?: string;
  onRefresh: () => void;
}

export function ProjectManager({
  projects,
  secretKey,
  onRefresh,
}: ProjectManagerProps) {
  const t = useTranslations('admin');
  const locale = useLocale();
  const isEn = locale === 'en';

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const initialNewProject: Project = {
    id: `proj-${Date.now()}`,
    title: '',
    slug: '',
    description: { en: '', id: '' },
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'TypeScript'],
    githubUrl: 'https://github.com/Diki04',
    demoUrl: '',
    featured: false,
    createdAt: new Date().toISOString().split('T')[0],
  };

  const [formState, setFormState] = useState<Project>(initialNewProject);
  const [tagsInput, setTagsInput] = useState('Next.js, TypeScript');

  const startCreate = () => {
    const fresh = { ...initialNewProject, id: `proj-${Date.now()}` };
    setFormState(fresh);
    setTagsInput(fresh.tags.join(', '));
    setIsCreating(true);
    setEditingProject(null);
  };

  const startEdit = (p: Project) => {
    setFormState(p);
    setTagsInput(p.tags.join(', '));
    setEditingProject(p);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const projectToSave: Project = {
      ...formState,
      slug: formState.slug || formState.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project: projectToSave }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || (isEn ? 'Failed to save project' : 'Gagal menyimpan proyek'));
      }

      setMessage(isEn ? 'Project saved successfully!' : 'Proyek berhasil disimpan!');
      setIsCreating(false);
      setEditingProject(null);
      onRefresh();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isEn ? 'Are you sure you want to delete this project?' : 'Apakah Anda yakin ingin menghapus proyek ini?')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || (isEn ? 'Failed to delete project' : 'Gagal menghapus proyek'));
      }

      setMessage(isEn ? 'Project deleted successfully!' : 'Proyek berhasil dihapus!');
      onRefresh();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [projects, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-navy-900/40">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-sky-500" />
            <span>{t('projectsTab')}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
            Total {projects.length} {isEn ? 'registered projects' : 'proyek terdaftar'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={isEn ? 'Search projects...' : 'Cari proyek...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl text-xs font-mono border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-navy-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-sky-400 w-44 sm:w-56"
            />
          </div>

          {!isCreating && !editingProject && (
            <Button onClick={startCreate} variant="secondary" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              <span>{t('addProject')}</span>
            </Button>
          )}
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-600 dark:text-sky-400">
          {message}
        </div>
      )}

      {/* Edit / Create Form */}
      {(isCreating || editingProject) && (
        <SpotlightCard className="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {isCreating ? t('addProject') : `${t('edit')}: ${editingProject?.title}`}
              </h4>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {isEn ? 'Project Title' : 'Judul Proyek'}
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) =>
                    setFormState({ ...formState, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-sky-400"
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
                      category: e.target.value as Project['category'],
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-sky-400"
                >
                  <option value="fullstack">Full-Stack</option>
                  <option value="frontend">Front-End</option>
                  <option value="ml">Machine Learning</option>
                  <option value="other">{isEn ? 'Other' : 'Lainnya'}</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                {isEn ? 'Description (Indonesian)' : 'Deskripsi (Bahasa Indonesia)'}
              </label>
              <textarea
                rows={2}
                value={formState.description.id}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    description: {
                      ...formState.description,
                      id: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white resize-none focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                {isEn ? 'Description (English)' : 'Deskripsi (Bahasa Inggris)'}
              </label>
              <textarea
                rows={2}
                value={formState.description.en}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    description: {
                      ...formState.description,
                      en: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white resize-none focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {isEn ? 'Cover Image URL' : 'URL Gambar Sampul'}
                </label>
                <input
                  type="text"
                  required
                  value={formState.image}
                  onChange={(e) =>
                    setFormState({ ...formState, image: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {isEn ? 'Tech Tags (comma separated)' : 'Tag Teknologi (pisahkan koma)'}
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Next.js, TypeScript, Tailwind"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  required
                  value={formState.githubUrl}
                  onChange={(e) =>
                    setFormState({ ...formState, githubUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {isEn ? 'Live Demo URL (Optional)' : 'URL Demo Langsung (Opsional)'}
                </label>
                <input
                  type="url"
                  value={formState.demoUrl || ''}
                  onChange={(e) =>
                    setFormState({ ...formState, demoUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="featured"
                checked={formState.featured}
                onChange={(e) =>
                  setFormState({ ...formState, featured: e.target.checked })
                }
                className="rounded border-slate-300 dark:border-white/[0.1] text-sky-500"
              />
              <label htmlFor="featured" className="text-xs font-mono text-slate-700 dark:text-slate-300 cursor-pointer">
                {isEn
                  ? 'Display as Featured Project on Homepage'
                  : 'Tampilkan sebagai Proyek Unggulan di Beranda'}
              </label>
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
                  setEditingProject(null);
                }}
                className="text-xs font-mono"
              >
                {t('cancel')}
              </Button>
            </div>
          </form>
        </SpotlightCard>
      )}

      {/* Projects List */}
      <div className="space-y-3">
        {filteredProjects.map((p) => (
          <SpotlightCard key={p.id} className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {p.title}
                  </h4>
                  <Badge variant="accent">{p.category}</Badge>
                  {p.featured && (
                    <Badge variant="success">Featured</Badge>
                  )}
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                  {p.tags.join(', ')} • {p.createdAt}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] hover:text-sky-500 text-slate-500 transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] hover:text-slate-900 dark:hover:text-white text-slate-500 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <Button
                  onClick={() => startEdit(p)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  <span>{t('edit')}</span>
                </Button>
                <Button
                  onClick={() => handleDelete(p.id)}
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
