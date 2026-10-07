import React from 'react';
import { Container } from '@/common/components/Container';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-white/[0.08] bg-white/80 dark:bg-navy-950/80 py-12 transition-colors">
      <Container size="xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Identity & Status */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                Teknik Informatika • Universitas Riau
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Designed & Engineered with Next.js, TypeScript & Tailwind CSS
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Diki04"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-navy-900/60 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/rizkillah-ramanda-sinyo/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-navy-900/60 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:rizkillahramanda@gmail.com"
              className="p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-navy-900/60 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-accent-blue transition-all duration-200"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs font-mono text-slate-500 text-center md:text-right">
            © {currentYear} Rizkillah Ramanda Sinyo. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
