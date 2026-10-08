'use client';

import React from 'react';
import { ShieldCheck, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-6 border-b border-dark-border mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/10 border border-white/20 text-white">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Admin Management Portal</h1>
          <p className="text-xs font-mono text-slate-400">Authenticated Session (Active)</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-mono transition-colors"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Logout</span>
      </button>
    </div>
  );
}
