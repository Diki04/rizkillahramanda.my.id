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
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3.5 border-b border-white/[0.08] bg-navy-950/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/[0.1] bg-navy-900">
              <Image
                src={mockProfile.avatar}
                alt={mockProfile.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-navy-950" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-white tracking-tight">{mockProfile.nickname}</span>
              <BadgeCheck className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <p className="text-[10px] font-mono text-slate-400">@Diki04</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Drawer"
          className="p-2 rounded-xl border border-white/[0.08] bg-navy-900 text-slate-300 hover:text-white transition-colors"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 w-72 h-full bg-navy-950 shadow-2xl animate-in slide-in-from-left duration-200">
            <Sidebar onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
