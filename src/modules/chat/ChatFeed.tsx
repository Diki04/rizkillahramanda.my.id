'use client';

import React from 'react';
import { ChatMessage } from '@/types';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { MessageSquare, Clock, Inbox, Sparkles } from 'lucide-react';

interface ChatFeedProps {
  messages: ChatMessage[];
  loading?: boolean;
}

export function ChatFeed({ messages, loading }: ChatFeedProps) {
  const t = useTranslations('chat');

  return (
    <SpotlightCard className="p-6 sm:p-7 flex flex-col justify-between h-full min-h-[440px] lg:min-h-[520px]">
      <div className="flex flex-col h-full">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3.5 mb-4 shrink-0">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            <Inbox className="w-4 h-4 text-slate-800 dark:text-zinc-200" />
            <span>Riwayat Pesan Pengunjung</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white">
              {messages.length} Pesan
            </span>
          </div>
        </div>

        {/* Feed List Container */}
        <div className="flex-1 overflow-y-auto max-h-[380px] lg:max-h-[460px] pr-1 sm:pr-2 space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl bg-slate-100 dark:bg-zinc-950/40 border border-slate-200 dark:border-white/[0.06] animate-pulse"
                />
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-slate-300 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-zinc-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  Belum Ada Pesan
                </h4>
                <p className="font-mono text-xs text-slate-500 dark:text-zinc-400">
                  {t('emptyState')}
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg) => {
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
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white/70 dark:bg-zinc-950/60 shadow-xs hover:border-slate-300 dark:hover:border-white/20 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/[0.04] pb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono text-xs font-bold">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white">
                        {msg.name}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                      <Clock className="w-3 h-3" />
                      {formattedDate}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed pt-1">
                    {msg.message}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
