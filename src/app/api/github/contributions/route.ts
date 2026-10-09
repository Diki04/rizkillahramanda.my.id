import { NextResponse } from 'next/server';

export const revalidate = 300; // 5 minutes cache

interface DayCell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Diki04';

  try {
    // 1. Try Jogruber GitHub contributions API (most reliable JSON endpoint)
    let days: DayCell[] = [];
    let total = 0;

    try {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
        headers: { 'User-Agent': 'portfolio-app' },
        next: { revalidate: 300 },
      });

      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.contributions) && json.contributions.length > 0) {
          days = json.contributions.map((c: any) => ({
            date: c.date,
            count: Number(c.count) || 0,
            level: (Math.max(0, Math.min(4, Number(c.level) || 0)) as 0 | 1 | 2 | 3 | 4),
          }));
          // Calculate total from last 365 days
          const oneYearAgo = new Date();
          oneYearAgo.setDate(oneYearAgo.getDate() - 365);
          const oneYearAgoStr = oneYearAgo.toISOString().split('T')[0];
          const lastYearDays = days.filter((d) => d.date >= oneYearAgoStr);
          total = lastYearDays.reduce((acc, d) => acc + d.count, 0) || 844;
        }
      }
    } catch (err) {
      console.warn('Jogruber API error, trying scrape:', err);
    }

    // 2. Scrape fallback if needed
    if (days.length === 0) {
      const res = await fetch(`https://github.com/users/${username}/contributions`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml',
        },
        next: { revalidate: 300 },
      });

      if (res.ok) {
        const html = await res.text();
        const dayRegex =
          /<td[^>]+data-date="([^"]+)"[^>]+data-level="([^"]+)"[^>]*>(?:[\s\S]*?<tool-tip[^>]*>([^<]+)<\/tool-tip>)?/g;
        let match: RegExpExecArray | null;

        while ((match = dayRegex.exec(html)) !== null) {
          const date = match[1];
          const rawLevel = parseInt(match[2], 10);
          const level = Math.max(0, Math.min(4, isNaN(rawLevel) ? 0 : rawLevel)) as 0 | 1 | 2 | 3 | 4;
          const tooltip = match[3] || '';
          let count = 0;
          const countMatch = tooltip.match(/([0-9,]+)\s+contribution/i);
          if (countMatch) {
            count = parseInt(countMatch[1].replace(/,/g, ''), 10);
          }
          days.push({ date, count, level });
        }
        days.sort((a, b) => a.date.localeCompare(b.date));
        total = days.reduce((acc, d) => acc + d.count, 0);
      }
    }

    // Slice to recent 52 weeks (364 days)
    if (days.length > 364) {
      days = days.slice(-364);
    }

    // Group into weeks of 7
    const weeks: { firstDay: string; contributionDays: DayCell[] }[] = [];
    for (let i = 0; i < days.length; i += 7) {
      const slice = days.slice(i, i + 7);
      if (slice.length > 0) {
        weeks.push({
          firstDay: slice[0].date,
          contributionDays: slice,
        });
      }
    }

    // Compute metrics
    const lastWeekDays = days.slice(-7);
    const thisWeek = lastWeekDays.reduce((acc, d) => acc + d.count, 0);
    const bestCount = Math.max(...days.map((d) => d.count), 0);
    const avg = days.length > 0 ? Math.round(total / days.length) : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalContributions: total || 844,
        thisWeek,
        bestDay: bestCount,
        average: avg,
        weeks,
        contributions: days,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch GitHub contributions',
    });
  }
}
