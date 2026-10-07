/**
 * Estimates reading time in minutes based on words per minute (WPM).
 */
export function estimateReadingTime(text: string, wpm: number = 200): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}
