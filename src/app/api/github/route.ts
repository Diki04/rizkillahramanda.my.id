import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Diki04';

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'User-Agent': 'portfolio-app',
        },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers: {
          'User-Agent': 'portfolio-app',
        },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) {
      throw new Error(`GitHub user fetch status: ${userRes.status}`);
    }

    const userData = await userRes.json();
    let totalStars = 0;

    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        totalStars = repos.reduce(
          (acc: number, repo: any) => acc + (repo.stargazers_count || 0),
          0
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        login: userData.login || 'Diki04',
        name: userData.name || 'Rizkillah Ramanda Sinyo',
        avatarUrl: userData.avatar_url || 'https://avatars.githubusercontent.com/u/162100984?v=4',
        publicRepos: userData.public_repos || 49,
        followers: userData.followers || 36,
        following: userData.following || 37,
        totalStars,
      },
    });
  } catch (error) {
    // Return graceful fallback data so website never breaks
    return NextResponse.json({
      success: true,
      data: {
        login: username,
        name: 'Rizkillah Ramanda Sinyo',
        avatarUrl: 'https://avatars.githubusercontent.com/u/162100984?v=4',
        publicRepos: 49,
        followers: 36,
        following: 37,
        totalStars: 15,
      },
    });
  }
}
