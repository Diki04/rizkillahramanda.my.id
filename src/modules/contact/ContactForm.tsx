'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { Send, CheckCircle2 } from 'lucide-react';
import { mockProfile } from '@/services/data/mock-profile';

export function ContactForm() {
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open default mail client with prefilled fields
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${mockProfile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <SpotlightCard className="p-6">
      {sent ? (
        <div className="py-12 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 dark:text-emerald-400 mx-auto" />
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Pesan Anda Disiapkan!</h4>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/[0.06] pb-3">
            Kirim Pesan Langsung
          </h4>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
              {t('formName')}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap Anda"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-white/10 text-sm font-mono text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-800 dark:focus:border-white/40 focus:ring-1 focus:ring-slate-400/20 dark:focus:ring-white/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
              {t('formEmail')}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@domain.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-white/10 text-sm font-mono text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-800 dark:focus:border-white/40 focus:ring-1 focus:ring-slate-400/20 dark:focus:ring-white/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
              {t('formMessage')}
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan tujuan atau pesan Anda..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-white/10 text-sm font-mono text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-800 dark:focus:border-white/40 focus:ring-1 focus:ring-slate-400/20 dark:focus:ring-white/20 transition-all resize-none"
            />
          </div>

          <Button
            type="submit"
            variant="secondary"
            size="md"
            className="w-full text-sm font-mono font-medium"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            <span>{t('formSubmit')}</span>
          </Button>
        </form>
      )}
    </SpotlightCard>
  );
}
