'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'portfolio_project_views_map';
const VIEW_UPDATE_EVENT = 'portfolio_view_updated';

/**
 * Reads the latest recorded views for a project from localStorage.
 */
export function getViewCount(projectId: string, fallback = 0): number {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const map = JSON.parse(raw);
    if (typeof map[projectId] === 'number') {
      return Math.max(map[projectId], fallback);
    }
  } catch {
    // fallback
  }
  return fallback;
}

/**
 * Increments view count for a project in localStorage and broadcasts to all subscribers.
 */
export function incrementViewCount(projectId: string, fallback = 0): number {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const map: Record<string, number> = raw ? JSON.parse(raw) : {};
    const current = typeof map[projectId] === 'number' ? Math.max(map[projectId], fallback) : fallback;
    const updated = current + 1;
    map[projectId] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));

    // Broadcast update across the client session
    window.dispatchEvent(
      new CustomEvent(VIEW_UPDATE_EVENT, {
        detail: { projectId, views: updated },
      })
    );

    // Non-blocking best-effort sync with API
    fetch('/api/projects/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, views: updated }),
    }).catch(() => {
      // ignore
    });

    return updated;
  } catch {
    return fallback + 1;
  }
}

/**
 * React hook to subscribe to realtime view count changes for a given project.
 */
export function useProjectViews(projectId?: string, initialViews = 0) {
  const [views, setViews] = useState<number>(() => {
    if (!projectId) return initialViews;
    return getViewCount(projectId, initialViews);
  });

  useEffect(() => {
    if (!projectId) return;

    // Sync on mount with localStorage
    const saved = getViewCount(projectId, initialViews);
    setViews(saved);

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId: string; views: number }>;
      if (customEvent.detail?.projectId === projectId) {
        setViews(customEvent.detail.views);
      }
    };

    window.addEventListener(VIEW_UPDATE_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(VIEW_UPDATE_EVENT, handleUpdate);
    };
  }, [projectId, initialViews]);

  const increment = useCallback(() => {
    if (!projectId) return;
    const next = incrementViewCount(projectId, views);
    setViews(next);
  }, [projectId, views]);

  return { views, increment };
}
