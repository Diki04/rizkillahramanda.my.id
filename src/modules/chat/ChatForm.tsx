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
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 text-sm font-semibold text-white">
          <MessageSquarePlus className="w-4 h-4 text-accent-blue" />
          <span>Tulis Pesan</span>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-400">
            {t('namePlaceholder')}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Pratama"
            className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-white/[0.08] text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/50 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-400">
            {t('messagePlaceholder')}
          </label>
          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan ucapan atau ulasan singkat Anda..."
            className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-white/[0.08] text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/50 transition-all resize-none"
          />
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="md"
          disabled={loading || !name.trim() || !message.trim()}
          className="w-full text-xs font-mono"
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
