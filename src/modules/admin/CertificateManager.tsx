'use client';

import React, { useState } from 'react';
import { Achievement } from '@/types';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { Badge } from '@/common/components/Badge';
import { Plus, Edit2, Trash2, Check, X, Award } from 'lucide-react';

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
  const [editingCert, setEditingCert] = useState<Achievement | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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
        body: JSON.stringify({
          achievement: formState,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Gagal menyimpan sertifikat');
      }

      setMessage('Sertifikat berhasil disimpan!');
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
    if (!confirm('Apakah Anda yakin ingin menghapus sertifikat ini?')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/achievements', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Gagal menghapus sertifikat');
      }

      setMessage('Sertifikat berhasil dihapus!');
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
            <Award className="w-5 h-5 text-accent-blue" />
            <span>Manajemen Sertifikat & Pencapaian</span>
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Total {achievements.length} sertifikat terdaftar
          </p>
        </div>
        {!isCreating && !editingCert && (
          <Button onClick={startCreate} variant="secondary" size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Tambah Sertifikat</span>
          </Button>
        )}
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-navy-800 border border-accent-blue/30 text-xs font-mono text-accent-blue">
          {message}
        </div>
      )}

      {/* Edit / Create Form */}
      {(isCreating || editingCert) && (
        <SpotlightCard className="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h4 className="text-sm font-semibold text-white">
                {isCreating ? 'Tambah Sertifikat Baru' : `Edit: ${editingCert?.title}`}
              </h4>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingCert(null);
                }}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Nama Sertifikat / Penghargaan</label>
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
                <label className="text-xs font-mono text-slate-400">Lembaga Penerbit (Issuer)</label>
                <input
                  type="text"
                  required
                  value={formState.issuer}
                  onChange={(e) =>
                    setFormState({ ...formState, issuer: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/[0.08] text-xs font-mono text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Tahun Terbit</label>
                <input
                  type="text"
                  required
                  value={formState.issueDate}
                  onChange={(e) =>
                    setFormState({ ...formState, issueDate: e.target.value })
                  }
                  placeholder="2026"
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
                  <option value="certificate">Sertifikat</option>
                  <option value="award">Penghargaan</option>
                  <option value="course">Kursus / Workshop</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Image URL / Supabase Storage</label>
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
                <label className="text-xs font-mono text-slate-400">URL Verifikasi Kredensial (Opsional)</label>
                <input
                  type="url"
                  value={formState.credentialUrl || ''}
                  onChange={(e) =>
                    setFormState({ ...formState, credentialUrl: e.target.value })
                  }
                  placeholder="https://dicoding.com/certificates/..."
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/[0.08] text-xs font-mono text-white"
                />
              </div>
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
                <span>{loading ? 'Menyimpan...' : 'Simpan Sertifikat'}</span>
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
                Batal
              </Button>
            </div>
          </form>
        </SpotlightCard>
      )}

      {/* Certificates List */}
      <div className="space-y-3">
        {achievements.map((cert) => (
          <SpotlightCard key={cert.id} className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white">{cert.title}</h4>
                  <Badge variant="accent">{cert.category}</Badge>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  {cert.issuer} • {cert.issueDate}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => startEdit(cert)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5 mr-1" />
                  <span>Edit</span>
                </Button>
                <Button
                  onClick={() => handleDelete(cert.id)}
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
