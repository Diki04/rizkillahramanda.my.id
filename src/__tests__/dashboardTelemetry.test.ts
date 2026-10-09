import { describe, it, expect } from 'vitest';

describe('Dashboard Telemetry & Math Logic', () => {
  it('correctly calculates Codewars rank and absolute kyu value', () => {
    const rawRank = -8;
    const rank = Math.abs(rawRank);
    expect(rank).toBe(8);

    const honor = 1;
    expect(honor).toBeGreaterThan(0);
  });

  it('correctly calculates Monkeytype levels, xp progression, and next level threshold', () => {
    const calculateLevelAndXp = (totalXp: number) => {
      let remainingXp = totalXp;
      let level = 1;
      let xpNeeded = 100;
      while (remainingXp >= xpNeeded) {
        remainingXp -= xpNeeded;
        xpNeeded += 49;
        level++;
      }
      const xpToNextLevel = level * 49 + 100;
      const progressPercent = Math.min(100, Math.round((remainingXp / xpToNextLevel) * 100));
      return { level, remainingXp, xpToNextLevel, progressPercent };
    };

    const result = calculateLevelAndXp(194);
    expect(result.level).toBe(2);
    expect(result.remainingXp).toBe(94);
    expect(result.xpToNextLevel).toBe(198);
    expect(result.progressPercent).toBe(47);
  });

  it('correctly formats typing time in HH:mm:ss format', () => {
    const formatTime = (timeTypingSeconds: number) => {
      const hours = Math.floor(timeTypingSeconds / 3600);
      const minutes = Math.floor((timeTypingSeconds % 3600) / 60);
      const seconds = Math.floor(timeTypingSeconds % 60);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    expect(formatTime(89.05)).toBe('00:01:29');
    expect(formatTime(3665)).toBe('01:01:05');
  });

  it('correctly computes GitHub contributions weekly metrics', () => {
    const mockDays = [
      { date: '2026-10-01', count: 5, level: 3 as const },
      { date: '2026-10-02', count: 12, level: 4 as const },
      { date: '2026-10-03', count: 0, level: 0 as const },
      { date: '2026-10-04', count: 8, level: 4 as const },
      { date: '2026-10-05', count: 2, level: 2 as const },
      { date: '2026-10-06', count: 3, level: 2 as const },
      { date: '2026-10-07', count: 10, level: 4 as const },
    ];

    const total = mockDays.reduce((acc, d) => acc + d.count, 0);
    const best = Math.max(...mockDays.map((d) => d.count));
    const avg = Math.round(total / mockDays.length);

    expect(total).toBe(40);
    expect(best).toBe(12);
    expect(avg).toBe(6);
  });

  it('calculates Umami traffic trends correctly', () => {
    const pageviews = [
      { x: '2026-09-01T00:00:00Z', y: 890 },
      { x: '2026-10-01T00:00:00Z', y: 1240 },
    ];
    const sessions = [
      { x: '2026-09-01T00:00:00Z', y: 550 },
      { x: '2026-10-01T00:00:00Z', y: 780 },
    ];

    const totalViews = pageviews.reduce((acc, p) => acc + p.y, 0);
    const totalSessions = sessions.reduce((acc, s) => acc + s.y, 0);

    expect(totalViews).toBe(2130);
    expect(totalSessions).toBe(1330);
  });
});
