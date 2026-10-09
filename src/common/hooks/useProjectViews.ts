'use client';

import { useState, useEffect } from 'react';

const VIEW_UPDATE_EVENT = 'portfolio_real_view_updated';

// Cache for views across components in the current page session
const memoryViewsCache: Record<string, number> = {};

/**
 * Fetch all views or a single project's real views from the server API.
 */
export async function fetchProjectViews(slug?: string): Promise<number | Record<string, number>> {
  try {
    const url = slug ? `/api/projects/views?slug=${encodeURIComponent(slug)}` : '/api/projects/views';
    const res = await fetch(url);
    if (!res.ok) return slug ? (memoryViewsCache[slug] || 0) : memoryViewsCache;
    const json = await res.json();
    if (slug) {
      const count = json.views ?? 0;
      memoryViewsCache[slug] = count;
      return count;
    }
    const map = json.views ?? {};
    Object.assign(memoryViewsCache, map);
    return map;
  } catch {
    return slug ? (memoryViewsCache[slug] || 0) : memoryViewsCache;
  }
}

/**
 * Record a real view for a project (counts once per session per project to prevent spamming).
 */
export async function recordRealProjectView(slug: string): Promise<number> {
  if (typeof window === 'undefined') return memoryViewsCache[slug] || 0;

  const sessionKey = `viewed_project_${slug}`;
  const alreadyViewed = sessionStorage.getItem(sessionKey);

  // If already counted in this session, just return the current cached/fetched count
  if (alreadyViewed) {
    const current = (await fetchProjectViews(slug)) as number;
    return current;
  }

  try {
    sessionStorage.setItem(sessionKey, '1');
    const res = await fetch('/api/projects/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });

    if (res.ok) {
      const json = await res.json();
      const newCount = json.views ?? (memoryViewsCache[slug] || 0) + 1;
      memoryViewsCache[slug] = newCount;

      window.dispatchEvent(
        new CustomEvent(VIEW_UPDATE_EVENT, {
          detail: { slug, views: newCount },
        })
      );
      return newCount;
    }
  } catch (error) {
    console.error('Failed to record real view:', error);
  }

  return memoryViewsCache[slug] || 0;
}

/**
 * React Hook to subscribe to real project views.
 * If autoRecord is true (used on project detail page), it records a view upon mounting.
 */
export function useProjectViews(slug?: string, autoRecord = false) {
  const [views, setViews] = useState<number>(() => (slug ? memoryViewsCache[slug] || 0 : 0));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    // 1. Fetch current real count
    fetchProjectViews(slug).then((count) => {
      if (isMounted) {
        setViews(count as number);
        setLoading(false);
      }
    });

    // 2. If autoRecord is enabled, record this visit
    if (autoRecord) {
      recordRealProjectView(slug).then((updatedCount) => {
        if (isMounted && typeof updatedCount === 'number') {
          setViews(updatedCount);
        }
      });
    }

    // 3. Listen to real-time events when view count updates
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ slug: string; views: number }>;
      if (customEvent.detail?.slug === slug && isMounted) {
        setViews(customEvent.detail.views);
      }
    };

    window.addEventListener(VIEW_UPDATE_EVENT, handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener(VIEW_UPDATE_EVENT, handleUpdate);
    };
  }, [slug, autoRecord]);

  return { views, loading };
}
