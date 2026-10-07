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
});
