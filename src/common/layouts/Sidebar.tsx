'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import {
  Home,
  User,
  FolderGit2,
  Award,
  BarChart3,
  MessageSquare,
  Mail,
  Link2,
  BadgeCheck,
  Github,
  Linkedin,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/common/utils/cn';
import { LayoutToggle } from '@/common/components/LayoutToggle';
import { LocaleSwitcher } from '@/common/components/LocaleSwitcher';
import { ThemeToggle } from '@/common/components/ThemeToggle';
import { mockProfile } from '@/services/data/mock-profile';

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/about', label: t('about'), icon: User },
    { href: '/projects', label: t('projects'), icon: FolderGit2 },
    { href: '/achievements', label: t('achievements'), icon: Award },
    { href: '/dashboard', label: t('dashboard'), icon: BarChart3 },
    { href: '/links', label: t('links'), icon: Link2 },
    { href: '/chat', label: t('chat'), icon: MessageSquare },
    { href: '/contact', label: t('contact'), icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        'w-80 h-screen sticky top-0 flex flex-col justify-between p-6 border-r border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-black/65 backdrop-blur-2xl select-none overflow-y-auto transition-all duration-300 shadow-xl shadow-slate-900/5 dark:shadow-black/50',
        className
      )}
    >
      {/* Top Profile Card */}
      <div className="space-y-6">
        <div className="group flex items-center gap-4 p-3.5 -mx-2 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-white/[0.08] hover:bg-slate-50/90 dark:hover:bg-white/[0.03] hover:shadow-lg hover:shadow-white/5 transition-all duration-300 pb-5 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="relative shrink-0">
            <div className="p-0.5 rounded-2xl bg-gradient-to-tr from-zinc-400 via-white to-zinc-600 shadow-md group-hover:shadow-[0_0_22px_rgba(255,255,255,0.35)] group-hover:scale-105 transition-all duration-300">
              <div className="w-[72px] h-[72px] rounded-[14px] overflow-hidden bg-slate-100 dark:bg-zinc-950 relative">
                <Image
                  src={mockProfile.avatar}
                  alt={mockProfile.name}
                  width={72}
                  height={72}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
            <span
              title="Online & Ready"
              className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black animate-pulse shadow-sm"
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white truncate tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                {mockProfile.name}
              </h2>
              <BadgeCheck className="w-4 h-4 text-slate-800 dark:text-zinc-200 shrink-0" />
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-white/20 text-xs font-mono font-medium">
                Full-Stack & ML
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Pekanbaru, ID 🇮🇩</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu with Rich Hover States */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  'group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-mono transition-all duration-200 border',
                  active
                    ? 'bg-zinc-100 dark:bg-white/10 border-slate-300 dark:border-white/25 text-zinc-900 dark:text-white font-semibold shadow-sm translate-x-1'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/[0.06] hover:border-slate-200 dark:hover:border-white/[0.1] hover:translate-x-1 hover:shadow-sm'
                )}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-transform duration-200 group-hover:scale-125',
                      active ? 'text-black dark:text-white' : 'text-slate-400 group-hover:text-black dark:group-hover:text-white'
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {active ? (
                  <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-slate-400 group-hover:text-black dark:group-hover:text-white transition-all duration-200" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls & Footer */}
      <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/[0.08] space-y-4">
        {/* Quick Toolbar */}
        <div className="flex items-center justify-between gap-1.5 px-1">
          <LayoutToggle />
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        {/* Social Links with Hover Glow */}
        <div className="flex items-center justify-center gap-3 pt-2 text-slate-500 dark:text-slate-400">
          <a
            href="https://github.com/Diki04"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 border border-transparent transition-all duration-200 hover:scale-110"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rizkillah-ramanda-sinyo/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 border border-transparent transition-all duration-200 hover:scale-110"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:rizkillahramanda@gmail.com"
            className="p-2 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 border border-transparent transition-all duration-200 hover:scale-110"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center font-mono text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} Rizkillah Ramanda
        </p>
      </div>
    </aside>
  );
}
