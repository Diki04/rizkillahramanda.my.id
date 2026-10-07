import { describe, it, expect } from 'vitest';
import { relativeTime } from '../common/utils/relativeTime';

describe('relativeTime helper', () => {
  const now = new Date();
  const justNow = new Date(now.getTime() - 1000 * 10).toISOString();
  const tenMinAgo = new Date(now.getTime() - 1000 * 60 * 10).toISOString();

  it('should return immediate indicator for recent timestamp', () => {
    expect(relativeTime(justNow, 'en')).toBe('Just now');
    expect(relativeTime(justNow, 'id')).toBe('Baru saja');
  });

  it('should calculate relative minutes', () => {
    expect(relativeTime(tenMinAgo, 'en')).toBe('10m ago');
    expect(relativeTime(tenMinAgo, 'id')).toBe('10 menit lalu');
  });
});
