import { describe, it, expect } from 'vitest';
import { calculateTotalStars } from '../common/utils/calculateTotalStars';

describe('calculateTotalStars aggregator', () => {
  it('should correctly sum repository stars', () => {
    const repos = [
      { stargazers_count: 5 },
      { stargazers_count: 12 },
      { stargazers_count: 3 },
    ];
    expect(calculateTotalStars(repos)).toBe(20);
  });

  it('should return 0 for empty array', () => {
    expect(calculateTotalStars([])).toBe(0);
  });
});
