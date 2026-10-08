'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { ChatForm } from '@/modules/chat/ChatForm';
import { ChatFeed } from '@/modules/chat/ChatFeed';
import { ChatMessage } from '@/types';
import { MessageSquare } from 'lucide-react';

export default function ChatPage() {
  const t = useTranslations('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/chat')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setMessages(json.data);
        }
      })
      .catch((err) => console.error('Error fetching chat messages', err))
      .finally(() => setLoading(false));
  }, []);

  const handleMessageAdded = (newMsg: ChatMessage) => {
    setMessages((prev) => [newMsg, ...prev]);
  };

  return (
    <div className="py-16 md:py-20 space-y-12">
      <Container size="xl">
        {/* Header */}
        <ScrollReveal className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white text-xs font-mono font-medium">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">{t('subtitle')}</p>
        </ScrollReveal>

        {/* Content Layout */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4" delay={0.15}>
          <div className="lg:col-span-5">
            <ChatForm onMessageAdded={handleMessageAdded} />
          </div>
          <div className="lg:col-span-7">
            <ChatFeed messages={messages} loading={loading} />
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
