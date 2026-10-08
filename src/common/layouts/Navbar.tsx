'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { ThemeToggle } from '@/common/components/ThemeToggle';
import { LocaleSwitcher } from '@/common/components/LocaleSwitcher';
import { LayoutToggle } from '@/common/components/LayoutToggle';
import { Menu, X, Github, Shield } from 'lucide-react';
import { cn } from '@/common/utils/cn';

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/projects', label: t('projects') },
    { href: '/dashboard', label: t('dashboard') },
    { href: '/achievements', label: t('achievements') },
    { href: '/links', label: t('links') },
    { href: '/chat', label: t('chat') },
    { href: '/contact', label: t('contact') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-300 dark:border-white/10 bg-white/95 dark:bg-black/75 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:shadow-black/50 pointer-events-auto transition-colors duration-300">
        <div className="px-3.5 sm:px-6 flex h-14 sm:h-16 items-center justify-between">
          {/* Logo Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-base font-semibold tracking-tight text-slate-950 dark:text-white transition-colors"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-950 dark:text-white font-mono text-sm font-bold shadow-xs transition-transform duration-200 group-hover:scale-105 group-hover:border-slate-400 dark:group-hover:border-white/30 group-hover:bg-slate-200 dark:group-hover:bg-white/10">
              R
            </span>
            <span className="font-mono text-sm font-bold text-slate-950 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors">
              rizkillah<span className="text-slate-500 dark:text-zinc-500 group-hover:text-slate-700 dark:text-zinc-400 transition-colors">.dev</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 rounded-lg transition-all duration-200 text-xs font-mono tracking-wide',
                    active
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-black font-bold shadow-xs'
                      : 'text-slate-800 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 font-medium'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Controls (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <LayoutToggle />
            <LocaleSwitcher />
            <ThemeToggle />
            <Link
              href="/admin"
              title="Admin Portal"
              className={cn(
                'p-2 rounded-lg border transition-all duration-200',
                pathname.startsWith('/admin')
                  ? 'border-slate-400 dark:border-white/30 text-slate-950 dark:text-white bg-slate-100 dark:bg-white/15'
                  : 'border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/20'
              )}
            >
              <Shield className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/Diki04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-all duration-200 active:scale-95"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Topbar Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white/95 dark:bg-white/5 text-slate-900 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-300/90 dark:border-white/10 px-4 py-3 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-zinc-300">Language</span>
              <LocaleSwitcher />
            </div>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-3 py-2 rounded-lg text-sm font-mono tracking-wide transition-colors',
                    active
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-black font-bold'
                      : 'text-slate-900 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 font-semibold'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-300/90 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white py-1 transition-colors font-bold"
              >
                <Shield className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-400" />
                <span>Admin Portal</span>
              </Link>
              <a
                href="https://github.com/Diki04"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white inline-flex items-center gap-1.5 transition-colors font-bold"
              >
                <Github className="w-3.5 h-3.5" />
                <span>@Diki04</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
