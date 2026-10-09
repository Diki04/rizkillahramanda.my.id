import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getViewCount,
  incrementViewCount,
} from '@/common/hooks/useProjectViews';

describe('useProjectViews utility', () => {
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};
    const mockLocalStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, val: string) => {
        store[key] = val;
      },
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    };

    const mockWindow = {
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    vi.stubGlobal('localStorage', mockLocalStorage);
    vi.stubGlobal('window', mockWindow);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve({}) }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns fallback view count when no stored view exists', () => {
    const views = getViewCount('test-proj-1', 42);
    expect(views).toBe(42);
  });

  it('increments view count in localStorage and returns updated number', () => {
    const updated = incrementViewCount('test-proj-1', 10);
    expect(updated).toBe(11);

    const stored = getViewCount('test-proj-1', 0);
    expect(stored).toBe(11);
  });

  it('dispatches custom event on increment', () => {
    incrementViewCount('test-proj-2', 50);
    expect(window.dispatchEvent).toHaveBeenCalled();
  });

  it('preserves higher value when multiple increments occur', () => {
    incrementViewCount('test-proj-3', 100);
    const second = incrementViewCount('test-proj-3', 100);
    expect(second).toBe(102);
    expect(getViewCount('test-proj-3', 0)).toBe(102);
  });
});
