'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { Badge } from '@/common/components/Badge';
import { Plus, Edit2, Trash2, Check, X, FolderGit2 } from 'lucide-react';

interface ProjectManagerProps {
  projects: Project[];
  secretKey: string;
  onRefresh: () => void;
}

export function ProjectManager({
  projects,
  secretKey,
  onRefresh,
}: ProjectManagerProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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
      slug:
        formState.slug ||
        formState.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secretKey,
          project: projectToSave,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Gagal menyimpan proyek');
      }

      setMessage('Proyek berhasil disimpan!');
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
    if (!confirm('Apakah Anda yakin ingin menghapus proyek ini?')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secretKey,
          id,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Gagal menghapus proyek');
      }

      setMessage('Proyek berhasil dihapus!');
      onRefresh();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-accent-blue" />
            <span>Manajemen Portofolio Proyek</span>
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Total {projects.length} proyek terdaftar
          </p>
        </div>
        {!isCreating && !editingProject && (
          <Button onClick={startCreate} variant="secondary" size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Tambah Proyek</span>
          </Button>
        )}
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-navy-800 border border-accent-blue/30 text-xs font-mono text-accent-blue">
          {message}
        </div>
      )}

      {/* Edit / Create Form */}
      {(isCreating || editingProject) && (
        <SpotlightCard className="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h4 className="text-sm font-semibold text-white">
                {isCreating ? 'Tambah Proyek Baru' : `Edit: ${editingProject?.title}`}
              </h4>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
                }}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Judul Proyek</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) =>
                    setFormState({ ...formState, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/[0.08] text-xs font-mono text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Kategori</label>
                <select
                  value={formState.category}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      category: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/[0.08] text-xs font-mono text-white"
                >
                  <option value="fullstack">Full-Stack</option>
                  <option value="frontend">Front-End</option>
                  <option value="ml">Machine Learning</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Deskripsi (Bahasa Indonesia)</label>
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
                className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/[0.08] text-xs font-mono text-white resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Deskripsi (English)</label>
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
                className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/[0.08] text-xs font-mono text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Image Cover URL / Supabase Storage</label>
                <input
                  type="text"
                  required
                  value={formState.image}
                  onChange={(e) =>
                    setFormState({ ...formState, image: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/[0.08] text-xs font-mono text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Tech Stack Tags (Pisahkan koma)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Next.js, TypeScript, Tailwind"
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/[0.08] text-xs font-mono text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">GitHub Repository URL</label>
                <input
                  type="url"
                  required
                  value={formState.githubUrl}
                  onChange={(e) =>
                    setFormState({ ...formState, githubUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/[0.08] text-xs font-mono text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Demo Live URL (Opsional)</label>
                <input
                  type="url"
                  value={formState.demoUrl || ''}
                  onChange={(e) =>
                    setFormState({ ...formState, demoUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/[0.08] text-xs font-mono text-white"
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
                className="rounded border-white/[0.1] bg-navy-950 text-accent-blue"
              />
              <label htmlFor="featured" className="text-xs font-mono text-slate-300">
                Tampilkan sebagai Proyek Unggulan (Featured) di Beranda
              </label>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-white/[0.08]">
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={loading}
                className="text-xs font-mono"
              >
                <Check className="w-4 h-4 mr-1.5" />
                <span>{loading ? 'Menyimpan...' : 'Simpan Proyek'}</span>
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
                Batal
              </Button>
            </div>
          </form>
        </SpotlightCard>
      )}

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((p) => (
          <SpotlightCard key={p.id} className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white">{p.title}</h4>
                  <Badge variant="accent">{p.category}</Badge>
                  {p.featured && (
                    <Badge variant="success">Featured</Badge>
                  )}
                </div>
                <p className="text-xs font-mono text-slate-400">
                  {p.tags.join(', ')} • {p.createdAt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => startEdit(p)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5 mr-1" />
                  <span>Edit</span>
                </Button>
                <Button
                  onClick={() => handleDelete(p.id)}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
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
