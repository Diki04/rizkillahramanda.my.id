'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { ChatMessage } from '@/types';
import { Send, MessageSquarePlus } from 'lucide-react';

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
    <SpotlightCard className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.06] pb-3 text-sm font-semibold text-slate-900 dark:text-white">
          <MessageSquarePlus className="w-4 h-4 text-zinc-400 dark:text-zinc-400" />
          <span>Tulis Pesan</span>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-slate-700 dark:text-zinc-300">
            {t('namePlaceholder')}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Pratama"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-white/10 text-sm font-mono text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-800 dark:focus:border-white/50 focus:ring-1 focus:ring-slate-400/20 dark:focus:ring-white/20 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-slate-700 dark:text-zinc-300">
            {t('messagePlaceholder')}
          </label>
          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan ucapan atau ulasan singkat Anda..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-white/10 text-sm font-mono text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-800 dark:focus:border-white/50 focus:ring-1 focus:ring-slate-400/20 dark:focus:ring-white/20 transition-all resize-none"
          />
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="md"
          disabled={loading || !name.trim() || !message.trim()}
          className="w-full text-sm font-mono font-medium"
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
