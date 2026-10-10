import { NextResponse } from 'next/server';

export const revalidate = 120; // 2 minutes cache for fresh data

interface DayCell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Diki04';
  const todayStr = new Date().toISOString().split('T')[0];

  try {
    let days: DayCell[] = [];

    // 1. Fetch from Jogruber GitHub contributions API
    try {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
        headers: { 'User-Agent': 'portfolio-app' },
        next: { revalidate: 120 },
      });

      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.contributions) && json.contributions.length > 0) {
          days = json.contributions.map((c: any) => ({
            date: c.date,
            count: Number(c.count) || 0,
            level: (Math.max(0, Math.min(4, Number(c.level) || 0)) as 0 | 1 | 2 | 3 | 4),
          }));
        }
      }
    } catch (err) {
      console.warn('Jogruber API error:', err);
    }

    // 2. Scrape fallback if needed
    if (days.length === 0) {
      const res = await fetch(`https://github.com/users/${username}/contributions`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml',
        },
        next: { revalidate: 120 },
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
      }
    }

    // 3. Sort chronologically by date ascending
    days.sort((a, b) => a.date.localeCompare(b.date));

    // 4. Filter out any future dates beyond today
    days = days.filter((d) => d.date <= todayStr);

    if (days.length === 0) {
      throw new Error('No contribution data found');
    }

    // Calculate real stats for the past 365 days
    const past365Days = days.slice(-365);
    const totalContributions = past365Days.reduce((acc, d) => acc + d.count, 0);

    // Calculate past 7 days (this week)
    const past7Days = days.slice(-7);
    const thisWeek = past7Days.reduce((acc, d) => acc + d.count, 0);

    // Best day in the entire past year
    const bestDay = Math.max(...past365Days.map((d) => d.count), 0);
    const average = Math.round(totalContributions / 365) || 1;

    // 5. Structure exactly 52 full weeks ending on this week
    // Determine the day of week of the latest day (0 = Sun, 6 = Sat)
    const lastDayItem = days[days.length - 1];
    const lastDate = new Date(lastDayItem.date);
    const lastDayOfWeek = lastDate.getUTCDay();

    // Pad upcoming days of the current week (from lastDayOfWeek + 1 to 6)
    const paddedDays: DayCell[] = [...days];
    for (let offset = 1; offset <= 6 - lastDayOfWeek; offset++) {
      const nextD = new Date(lastDate);
      nextD.setUTCDate(nextD.getUTCDate() + offset);
      paddedDays.push({
        date: nextD.toISOString().split('T')[0],
        count: 0,
        level: 0,
      });
    }

    // We want 52 or 53 full 7-day weeks (364 or 371 days)
    const totalDaysNeeded = 53 * 7;
    const calendarDays = paddedDays.slice(-totalDaysNeeded);

    // Group into weeks of 7
    const weeks: { firstDay: string; contributionDays: DayCell[] }[] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      const slice = calendarDays.slice(i, i + 7);
      if (slice.length > 0) {
        weeks.push({
          firstDay: slice[0].date,
          contributionDays: slice,
        });
      }
    }

    // Generate accurate month header positions
    interface MonthItem {
      name: string;
      firstDay: string;
      startWeekIndex: number;
      totalWeeks: number;
    }
    const months: MonthItem[] = [];
    let currentMonth = -1;
    let currentMonthObj: MonthItem | null = null;

    weeks.forEach((week, wIdx) => {
      // Check first valid day in this week
      const firstDayInWeek = week.contributionDays[0];
      const d = new Date(firstDayInWeek.date);
      const m = d.getUTCMonth();

      if (m !== currentMonth) {
        if (currentMonthObj) {
          currentMonthObj.totalWeeks = wIdx - currentMonthObj.startWeekIndex;
        }
        currentMonth = m;
        currentMonthObj = {
          name: d.toLocaleDateString('en-US', { month: 'short' }),
          firstDay: firstDayInWeek.date,
          startWeekIndex: wIdx,
          totalWeeks: 1,
        };
        months.push(currentMonthObj);
      } else if (currentMonthObj) {
        currentMonthObj.totalWeeks++;
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        totalContributions,
        thisWeek,
        bestDay,
        average,
        weeks,
        months,
        contributions: calendarDays,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch GitHub contributions',
    });
  }
}
