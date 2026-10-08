'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { Shield, KeyRound, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const t = useTranslations('admin');
  const [passcode, setPasscode] = useState('');
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
          <div className="inline-flex p-3 rounded-2xl bg-zinc-900 border border-white/20 text-white mb-2">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">{t('title')}</h2>
          <p className="text-xs font-mono text-slate-400">
            Hanya dapat diakses oleh pemilik portofolio (Rizkillah Ramanda).
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">
              {t('passcode')}
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan passcode admin..."
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.1] text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            size="md"
            disabled={loading || !passcode}
            className="w-full text-xs font-mono"
          >
            {loading ? 'Memverifikasi...' : t('login')}
          </Button>
        </form>
      </SpotlightCard>
    </div>
  );
}
