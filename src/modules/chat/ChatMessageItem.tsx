import React from 'react';
import { Calendar } from 'lucide-react';
import { ChatMessage } from '@/types';
import { relativeTime } from '../../common/utils/relativeTime';

interface ChatMessageItemProps {
  message: ChatMessage | any;
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
  const authorName = message.name || message.sender_name || 'Anonymous';
  const text = message.message || message.content || '';
  const dateStr = message.createdAt || message.created_at || new Date().toISOString();
  const initials = authorName
    .split(' ')
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="p-4 rounded-xl border border-dark-border bg-slate-900/40 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
            {initials}
          </div>
          <span className="text-sm font-medium text-slate-200">{authorName}</span>
        </div>
        <div className="flex items-center text-[11px] font-mono text-slate-500">
          <Calendar className="w-3 h-3 mr-1" />
          {relativeTime(dateStr)}
        </div>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-sans pl-9">
        {text}
      </p>
    </div>
  );
}
