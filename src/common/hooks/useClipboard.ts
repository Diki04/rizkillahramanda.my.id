'use client';

import { useState, useCallback } from 'react';
import { copyToClipboard } from '../utils/clipboard';

export function useClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      const success = await copyToClipboard(text);
      if (success) {
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), timeout);
      }
      return success;
    },
    [timeout]
  );

  return { hasCopied, copy };
}
