'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { copyToClipboard } from '../../common/utils/clipboard';

interface ProjectShareButtonProps {
  title: string;
  url: string;
}

export function ProjectShareButton({ title, url }: ProjectShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dark-border bg-slate-900/60 text-xs font-mono text-slate-300 hover:text-white hover:border-sky-500/40 transition-colors"
      title="Share project"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400">Copied</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
