import { describe, it, expect } from 'vitest';
import { truncateText } from '../common/utils/truncateText';

describe('truncateText helper', () => {
  const text = 'The quick brown fox jumps over the lazy dog';

  it('should truncate text exceeding maximum length', () => {
    expect(truncateText(text, 10)).toBe('The quick...');
  });

  it('should return original text if within limit', () => {
    expect(truncateText('Short', 20)).toBe('Short');
  });
});
