import { describe, it, expect } from 'vitest';

describe('GitHub Contribution Calculations', () => {
  it('correctly categorizes contribution levels', () => {
    const getLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
      if (count >= 7) return 4;
      if (count >= 4) return 3;
      if (count >= 2) return 2;
      if (count >= 1) return 1;
      return 0;
    };

    expect(getLevel(0)).toBe(0);
    expect(getLevel(1)).toBe(1);
    expect(getLevel(3)).toBe(2);
    expect(getLevel(5)).toBe(3);
    expect(getLevel(10)).toBe(4);
  });

  it('calculates streaks correctly from daily commit activity', () => {
    const counts = [0, 1, 2, 0, 3, 4, 5, 6, 0, 1];
    let currentStreak = 0;
    let maxStreak = 0;

    for (const count of counts) {
      if (count > 0) {
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
      } else {
        currentStreak = 0;
      }
    }

    expect(maxStreak).toBe(4);
    expect(currentStreak).toBe(1);
  });
});
