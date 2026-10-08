'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../utils/cn';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400" />,
    info: <Info className="w-4 h-4 text-slate-900 dark:text-white" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-md text-sm text-slate-900 dark:text-zinc-200 animate-in slide-in-from-bottom-2 duration-200">
      {icons[type]}
      <span>{message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white ml-2">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
