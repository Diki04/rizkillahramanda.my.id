'use client';

import { useEffect } from 'react';

interface ShortcutOptions {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
}

export function useKeyboardShortcut(
  options: ShortcutOptions,
  callback: (e: KeyboardEvent) => void
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyMatches = event.key.toLowerCase() === options.key.toLowerCase();
      const ctrlMatches = options.ctrlKey ? (event.ctrlKey || event.metaKey) : true;
      const altMatches = options.altKey ? event.altKey : true;
      const shiftMatches = options.shiftKey ? event.shiftKey : true;

      if (keyMatches && ctrlMatches && altMatches && shiftMatches) {
        event.preventDefault();
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, callback]);
}
