import { NextResponse } from 'next/server';

export const revalidate = 300; // 5 minutes cache

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Diki04';

  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`GitHub contributions page error: ${res.status}`);
    }

    const html = await res.text();

    const totalMatch = html.match(/([0-9,]+)\s+contributions\s+in the last year/i);
    const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

    const dayRegex =
      /<td[^>]+data-date="([^"]+)"[^>]+data-level="([^"]+)"[^>]*>(?:[\s\S]*?<tool-tip[^>]*>([^<]+)<\/tool-tip>)?/g;
    let match: RegExpExecArray | null;
    const days: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
    let calculatedTotal = 0;

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
      calculatedTotal += count;
      days.push({ date, count, level });
    }

    days.sort((a, b) => a.date.localeCompare(b.date));

    if (days.length === 0) {
      throw new Error('No contribution days parsed');
    }

    return NextResponse.json({
      success: true,
      data: {
        totalContributions: totalContributions || calculatedTotal,
        contributions: days,
      },
    });
  } catch (error) {
    // If scraping fails, try jogruber API as fallback
    try {
      const fallbackRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
        headers: { 'User-Agent': 'portfolio-app' },
        next: { revalidate: 300 },
      });
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        return NextResponse.json({
          success: true,
          data: fallbackData,
        });
      }
    } catch {
      // Fallback failed
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to fetch live contribution data',
    });
  }
}
