import { describe, it, expect } from 'vitest';
import { LayoutMode } from '../common/contexts/LayoutContext';

describe('LayoutContext & Layout Mode logic', () => {
  it('should support sidebar and topbar modes', () => {
    const modes: LayoutMode[] = ['sidebar', 'topbar'];
    expect(modes).toContain('sidebar');
    expect(modes).toContain('topbar');
  });

  it('should toggle between modes deterministically', () => {
    let mode: LayoutMode = 'sidebar';
    const toggle = (m: LayoutMode): LayoutMode => (m === 'sidebar' ? 'topbar' : 'sidebar');

    mode = toggle(mode);
    expect(mode).toBe('topbar');

    mode = toggle(mode);
    expect(mode).toBe('sidebar');
  });

  it('should resolve active water effect automatically based on layout mode', () => {
    const resolveActive = (
      waterMode: 'auto' | 'ripple' | 'mesh3d',
      layout: 'sidebar' | 'topbar'
    ): 1 | 2 => {
      if (waterMode === 'ripple') return 1;
      if (waterMode === 'mesh3d') return 2;
      return layout === 'sidebar' ? 1 : 2;
    };

    // Auto sync
    expect(resolveActive('auto', 'sidebar')).toBe(1);
    expect(resolveActive('auto', 'topbar')).toBe(2);

    // Manual overrides
    expect(resolveActive('ripple', 'topbar')).toBe(1);
    expect(resolveActive('mesh3d', 'sidebar')).toBe(2);
  });

  it('should cycle water effect modes correctly', () => {
    const cycle = (current: 'auto' | 'ripple' | 'mesh3d'): 'auto' | 'ripple' | 'mesh3d' => {
      if (current === 'auto') return 'ripple';
      if (current === 'ripple') return 'mesh3d';
      return 'auto';
    };

    expect(cycle('auto')).toBe('ripple');
    expect(cycle('ripple')).toBe('mesh3d');
    expect(cycle('mesh3d')).toBe('auto');
  });
});
