'use client';

import React from 'react';
import { Container } from '@/common/components/Container';
import { Button } from '@/common/components/Button';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { Mail, MessageSquare, ArrowUpRight, Sparkles } from 'lucide-react';

export function ContactCta() {
  return (
    <ScrollReveal
      id="contact-cta"
      className="py-20 border-t border-slate-200 dark:border-white/[0.08] min-h-[50vh] flex flex-col justify-center relative overflow-hidden"
    >
      <Container size="xl">
        <div className="relative rounded-3xl border border-slate-200 dark:border-white/[0.1] bg-gradient-to-b from-white to-slate-50/80 dark:from-navy-900/60 dark:to-navy-950/80 p-8 sm:p-12 md:p-14 text-center overflow-hidden shadow-sm dark:shadow-none">
          {/* Subtle glow background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/20 bg-sky-400/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for New Projects</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500">impactful</span> together.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
              Interested in collaborating on a web project, discussing machine learning research, or just saying hello? I am always open to new connections.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link href="/contact">
                <Button variant="secondary" size="md">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>Send a Message</span>
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="outline" size="md">
                  <MessageSquare className="w-4 h-4 mr-2 text-slate-400" />
                  <span>Leave a Note in Guestbook</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </ScrollReveal>
  );
}
