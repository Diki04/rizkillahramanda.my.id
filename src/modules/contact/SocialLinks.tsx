'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Mail, Github, Linkedin, MapPin, Copy, Check, ExternalLink } from 'lucide-react';
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
    <div className="flex flex-col space-y-4">
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

      {/* Social Links Cards (Tight, crisp, zero excessive whitespace) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={mockProfile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <SpotlightCard className="p-4 sm:p-5 hover:border-slate-400 dark:hover:border-white/30 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-slate-900 dark:text-white" />
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white group-hover:text-black dark:group-hover:text-white">GitHub</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </div>
            <p className="text-xs font-mono text-slate-600 dark:text-zinc-400 leading-snug">
              Jelajahi open-source &amp; repositori publik
            </p>
            <div className="pt-1">
              <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-zinc-400">@Diki04</span>
            </div>
          </SpotlightCard>
        </a>

        <a
          href={mockProfile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <SpotlightCard className="p-4 sm:p-5 hover:border-slate-400 dark:hover:border-white/30 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-slate-900 dark:text-white" />
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white group-hover:text-black dark:group-hover:text-white">LinkedIn</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </div>
            <p className="text-xs font-mono text-slate-600 dark:text-zinc-400 leading-snug">
              Terhubung secara profesional
            </p>
            <div className="pt-1">
              <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-zinc-400">in/rizkillah-ramanda-sinyo</span>
            </div>
          </SpotlightCard>
        </a>
      </div>
    </div>
  );
}
