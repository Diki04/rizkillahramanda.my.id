'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { ChatMessage } from '@/types';
import { Send, MessageSquarePlus, Sparkles, User, MessageSquare } from 'lucide-react';

interface ChatFormProps {
  onMessageAdded: (msg: ChatMessage) => void;
}

export function ChatForm({ onMessageAdded }: ChatFormProps) {
  const t = useTranslations('chat');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Gagal mengirim pesan');
      }

      onMessageAdded(json.data);
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengirim pesan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SpotlightCard className="p-6 sm:p-7 flex flex-col justify-between h-full min-h-[440px] lg:min-h-[520px]">
      <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3.5">
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              <MessageSquarePlus className="w-4 h-4 text-slate-800 dark:text-zinc-200" />
              <span>Tulis Pesan Baru</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
              Publik &amp; Real-time
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-xs font-mono">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
              <span>{t('namePlaceholder')}</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Pratama / Rekan Dev"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-white/10 text-sm font-mono text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-800 dark:focus:border-white/50 focus:ring-1 focus:ring-slate-400/20 dark:focus:ring-white/20 transition-all shadow-2xs"
            />
          </div>

          <div className="space-y-1.5 flex-1">
            <label className="text-xs font-mono font-medium text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
              <span>{t('messagePlaceholder')}</span>
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan apresiasi, saran, atau pertanyaan Anda..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-white/10 text-sm font-mono text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-800 dark:focus:border-white/50 focus:ring-1 focus:ring-slate-400/20 dark:focus:ring-white/20 transition-all resize-none shadow-2xs"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-zinc-900/40 border border-slate-200 dark:border-white/[0.06] text-[11px] font-mono text-slate-600 dark:text-zinc-400 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span>Pesan akan langsung dipublikasikan dan tersimpan secara real-time di database.</span>
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="md"
          disabled={loading || !name.trim() || !message.trim()}
          className="w-full text-sm font-mono font-medium shadow-xs"
        >
          {loading ? (
            <span>{t('sending')}</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5 mr-1.5" />
              <span>{t('sendButton')}</span>
            </>
          )}
        </Button>
      </form>
    </SpotlightCard>
  );
}
