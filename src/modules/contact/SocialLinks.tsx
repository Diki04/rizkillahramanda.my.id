'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Mail, Github, Linkedin, MapPin, Copy, Check, ArrowUpRight } from 'lucide-react';
import { mockProfile } from '@/services/data/mock-profile';

export function SocialLinks() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isEn = locale === 'en';
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
                {isEn ? 'Available for projects & collaboration' : 'Siap menerima penawaran proyek & kolaborasi'}
              </span>
            </div>
          </div>
          <button
            onClick={copyEmail}
            title={isEn ? 'Copy email' : 'Salin email'}
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
              {isEn
                ? 'Local Time: WIB (UTC+7) • Available for Remote, On-site & Hybrid'
                : 'Waktu Lokal: WIB (UTC+7) • Terbuka untuk Remote, On-site, & Hybrid'}
            </p>
          </div>
        </div>
      </SpotlightCard>

      {/* Social Links Cards (High-polish, symmetric bento-style cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={mockProfile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group block h-full"
        >
          <SpotlightCard className="p-4 sm:p-5 h-full hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300">
            <div className="flex flex-col justify-between h-full space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white shadow-xs group-hover:scale-105 group-hover:border-slate-400 dark:group-hover:border-white/20 transition-all">
                  <Github className="w-5 h-5" />
                </div>
                <div className="p-1.5 rounded-lg text-slate-400 dark:text-zinc-500 group-hover:text-slate-900 dark:group-hover:text-white group-hover:bg-slate-100 dark:group-hover:bg-white/[0.06] transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white group-hover:underline">
                    GitHub
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 font-medium">
                    @Diki04
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 leading-snug">
                  {isEn ? 'Open-source repositories' : 'Repositori & open-source'}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                <span>{isEn ? '49+ Repos' : '49+ Repositori'}</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {isEn ? 'Active' : 'Aktif'}
                </span>
              </div>
            </div>
          </SpotlightCard>
        </a>

        <a
          href={mockProfile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group block h-full"
        >
          <SpotlightCard className="p-4 sm:p-5 h-full hover:border-slate-400 dark:hover:border-white/30 transition-all duration-300">
            <div className="flex flex-col justify-between h-full space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white shadow-xs group-hover:scale-105 group-hover:border-slate-400 dark:group-hover:border-white/20 transition-all">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="p-1.5 rounded-lg text-slate-400 dark:text-zinc-500 group-hover:text-slate-900 dark:group-hover:text-white group-hover:bg-slate-100 dark:group-hover:bg-white/[0.06] transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white group-hover:underline">
                    LinkedIn
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 font-medium truncate max-w-[120px]">
                    in/rizkillah
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 leading-snug">
                  {isEn ? 'Professional network' : 'Jejaring & karir profesional'}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                <span>{isEn ? 'Network' : 'Koneksi'}</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {isEn ? 'Connected' : 'Terhubung'}
                </span>
              </div>
            </div>
          </SpotlightCard>
        </a>
      </div>
    </div>
  );
}
