import React from 'react';
import { MessageSquare, Calendar } from 'lucide-react';
import { ChatMessage } from '../../services/types';
import { relativeTime } from '../../common/utils/relativeTime';

interface ChatMessageItemProps {
  message: ChatMessage;
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
  const initials = message.sender_name
    .split(' ')
    .map((w) => w[0])
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
          <span className="text-sm font-medium text-slate-200">{message.sender_name}</span>
        </div>
        <div className="flex items-center text-[11px] font-mono text-slate-500">
          <Calendar className="w-3 h-3 mr-1" />
          {relativeTime(message.created_at)}
        </div>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-sans pl-9">
        {message.content}
      </p>
    </div>
  );
}
