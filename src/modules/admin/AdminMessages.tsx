'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChatMessage } from '@/types';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Button } from '@/common/components/Button';
import { Trash2, MessageSquare, RefreshCw, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminMessagesProps {
  messages: ChatMessage[];
  onRefresh: () => void;
}

export function AdminMessages({ messages, onRefresh }: AdminMessagesProps) {
  const t = useTranslations('admin');
  const locale = useLocale();
  const isEn = locale === 'en';
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('messages.deleteConfirm'))) return;

    setDeletingId(id);
    setFeedback(null);
    try {
      const res = await fetch(`/api/chat?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: 'success',
          text: isEn ? 'Message successfully removed.' : 'Pesan berhasil dihapus.',
        });
        onRefresh();
      } else {
        setFeedback({
          type: 'error',
          text: data.error || (isEn ? 'Failed to delete message.' : 'Gagal menghapus pesan.'),
        });
      }
    } catch {
      setFeedback({
        type: 'error',
        text: isEn ? 'Network error occurred.' : 'Terjadi kesalahan jaringan.',
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-navy-900/40">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            <span>{t('messages.title')}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('messages.subtitle')}
          </p>
        </div>

        <Button onClick={onRefresh} variant="outline" size="sm" className="self-start sm:self-auto text-xs">
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          <span>{isEn ? 'Refresh' : 'Muat Ulang'}</span>
        </Button>
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Messages Feed */}
      {messages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {messages.map((msg) => (
            <SpotlightCard key={msg.id} className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {msg.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(msg.createdAt).toLocaleDateString(isEn ? 'en-US' : 'id-ID', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-navy-950/50 p-3 rounded-xl border border-slate-100 dark:border-white/[0.04]">
                  &ldquo;{msg.message}&rdquo;
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => handleDelete(msg.id)}
                  disabled={deletingId === msg.id}
                  variant="outline"
                  size="sm"
                  className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 dark:border-rose-500/30 dark:hover:bg-rose-500/10"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  <span>{deletingId === msg.id ? (isEn ? 'Deleting...' : 'Menghapus...') : t('delete')}</span>
                </Button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-navy-900/40">
          <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {t('messages.empty')}
          </p>
        </div>
      )}
    </div>
  );
}
