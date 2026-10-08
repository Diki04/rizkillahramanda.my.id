'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Container } from '@/common/components/Container';
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
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10 text-white transition-colors">
      <Container size="xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-base font-semibold tracking-tight text-white transition-colors"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white font-mono text-sm font-bold shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover:border-white/30 group-hover:bg-white/10">
              R
            </span>
            <span className="font-mono text-sm text-zinc-300 group-hover:text-white transition-colors">
              rizkillah<span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">.dev</span>
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
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
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
            <LocaleSwitcher />
            <ThemeToggle />
            <Link
              href="/admin"
              title="Admin Portal"
              className={cn(
                'p-2 rounded-lg border transition-all duration-200',
                pathname.startsWith('/admin')
                  ? 'border-white/30 text-white bg-white/15'
                  : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20'
              )}
            >
              <Shield className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/Diki04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 active:scale-95"
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
              className="p-2 rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-black/95 backdrop-blur-xl px-4 py-4 space-y-1 transition-all">
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
                    ? 'bg-white text-black font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white py-1 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              <span>Admin Portal</span>
            </Link>
            <a
              href="https://github.com/Diki04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
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
