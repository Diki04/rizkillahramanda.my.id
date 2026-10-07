'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Container } from '@/common/components/Container';
import { ThemeToggle } from '@/common/components/ThemeToggle';
import { LocaleSwitcher } from '@/common/components/LocaleSwitcher';
import { LayoutToggle } from '@/common/components/LayoutToggle';
import { AmbientAudioPlayer } from '@/common/components/AmbientAudioPlayer';
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-white/[0.08] bg-white/85 dark:bg-navy-950/80 backdrop-blur-md transition-colors">
      <Container size="xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-base font-semibold tracking-tight text-slate-900 dark:text-white transition-colors"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/[0.12] text-sky-500 font-mono text-sm font-bold shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover:border-sky-400/40">
              R
            </span>
            <span className="font-mono text-sm text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              rizkillah<span className="text-sky-500">.dev</span>
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
                      ? 'bg-sky-50 dark:bg-navy-800 text-sky-600 dark:text-accent-blue font-semibold border border-sky-400/40 dark:border-accent-blue/30 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-navy-900/60'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Controls */}
          <div className="hidden md:flex items-center gap-2">
            <LayoutToggle />
            <AmbientAudioPlayer />
            <LocaleSwitcher />
            <ThemeToggle />
            <Link
              href="/admin"
              title="Admin Portal"
              className={cn(
                'p-2 rounded-lg border transition-all duration-200 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800',
                pathname.startsWith('/admin')
                  ? 'border-accent-blue/40 text-accent-blue bg-sky-50 dark:bg-navy-800'
                  : 'border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-800/80'
              )}
            >
              <Shield className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/Diki04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-800/80 hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 active:scale-95"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LayoutToggle />
            <LocaleSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-white/[0.08] bg-white/95 dark:bg-navy-950/95 backdrop-blur-xl px-4 py-4 space-y-1 transition-all">
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
                    ? 'bg-sky-50 dark:bg-navy-800 text-sky-600 dark:text-accent-blue font-semibold border border-sky-400/30 dark:border-accent-blue/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-900'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1"
            >
              <Shield className="w-3.5 h-3.5 text-sky-500" />
              <span>Admin Portal</span>
            </Link>
            <a
              href="https://github.com/Diki04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>@Diki04</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
