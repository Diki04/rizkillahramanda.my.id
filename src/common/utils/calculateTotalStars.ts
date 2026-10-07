/**
 * Sums stargazers_count across an array of GitHub repositories.
 */
export function calculateTotalStars(repos: Array<{ stargazers_count?: number }>): number {
  if (!Array.isArray(repos)) return 0;
  return repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
}
