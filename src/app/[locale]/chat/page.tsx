'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
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
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/10 text-accent-blue text-xs font-mono font-medium">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Interactive Guestbook</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {t('title')}
          </h1>
          <p className="text-base text-slate-400">{t('subtitle')}</p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <div className="lg:col-span-5">
            <ChatForm onMessageAdded={handleMessageAdded} />
          </div>
          <div className="lg:col-span-7">
            <ChatFeed messages={messages} loading={loading} />
          </div>
        </div>
      </Container>
    </div>
  );
}
