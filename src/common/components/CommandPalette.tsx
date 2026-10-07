'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Home, User, Briefcase, Award, BarChart3, MessageSquare, Mail, ShieldAlert, X } from 'lucide-react';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Achievements', href: '/achievements', icon: Award },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Guestbook', href: '/chat', icon: MessageSquare },
  { name: 'Contact', href: '/contact', icon: Mail },
  { name: 'Admin Portal', href: '/admin', icon: ShieldAlert },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useKeyboardShortcut({ key: 'k', ctrlKey: true }, () => {
    setIsOpen((prev) => !prev);
  });

  const filteredItems = navItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 border-b border-dark-border">
          <Search className="w-4 h-4 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to page..."
            className="w-full py-3.5 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-slate-300 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-500 font-mono">
              No matching pages found.
            </p>
          ) : (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
                  <span>{item.name}</span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-slate-950/60 border-t border-dark-border flex justify-between items-center text-[11px] text-slate-500 font-mono">
          <span>Navigation Quick Menu</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
