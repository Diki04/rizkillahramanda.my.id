'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { Send, CheckCircle2, Mail, Sparkles } from 'lucide-react';
import { mockProfile } from '@/services/data/mock-profile';

export function ContactForm() {
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${mockProfile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <SpotlightCard className="p-6 sm:p-7 flex flex-col justify-between h-full min-h-[440px] lg:min-h-[520px]">
      {sent ? (
        <div className="py-16 text-center space-y-4 my-auto">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 dark:text-emerald-400 mx-auto" />
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Pesan Anda Disiapkan!</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto font-mono">
            Aplikasi email Anda telah dibuka. Jika tidak muncul, Anda dapat mengirim email manual ke {mockProfile.email}.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSent(false)}
            className="text-xs font-mono"
          >
            Kirim Pesan Lain
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3.5">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-800 dark:text-zinc-200" />
                <span>Kirim Pesan Langsung</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                Direct Email Client
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-slate-700 dark:text-zinc-300">
                {t('formName')}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap Anda"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-white/10 text-sm font-mono text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-800 dark:focus:border-white/50 focus:ring-1 focus:ring-slate-400/20 dark:focus:ring-white/20 transition-all shadow-2xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-slate-700 dark:text-zinc-300">
                {t('formEmail')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@perusahaan.com atau email aktif"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-white/10 text-sm font-mono text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-800 dark:focus:border-white/50 focus:ring-1 focus:ring-slate-400/20 dark:focus:ring-white/20 transition-all shadow-2xs"
              />
            </div>

            <div className="space-y-1.5 flex-1">
              <label className="text-xs font-mono font-medium text-slate-700 dark:text-zinc-300">
                {t('formMessage')}
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Jelaskan kebutuhan proyek, tawaran pekerjaan, atau topik diskusi Anda..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-white/10 text-sm font-mono text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-800 dark:focus:border-white/50 focus:ring-1 focus:ring-slate-400/20 dark:focus:ring-white/20 transition-all resize-none shadow-2xs"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            size="md"
            className="w-full text-sm font-mono font-medium shadow-xs"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            <span>{t('formSubmit')}</span>
          </Button>
        </form>
      )}
    </SpotlightCard>
  );
}
