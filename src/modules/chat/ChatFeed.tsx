'use client';

import React from 'react';
import { ChatMessage } from '@/types';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { MessageSquare, Clock } from 'lucide-react';

interface ChatFeedProps {
  messages: ChatMessage[];
  loading?: boolean;
}

export function ChatFeed({ messages, loading }: ChatFeedProps) {
  const t = useTranslations('chat');

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-navy-900/40 border border-white/[0.06] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="py-16 text-center rounded-2xl border border-white/[0.06] bg-navy-900/30">
        <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p className="font-mono text-xs text-slate-400">{t('emptyState')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => {
        const formattedDate = new Date(msg.createdAt).toLocaleDateString(
          'id-ID',
          {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }
        );

        return (
          <SpotlightCard key={msg.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between gap-2 border-b border-white/[0.04] pb-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-950 border border-white/[0.08] text-accent-blue font-mono text-xs font-bold">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-mono text-xs font-semibold text-white">
                  {msg.name}
                </span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <Clock className="w-3 h-3" />
                {formattedDate}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {msg.message}
            </p>
          </SpotlightCard>
        );
      })}
    </div>
  );
}
