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
    <div className="space-y-4">
      {/* Email Card with Copy button */}
      <SpotlightCard className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 dark:text-zinc-400">{t('emailLabel')}</p>
              <a
                href={`mailto:${mockProfile.email}`}
                className="text-sm font-mono font-medium text-slate-900 dark:text-white hover:underline transition-colors"
              >
                {mockProfile.email}
              </a>
            </div>
          </div>
          <button
            onClick={copyEmail}
            title="Copy email to clipboard"
            className="p-2 rounded-lg bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] hover:border-white/30 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </SpotlightCard>

      {/* Location Card */}
      <SpotlightCard className="p-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-400">{t('locationLabel')}</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">{mockProfile.location}</p>
          </div>
        </div>
      </SpotlightCard>

      {/* Social Links Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={mockProfile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <SpotlightCard className="p-4 hover:border-white/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Github className="w-4 h-4 text-slate-800 dark:text-zinc-300" />
                <span className="text-xs font-mono font-medium text-slate-900 dark:text-white">GitHub</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
            </div>
          </SpotlightCard>
        </a>

        <a
          href={mockProfile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <SpotlightCard className="p-4 hover:border-white/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Linkedin className="w-4 h-4 text-slate-800 dark:text-zinc-300" />
                <span className="text-xs font-mono font-medium text-slate-900 dark:text-white">LinkedIn</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
            </div>
          </SpotlightCard>
        </a>
      </div>
    </div>
  );
}
