'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { Shield, KeyRound, AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const t = useTranslations('admin');
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode: passcode.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Kunci rahasia admin salah. Silakan coba lagi.');
      } else {
        onSuccess();
      }
    } catch {
      setError('Gagal memverifikasi passcode. Periksa koneksi server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-10">
      <SpotlightCard className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white mb-2 shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('title')}</h2>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Akses portal aman khusus pengelola portofolio.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
              {t('passcode')}
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type={showPasscode ? 'text' : 'password'}
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Masukkan passcode admin..."
                autoComplete="current-password"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-white/[0.1] text-sm font-mono text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-800 dark:focus:border-white/50 focus:ring-1 focus:ring-slate-400/20 dark:focus:ring-white/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                aria-label={showPasscode ? 'Sembunyikan passcode' : 'Tampilkan passcode'}
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            size="md"
            disabled={loading || !passcode}
            className="w-full text-sm font-mono font-medium"
          >
            {loading ? 'Memverifikasi...' : t('login')}
          </Button>
        </form>
      </SpotlightCard>
    </div>
  );
}
