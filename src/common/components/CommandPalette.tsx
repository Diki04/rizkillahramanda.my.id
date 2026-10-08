'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Home,
  User,
  Briefcase,
  Award,
  BarChart3,
  MessageSquare,
  Mail,
  Link2,
  ShieldAlert,
  PanelLeft,
  PanelTop,
  X,
} from 'lucide-react';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import { useLayout } from '@/common/contexts/LayoutContext';

interface PaletteItem {
  id: string;
  name: string;
  category: 'Navigation' | 'Layout';
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { setLayoutMode } = useLayout();

  useKeyboardShortcut({ key: 'k', ctrlKey: true }, () => {
    setIsOpen((prev) => !prev);
  });

  const items: PaletteItem[] = [
    {
      id: 'nav-home',
      name: 'Home',
      category: 'Navigation',
      icon: Home,
      action: () => router.push('/'),
    },
    {
      id: 'nav-about',
      name: 'About & Career',
      category: 'Navigation',
      icon: User,
      action: () => router.push('/about'),
    },
    {
      id: 'nav-projects',
      name: 'Projects Showcase',
      category: 'Navigation',
      icon: Briefcase,
      action: () => router.push('/projects'),
    },
    {
      id: 'nav-achievements',
      name: 'Certificates & Awards',
      category: 'Navigation',
      icon: Award,
      action: () => router.push('/achievements'),
    },
    {
      id: 'nav-dashboard',
      name: 'Developer Metrics Dashboard',
      category: 'Navigation',
      icon: BarChart3,
      action: () => router.push('/dashboard'),
    },
    {
      id: 'nav-links',
      name: 'Links & Social Bio',
      category: 'Navigation',
      icon: Link2,
      action: () => router.push('/links'),
    },
    {
      id: 'nav-guestbook',
      name: 'Guestbook / Chat',
      category: 'Navigation',
      icon: MessageSquare,
      action: () => router.push('/chat'),
    },
    {
      id: 'nav-contact',
      name: 'Contact & Hire',
      category: 'Navigation',
      icon: Mail,
      action: () => router.push('/contact'),
    },
    {
      id: 'nav-admin',
      name: 'Admin Management Portal',
      category: 'Navigation',
      icon: ShieldAlert,
      action: () => router.push('/admin'),
    },
    {
      id: 'layout-sidebar',
      name: 'Ganti Layout ke: Sidebar Mode',
      category: 'Layout',
      icon: PanelLeft,
      action: () => setLayoutMode('sidebar'),
    },
    {
      id: 'layout-topbar',
      name: 'Ganti Layout ke: Topbar Mode',
      category: 'Layout',
      icon: PanelTop,
      action: () => setLayoutMode('topbar'),
    },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: PaletteItem) => {
    setIsOpen(false);
    setQuery('');
    item.action();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-white/[0.08]">
          <Search className="w-4 h-4 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik navigasi atau ubah mode layout..."
            className="w-full py-3.5 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-sans"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-500 font-mono">
              Tidak ada perintah atau halaman yang cocok.
            </p>
          ) : (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-sky-500 dark:group-hover:text-white" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-50 dark:bg-black/90 border-t border-slate-200 dark:border-white/[0.08] flex justify-between items-center text-[11px] text-slate-500 font-mono">
          <span>Gunakan Ctrl+K untuk membuka menu</span>
          <span>ESC untuk tutup</span>
        </div>
      </div>
    </div>
  );
}
