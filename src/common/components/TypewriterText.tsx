'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/common/utils/cn';

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export function TypewriterText({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 2200,
  className,
  cursorClassName,
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (subIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }

      const deleteTimer = setTimeout(() => {
        setSubIndex((prev) => prev - 1);
      }, deletingSpeed);
      return () => clearTimeout(deleteTimer);
    }

    // Typing
    if (subIndex === currentWord.length) {
      setIsPaused(true);
      return;
    }

    const typeTimer = setTimeout(() => {
      setSubIndex((prev) => prev + 1);
    }, typingSpeed);

    return () => clearTimeout(typeTimer);
  }, [subIndex, isDeleting, isPaused, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  const currentWord = words[wordIndex % words.length] || '';
  const displayText = currentWord.slice(0, subIndex);

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span>{displayText}</span>
      <span
        aria-hidden="true"
        className={cn(
          'inline-block w-[3px] h-[0.9em] ml-1.5 rounded-sm bg-sky-500 dark:bg-accent-blue animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)] align-middle',
          cursorClassName
        )}
      />
    </span>
  );
}
