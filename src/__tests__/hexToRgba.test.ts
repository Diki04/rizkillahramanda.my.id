import { describe, it, expect } from 'vitest';
import { hexToRgba } from '../common/utils/hexToRgba';

describe('hexToRgba helper', () => {
  it('should convert 6-character hex to rgba', () => {
    expect(hexToRgba('#ffffff', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
  });

  it('should convert 3-character hex to rgba', () => {
    expect(hexToRgba('#000', 1)).toBe('rgba(0, 0, 0, 1)');
  });
});
