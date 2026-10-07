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
        'w-72 h-screen sticky top-0 flex flex-col justify-between p-5 border-r border-white/[0.08] bg-navy-950/95 backdrop-blur-xl select-none overflow-y-auto',
        className
      )}
    >
      {/* Top Profile Card */}
      <div className="space-y-6">
        <div className="flex items-start gap-3.5 pb-5 border-b border-white/[0.08]">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/[0.1] bg-navy-900 shadow-md">
              <Image
                src={mockProfile.avatar}
                alt={mockProfile.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-navy-950 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-white truncate tracking-tight">
                {mockProfile.nickname}
              </h2>
              <BadgeCheck className="w-4 h-4 text-sky-400 shrink-0" />
            </div>
            <p className="text-xs font-mono text-slate-400 truncate">
              @Diki04
            </p>
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500 mt-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">Pekanbaru, ID 🇮🇩</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  'group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all duration-150',
                  active
                    ? 'bg-accent-blue/10 border border-accent-blue/40 text-accent-blue font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-transform group-hover:scale-110',
                      active ? 'text-accent-blue' : 'text-slate-400 group-hover:text-white'
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls & Footer */}
      <div className="pt-5 mt-6 border-t border-white/[0.08] space-y-4">
        {/* Quick Toolbar */}
        <div className="flex items-center justify-between gap-1.5 px-1">
          <LayoutToggle />
          <AmbientAudioPlayer />
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 pt-2 text-slate-400">
          <a
            href="https://github.com/Diki04"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rizkillah-ramanda-sinyo/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:rizkillahramanda@gmail.com"
            className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[10px] text-center font-mono text-slate-500">
          © {new Date().getFullYear()} Rizkillah Ramanda
        </p>
      </div>
    </aside>
  );
}
