import { describe, it, expect } from 'vitest';
import { cn } from '../common/utils/cn';

describe('cn utility', () => {
  it('should join classes cleanly', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('should filter falsy values', () => {
    expect(cn('px-2', false && 'hidden', 'text-white')).toBe('px-2 text-white');
  });

  it('should resolve tailwind conflicting classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
