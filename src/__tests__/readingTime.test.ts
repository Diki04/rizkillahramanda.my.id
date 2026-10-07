import { describe, it, expect } from 'vitest';
import { estimateReadingTime } from '../common/utils/readingTime';

describe('estimateReadingTime helper', () => {
  it('should estimate reading time based on word count', () => {
    const shortContent = 'This is a short message.';
    expect(estimateReadingTime(shortContent)).toBe(1);

    const words400 = Array(400).fill('word').join(' ');
    expect(estimateReadingTime(words400)).toBe(2);
  });
});
