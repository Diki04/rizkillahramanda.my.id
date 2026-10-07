import { NextResponse } from 'next/server';

export const revalidate = 300; // 5 minutes cache

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Diki04';

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
      headers: {
        'User-Agent': 'portfolio-app',
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Contributions API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch live contribution data',
    });
  }
}
