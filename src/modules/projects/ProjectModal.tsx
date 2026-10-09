'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowLeft,
  X,
  ExternalLink,
  Eye,
  Copy,
  Check,
  Triangle,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { getTechIcon } from '@/common/utils/techIcons';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const isEn = locale === 'en';

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  if (!project) return null;

  const cloneCmd =
    project.gettingStarted?.cloneCmd || `git clone ${project.githubUrl}`;
  const templateCmd =
    project.gettingStarted?.templateCmd ||
    `npx create-next-app -e ${project.githubUrl} my-app`;
  const installCmd = project.gettingStarted?.installCmd || 'pnpm install';
  const devCmd = project.gettingStarted?.devCmd || 'pnpm dev';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-white/95 dark:bg-[#000000]/95 backdrop-blur-xl p-4 sm:p-6 md:p-10 transition-colors"
      >
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-16">
          {/* Top Bar with Back Button */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-black dark:hover:text-white border border-slate-300 dark:border-white/10 text-xs sm:text-sm font-mono font-bold transition-colors select-none cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('back')}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white border border-slate-300 dark:border-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Short Description */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
              {isEn ? project.description.en : project.description.id}
            </p>
          </div>

          {/* Subtle Dashed Divider */}
          <div className="border-t border-dashed border-slate-300 dark:border-zinc-800" />

          {/* Metadata & Actions Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
            {/* Views & Tech Icons */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-zinc-400">
                <Eye className="w-4 h-4 text-slate-500 dark:text-zinc-500" />
                <span>{project.views || 1078} {t('views')}</span>
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-500">
                  {t('technology')} :
                </span>
                <div className="flex items-center gap-1.5">
                  {project.tags.slice(0, 6).map((tag) => {
                    const { icon: TechIcon, color } = getTechIcon(tag);
                    return (
                      <span
                        key={tag}
                        title={tag}
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10"
                      >
                        <TechIcon className="w-3.5 h-3.5" style={{ color }} />
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Source Code & Live Demo Links */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors font-medium"
              >
                <SiGithub className="w-4 h-4" />
                <span>{t('sourceCode')}</span>
              </a>

              {project.demoUrl && (
                <>
                  <span className="text-slate-300 dark:text-zinc-700">|</span>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-amber-600 dark:text-[#facc15] hover:underline font-bold transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t('liveDemo')}</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Main Hero Screenshot */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-zinc-950 shadow-xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Section 1: Introduction */}
          <div className="space-y-3 pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <span>📘</span>
              <span>{t('introduction')}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed">
              {project.introduction
                ? isEn
                  ? project.introduction.en
                  : project.introduction.id
                : isEn
                ? project.description.en
                : project.description.id}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 dark:border-white/[0.08]" />

          {/* Section 2: Tech Stack */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <span>⚙️</span>
              <span>{t('techStackTitle')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              {t('poweredBy')}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {project.tags.map((tag) => {
                const { icon: TechIcon, color } = getTechIcon(tag);
                return (
                  <li
                    key={tag}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-zinc-200 font-medium"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shrink-0">
                      <TechIcon className="w-3.5 h-3.5" style={{ color }} />
                    </span>
                    <span>{tag}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Section 3: Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-5 pt-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <span>🚀</span>
                <span>{t('featuresTitle')}</span>
              </h2>

              <div className="space-y-6">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
                      {feat.description}
                    </p>

                    {/* Code Snippet Box with Copy Button */}
                    {feat.codeSnippet && (
                      <div className="relative group rounded-xl bg-slate-100 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 p-3 sm:p-3.5 font-mono text-xs text-slate-900 dark:text-zinc-200 flex items-center justify-between">
                        <code className="truncate pr-8">{feat.codeSnippet}</code>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(feat.codeSnippet!, `feat-${idx}`)
                          }
                          className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 text-slate-500 hover:text-black dark:text-zinc-400 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors"
                          title="Copy"
                        >
                          {copiedKey === `feat-${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Bullets */}
                    {feat.bullets && feat.bullets.length > 0 && (
                      <ul className="space-y-1.5 pl-3 list-disc list-outside text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                        {feat.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Getting Started */}
          <div className="space-y-5 pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <span>🛠</span>
              <span>{t('gettingStarted')}</span>
            </h2>

            {/* Step 1: Clone Repository */}
            <div className="space-y-2.5">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-zinc-200">
                {t('cloneRepo')}
              </p>
              <div className="relative group rounded-xl bg-slate-100 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 p-3 sm:p-3.5 font-mono text-xs text-slate-900 dark:text-zinc-200 flex items-center justify-between">
                <code className="truncate pr-8">{cloneCmd}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(cloneCmd, 'clone')}
                  className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 text-slate-500 hover:text-black dark:text-zinc-400 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors"
                  title="Copy"
                >
                  {copiedKey === 'clone' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Template / starter option */}
              <p className="text-xs text-slate-500 dark:text-zinc-500 pt-1">
                {t('orStarter')}
              </p>
              <div className="relative group rounded-xl bg-slate-100 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 p-3 sm:p-3.5 font-mono text-xs text-slate-900 dark:text-zinc-200 flex items-center justify-between">
                <code className="truncate pr-8">{templateCmd}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(templateCmd, 'template')}
                  className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 text-slate-500 hover:text-black dark:text-zinc-400 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors"
                  title="Copy"
                >
                  {copiedKey === 'template' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Deploy buttons */}
              <p className="text-xs text-slate-500 dark:text-zinc-500 pt-1">
                {t('orDeploy')}
              </p>
              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <a
                  href={`https://vercel.com/new/clone?repository-url=${encodeURIComponent(
                    project.githubUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-mono font-bold hover:bg-zinc-800 transition-colors border border-white/20 shadow-xs"
                >
                  <Triangle className="w-3 h-3 fill-white" />
                  <span>Deploy</span>
                </a>
                <a
                  href={`https://app.netlify.com/start/deploy?repository=${encodeURIComponent(
                    project.githubUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00ad9f] text-white text-xs font-mono font-bold hover:bg-[#00968a] transition-colors shadow-xs"
                >
                  <span>Deploy to Netlify</span>
                </a>
              </div>
            </div>

            {/* Step 2: Install Dependencies */}
            <div className="space-y-2.5 pt-3">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-zinc-200">
                {t('installDeps')}
              </p>
              <div className="relative group rounded-xl bg-slate-100 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 p-3 sm:p-3.5 font-mono text-xs text-slate-900 dark:text-zinc-200 flex items-center justify-between">
                <code>{installCmd}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(installCmd, 'install')}
                  className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 text-slate-500 hover:text-black dark:text-zinc-400 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors"
                  title="Copy"
                >
                  {copiedKey === 'install' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Step 3: Run Dev Server */}
            <div className="space-y-2.5 pt-3">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-zinc-200">
                {t('runDev')}
              </p>
              <div className="relative group rounded-xl bg-slate-100 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 p-3 sm:p-3.5 font-mono text-xs text-slate-900 dark:text-zinc-200 flex items-center justify-between">
                <code>{devCmd}</code>
                <button
                  type="button"
                  onClick={() => handleCopy(devCmd, 'dev')}
                  className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 text-slate-500 hover:text-black dark:text-zinc-400 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors"
                  title="Copy"
                >
                  {copiedKey === 'dev' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
