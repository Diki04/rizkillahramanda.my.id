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
  Shield,
  BadgeCheck,
  Github,
  Linkedin,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/common/utils/cn';
import { LayoutToggle } from '@/common/components/LayoutToggle';
import { AmbientAudioPlayer } from '@/common/components/AmbientAudioPlayer';
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
    { href: '/chat', label: t('chat'), icon: MessageSquare },
    { href: '/contact', label: t('contact'), icon: Mail },
    { href: '/admin', label: 'Admin', icon: Shield },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        'w-80 h-screen sticky top-0 flex flex-col justify-between p-6 border-r border-white/[0.08] bg-navy-950/95 backdrop-blur-xl select-none overflow-y-auto transition-all duration-300',
        className
      )}
    >
      {/* Top Profile Card */}
      <div className="space-y-6">
        <div className="group flex items-start gap-4 pb-6 border-b border-white/[0.08]">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/[0.12] bg-navy-900 shadow-xl group-hover:border-sky-400/50 group-hover:shadow-[0_0_16px_rgba(56,189,248,0.3)] transition-all duration-300">
              <Image
                src={mockProfile.avatar}
                alt={mockProfile.name}
                width={56}
                height={56}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-navy-950 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-white truncate tracking-tight group-hover:text-sky-300 transition-colors">
                {mockProfile.nickname}
              </h2>
              <BadgeCheck className="w-4 h-4 text-sky-400 shrink-0" />
            </div>
            <p className="text-xs font-mono text-slate-400 truncate">
              @Diki04
            </p>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 mt-1">
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
                    ? 'bg-accent-blue/15 border-accent-blue/50 text-sky-300 font-semibold shadow-sm shadow-cyan-950/40 translate-x-1'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1] hover:translate-x-1 hover:shadow-md'
                )}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-transform duration-200 group-hover:scale-125',
                      active ? 'text-sky-400' : 'text-slate-400 group-hover:text-sky-400'
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {active ? (
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-slate-500 group-hover:text-sky-400 transition-all duration-200" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls & Footer */}
      <div className="pt-6 mt-6 border-t border-white/[0.08] space-y-4">
        {/* Quick Toolbar */}
        <div className="flex items-center justify-between gap-1.5 px-1">
          <LayoutToggle />
          <AmbientAudioPlayer />
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        {/* Social Links with Hover Glow */}
        <div className="flex items-center justify-center gap-3 pt-2 text-slate-400">
          <a
            href="https://github.com/Diki04"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:text-white hover:bg-sky-500/20 hover:border-sky-500/40 border border-transparent transition-all duration-200 hover:scale-110"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rizkillah-ramanda-sinyo/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:text-sky-400 hover:bg-sky-500/20 hover:border-sky-500/40 border border-transparent transition-all duration-200 hover:scale-110"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:rizkillahramanda@gmail.com"
            className="p-2 rounded-xl hover:text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 border border-transparent transition-all duration-200 hover:scale-110"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-center font-mono text-slate-500">
          © {new Date().getFullYear()} Rizkillah Ramanda
        </p>
      </div>
    </aside>
  );
}
