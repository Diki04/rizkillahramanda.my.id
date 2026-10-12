'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { SiGmail, SiInstagram, SiTiktok, SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { mockProfile } from '@/services/data/mock-profile';

export function SocialLinks() {
  const t = useTranslations('contact');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
      {/* 1. Gmail Card (Full Width / md:col-span-2) */}
      <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-red-500/30 dark:border-red-500/20 bg-gradient-to-r from-red-700 via-red-800 to-red-950 p-6 sm:p-8 md:col-span-2 shadow-xl shadow-red-950/20 transition-all duration-300 hover:shadow-2xl hover:border-red-400/50 hover:-translate-y-1">
        {/* Ambient Subtle Radial Glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_70%)]" />

        {/* Rotated Giant Background Watermark Icon */}
        <div className="pointer-events-none absolute -left-12 -top-12 sm:-left-16 sm:-top-16 rotate-45 text-white/[0.06] select-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[50deg]">
          <SiGmail className="w-56 h-56 sm:w-72 sm:h-72" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-white">
              {t('gmailTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed font-sans">
              {t('gmailDesc')}
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${mockProfile.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-red-200 hover:bg-white text-red-950 font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-105 active:scale-95 group/btn"
              >
                <span>{t('gmailBtn')}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="self-end sm:self-center shrink-0">
            <div className="p-3.5 sm:p-4 rounded-2xl border-4 border-red-300/40 bg-red-500/20 text-white shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <SiGmail className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Instagram Card (col-span-1) */}
      <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-pink-500/30 dark:border-pink-500/20 bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 p-6 sm:p-7 shadow-xl shadow-pink-950/20 transition-all duration-300 hover:shadow-2xl hover:border-pink-400/50 hover:-translate-y-1">
        {/* Ambient Subtle Radial Glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_70%)]" />

        {/* Rotated Giant Background Watermark Icon */}
        <div className="pointer-events-none absolute -left-10 -top-10 sm:-left-14 sm:-top-14 rotate-45 text-white/[0.06] select-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[50deg]">
          <SiInstagram className="w-52 h-52 sm:w-64 sm:h-64" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full min-h-[170px] sm:min-h-[190px]">
          <div className="space-y-1.5 pr-14 sm:pr-16">
            <h3 className="text-lg sm:text-xl font-bold tracking-wide text-white">
              {t('instagramTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-sans line-clamp-2">
              {t('instagramDesc')}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <a
              href={mockProfile.instagram || 'https://instagram.com/rizkillah_ramanda'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2 rounded-xl bg-purple-100 hover:bg-white text-purple-950 font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-105 active:scale-95 group/btn"
            >
              <span>{t('instagramBtn')}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>

            <div className="p-3 sm:p-3.5 rounded-2xl border-4 border-pink-300/40 bg-pink-500/20 text-white shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <SiInstagram className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. LinkedIn Card (col-span-1) */}
      <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-sky-500/30 dark:border-sky-500/20 bg-gradient-to-br from-sky-700 via-sky-800 to-sky-950 p-6 sm:p-7 shadow-xl shadow-sky-950/20 transition-all duration-300 hover:shadow-2xl hover:border-sky-400/50 hover:-translate-y-1">
        {/* Ambient Subtle Radial Glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_70%)]" />

        {/* Rotated Giant Background Watermark Icon */}
        <div className="pointer-events-none absolute -left-10 -top-10 sm:-left-14 sm:-top-14 rotate-45 text-white/[0.06] select-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[50deg]">
          <FaLinkedinIn className="w-52 h-52 sm:w-64 sm:h-64" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full min-h-[170px] sm:min-h-[190px]">
          <div className="space-y-1.5 pr-14 sm:pr-16">
            <h3 className="text-lg sm:text-xl font-bold tracking-wide text-white">
              {t('linkedinTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-sans line-clamp-2">
              {t('linkedinDesc')}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <a
              href={mockProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2 rounded-xl bg-sky-200 hover:bg-white text-sky-950 font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-105 active:scale-95 group/btn"
            >
              <span>{t('linkedinBtn')}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>

            <div className="p-3 sm:p-3.5 rounded-2xl border-4 border-sky-300/40 bg-sky-500/20 text-white shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <FaLinkedinIn className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. TikTok Card (col-span-1) */}
      <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-700/40 dark:border-white/10 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 p-6 sm:p-7 shadow-xl shadow-black/30 transition-all duration-300 hover:shadow-2xl hover:border-zinc-500/50 hover:-translate-y-1">
        {/* Ambient Subtle Radial Glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]" />

        {/* Rotated Giant Background Watermark Icon */}
        <div className="pointer-events-none absolute -left-10 -top-10 sm:-left-14 sm:-top-14 rotate-45 text-white/[0.04] select-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[50deg]">
          <SiTiktok className="w-52 h-52 sm:w-64 sm:h-64" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full min-h-[170px] sm:min-h-[190px]">
          <div className="space-y-1.5 pr-14 sm:pr-16">
            <h3 className="text-lg sm:text-xl font-bold tracking-wide text-white">
              {t('tiktokTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans line-clamp-2">
              {t('tiktokDesc')}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <a
              href={mockProfile.tiktok || 'https://tiktok.com/@diki.ramanda'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2 rounded-xl bg-zinc-200 hover:bg-white text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-105 active:scale-95 group/btn"
            >
              <span>{t('tiktokBtn')}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>

            <div className="p-3 sm:p-3.5 rounded-2xl border-4 border-zinc-400/40 bg-zinc-700/20 text-white shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <SiTiktok className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. GitHub Card (col-span-1) */}
      <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/40 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6 sm:p-7 shadow-xl shadow-black/40 transition-all duration-300 hover:shadow-2xl hover:border-slate-500/50 hover:-translate-y-1">
        {/* Ambient Subtle Radial Glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]" />

        {/* Rotated Giant Background Watermark Icon */}
        <div className="pointer-events-none absolute -left-10 -top-10 sm:-left-14 sm:-top-14 rotate-45 text-white/[0.04] select-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[50deg]">
          <SiGithub className="w-52 h-52 sm:w-64 sm:h-64" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full min-h-[170px] sm:min-h-[190px]">
          <div className="space-y-1.5 pr-14 sm:pr-16">
            <h3 className="text-lg sm:text-xl font-bold tracking-wide text-white">
              {t('githubTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-2">
              {t('githubDesc')}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <a
              href={mockProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2 rounded-xl bg-slate-200 hover:bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-105 active:scale-95 group/btn"
            >
              <span>{t('githubBtn')}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>

            <div className="p-3 sm:p-3.5 rounded-2xl border-4 border-slate-400/40 bg-slate-700/20 text-white shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <SiGithub className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
