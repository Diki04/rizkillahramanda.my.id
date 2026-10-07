'use client';

import { useState, useEffect, RefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0.1,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: UseIntersectionObserverProps = {}
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observer = new IntersectionObserver(([entry]) => setEntry(entry), {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}
