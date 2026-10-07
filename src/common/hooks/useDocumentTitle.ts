'use client';

import { useEffect } from 'react';

export function useDocumentTitle(title: string, prevailOnUnmount: boolean = false) {
  useEffect(() => {
    const defaultTitle = document.title;
    document.title = title;

    return () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle;
      }
    };
  }, [title, prevailOnUnmount]);
}
