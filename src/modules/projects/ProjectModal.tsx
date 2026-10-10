'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '@/types';
import { ProjectDetailView } from './ProjectDetailView';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!mounted || !project) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[99999] w-screen h-screen min-h-screen bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl overflow-y-auto overscroll-contain px-4 sm:px-8 py-6"
      >
        <div className="w-full max-w-5xl 2xl:max-w-6xl mx-auto rounded-3xl bg-white/95 dark:bg-zinc-950/85 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-2xl shadow-slate-300/40 dark:shadow-black/80 p-6 sm:p-10 md:p-12 transition-all duration-300">
          <ProjectDetailView project={project} />
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
