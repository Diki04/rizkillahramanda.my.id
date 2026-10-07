'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Globe,
  Github,
  Linkedin,
  Mail,
  FileText,
  Keyboard,
  Coffee,
  ArrowUpRight,
  ArrowLeft,
  QrCode,
  Check,
  Copy,
  MapPin,
  BadgeCheck,
  X,
  Share2,
} from 'lucide-react';
import { SiInstagram, SiTiktok } from 'react-icons/si';
import { ThemeToggle } from '@/common/components/ThemeToggle';
import { mockProfile } from '@/services/data/mock-profile';

export default function LinksPage() {
  const locale = useLocale();
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const bioLinks = [
    {
      title: 'Portfolio & Engineering Showcase',
      description: 'Personal portfolio, interactive telemetry, and projects',
      href: '/',
      icon: Globe,
      isExternal: false,
      color: 'text-sky-500',
    },
    {
      title: 'GitHub Repositories',
      description: 'Explore 49+ open source repositories and contributions',
      href: 'https://github.com/Diki04',
      icon: Github,
      isExternal: true,
      color: 'text-slate-800 dark:text-white',
    },
    {
      title: 'LinkedIn Network',
      description: 'Professional experience, apprenticeships, and connections',
      href: 'https://www.linkedin.com/in/rizkillah-ramanda-sinyo/',
      icon: Linkedin,
      isExternal: true,
      color: 'text-sky-600',
    },
    {
      title: 'Download Curriculum Vitae (CV)',
      description: 'Detailed software engineer resume (PDF)',
      href: '/resume.pdf',
      icon: FileText,
      isExternal: true,
      color: 'text-emerald-500',
    },
    {
      title: 'Monkeytype Typing Velocity',
      description: 'Typing telemetry and leaderboard performance',
      href: 'https://monkeytype.com',
      icon: Keyboard,
      isExternal: true,
      color: 'text-amber-500',
    },
    {
      title: 'Saweria Support',
      description: 'Support open-source development and coffee fund',
      href: 'https://saweria.co',
      icon: Coffee,
      isExternal: true,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-white/90 dark:bg-navy-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/[0.1] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-7 relative">
        {/* Top Controls: Back button + ThemeToggle + Share + QR */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.08] pb-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-navy-950 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-sky-500 hover:border-sky-400 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleCopyLink}
              title="Salin Tautan"
              className="p-2 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-navy-950 text-slate-700 dark:text-slate-300 hover:text-sky-500 hover:border-sky-400 transition-all flex items-center gap-1.5 text-xs font-mono"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowQrModal(true)}
              title="Tampilkan Kode QR"
              className="p-2 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-navy-950 text-slate-700 dark:text-slate-300 hover:text-sky-500 hover:border-sky-400 transition-all"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Bio Section */}
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 dark:border-white/[0.15] bg-slate-100 dark:bg-navy-900 shadow-xl">
              <Image
                src={mockProfile.avatar}
                alt={mockProfile.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-navy-950 animate-pulse" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {mockProfile.name}
              </h1>
              <BadgeCheck className="w-5 h-5 text-sky-500" />
            </div>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400 font-mono">
              Fullstack Developer & ML Explorer
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Pekanbaru, Riau, Indonesia 🇮🇩</span>
            </div>
          </div>

          {/* Social Quick Icons */}
          <div className="flex items-center justify-center gap-2.5 pt-2">
            <a
              href="https://github.com/Diki04"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-slate-200 dark:border-white/[0.08] bg-white/80 dark:bg-navy-900/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-sky-400 hover:scale-110 transition-all shadow-sm"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/rizkillah-ramanda-sinyo/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-slate-200 dark:border-white/[0.08] bg-white/80 dark:bg-navy-900/80 text-slate-700 dark:text-slate-300 hover:text-sky-600 hover:border-sky-400 hover:scale-110 transition-all shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:rizkillahramanda@gmail.com"
              className="p-3 rounded-full border border-slate-200 dark:border-white/[0.08] bg-white/80 dark:bg-navy-900/80 text-slate-700 dark:text-slate-300 hover:text-emerald-500 hover:border-sky-400 hover:scale-110 transition-all shadow-sm"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Link Cards List */}
        <div className="space-y-3 pt-2">
          {bioLinks.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="group flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white/85 dark:bg-navy-900/70 hover:border-sky-400/50 hover:bg-white dark:hover:bg-navy-850 hover:shadow-lg hover:shadow-sky-500/10 dark:hover:shadow-cyan-950/20 hover:scale-[1.01] transition-all duration-200">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.06] ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-sky-500 dark:group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
              </div>
            );

            if (item.isExternal) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={item.title} href={item.href} className="block">
                {content}
              </Link>
            );
          })}
        </div>

        {/* Get in Touch Card */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-navy-900/50 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Get in Touch</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Terbuka untuk kolaborasi proyek, diskusi teknis, dan peluang kerja.
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-navy-950 border border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
            <span className="font-mono text-xs text-slate-700 dark:text-slate-300 truncate">
              rizkillahramanda@gmail.com
            </span>
            <a
              href="mailto:rizkillahramanda@gmail.com"
              className="px-3 py-1 rounded-md bg-sky-500 hover:bg-sky-400 text-white font-mono text-xs font-semibold transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center font-mono text-[11px] text-slate-400 dark:text-slate-500 pt-4">
          © {new Date().getFullYear()} Rizkillah Ramanda Sinyo • rizkillah.dev
        </p>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl border border-slate-200 dark:border-white/[0.12] bg-white dark:bg-navy-900 p-6 shadow-2xl text-center space-y-4"
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">QR Code Profile</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pindai untuk membuka profil rizkillah.dev/links
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 mx-auto w-fit shadow-inner">
              {/* QR Code image */}
              <Image
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://rizkillahramanda.my.id/links"
                alt="QR Code"
                width={180}
                height={180}
                unoptimized
                className="rounded"
              />
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full py-2 px-4 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-100 dark:bg-navy-800 text-xs font-mono text-slate-800 dark:text-slate-200 hover:bg-sky-500 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin URL'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
