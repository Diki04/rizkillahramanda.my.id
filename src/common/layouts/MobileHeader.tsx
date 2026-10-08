'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X, BadgeCheck } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { mockProfile } from '@/services/data/mock-profile';

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3.5 border-b border-slate-200 dark:border-white/[0.08] bg-white/90 dark:bg-black/90 backdrop-blur-md transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-slate-200 dark:border-white/[0.1] bg-slate-100 dark:bg-zinc-950">
              <Image
                src={mockProfile.avatar}
                alt={mockProfile.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">{mockProfile.nickname}</span>
              <BadgeCheck className="w-3.5 h-3.5 text-slate-800 dark:text-zinc-200 shrink-0" />
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">@Diki04</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Drawer"
          className="p-2 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-zinc-950 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 w-80 h-full bg-white dark:bg-black shadow-2xl animate-in slide-in-from-left duration-200">
            <Sidebar onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
