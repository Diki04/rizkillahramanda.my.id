import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  fetchProjectViews,
  recordRealProjectView,
} from '@/common/hooks/useProjectViews';

describe('Real Project Views Utility', () => {
  let sessionStore: Record<string, string> = {};

  beforeEach(() => {
    sessionStore = {};
    const mockSessionStorage = {
      getItem: (key: string) => sessionStore[key] || null,
      setItem: (key: string, val: string) => {
        sessionStore[key] = val;
      },
      clear: () => {
        sessionStore = {};
      },
      removeItem: (key: string) => {
        delete sessionStore[key];
      },
    };

    const mockWindow = {
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    vi.stubGlobal('sessionStorage', mockSessionStorage);
    vi.stubGlobal('window', mockWindow);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches real project view count from api', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, slug: 'proj-demo', views: 5 }),
      })
    );

    const count = await fetchProjectViews('proj-demo');
    expect(count).toBe(5);
  });

  it('records real project view once per session and returns updated count', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, slug: 'proj-new', views: 1 }),
      })
    );

    const count = await recordRealProjectView('proj-new');
    expect(count).toBe(1);
    expect(sessionStore['viewed_project_proj-new']).toBe('1');
    expect(window.dispatchEvent).toHaveBeenCalled();
  });

  it('does not re-post view if already viewed in the same session', async () => {
    sessionStore['viewed_project_already-viewed'] = '1';
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, slug: 'already-viewed', views: 10 }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const count = await recordRealProjectView('already-viewed');
    expect(count).toBe(10);
    // Should have called GET fetchProjectViews, not POST /api/projects/views
    expect(fetchMock).toHaveBeenCalledWith('/api/projects/views?slug=already-viewed');
  });
});
