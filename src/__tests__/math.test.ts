import { describe, it, expect } from 'vitest';
import { clamp, lerp } from '../common/utils/math';

describe('math utilities', () => {
  it('should clamp numbers within specified range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-2, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('should interpolate values via lerp', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
  });
});
