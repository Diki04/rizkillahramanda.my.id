'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Mail, Github, Linkedin, MapPin, Copy, Check, ExternalLink, Clock } from 'lucide-react';
import { mockProfile } from '@/services/data/mock-profile';

export function SocialLinks() {
  const t = useTranslations('contact');
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(mockProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-[440px] lg:min-h-[520px] space-y-4">
      {/* Email Card with Copy button */}
      <SpotlightCard className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 font-medium">{t('emailLabel')}</p>
              <a
                href={`mailto:${mockProfile.email}`}
                className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white hover:underline transition-colors block mt-0.5"
              >
                {mockProfile.email}
              </a>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Siap menerima penawaran proyek &amp; kolaborasi
              </span>
            </div>
          </div>
          <button
            onClick={copyEmail}
            title="Salin email ke clipboard"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/30 text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-all shadow-xs"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </SpotlightCard>

      {/* Location & Availability Card */}
      <SpotlightCard className="p-5 sm:p-6">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white shadow-xs">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 font-medium">{t('locationLabel')}</p>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{mockProfile.location}</p>
            <p className="text-xs font-mono text-slate-600 dark:text-zinc-400">
              Waktu Lokal: WIB (UTC+7) • Terbuka untuk Remote, On-site, &amp; Hybrid
            </p>
          </div>
        </div>
      </SpotlightCard>

      {/* Response Guarantee & Social Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        <a
          href={mockProfile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          <SpotlightCard className="p-5 hover:border-slate-400 dark:hover:border-white/30 transition-all h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Github className="w-5 h-5 text-slate-900 dark:text-white" />
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">GitHub</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 mt-2">
              Jelajahi open-source &amp; repositori publik
            </p>
          </SpotlightCard>
        </a>

        <a
          href={mockProfile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          <SpotlightCard className="p-5 hover:border-slate-400 dark:hover:border-white/30 transition-all h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Linkedin className="w-5 h-5 text-slate-900 dark:text-white" />
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">LinkedIn</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 mt-2">
              Terhubung secara profesional
            </p>
          </SpotlightCard>
        </a>
      </div>

      {/* Response Time Badge */}
      <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-zinc-900/40 border border-slate-200 dark:border-white/[0.06] text-xs font-mono text-slate-600 dark:text-zinc-400 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
          <span>Waktu Respons Cepat:</span>
        </span>
        <span className="font-bold text-slate-900 dark:text-white">&lt; 24 Jam Kerja</span>
      </div>
    </div>
  );
}
