import { describe, it, expect } from 'vitest';
import { formatDuration } from '../common/utils/formatDuration';

describe('formatDuration helper', () => {
  it('should format hours and minutes from total seconds', () => {
    expect(formatDuration(3600)).toBe('1 hrs 0 mins');
    expect(formatDuration(5400)).toBe('1 hrs 30 mins');
    expect(formatDuration(7200)).toBe('2 hrs 0 mins');
  });
});
