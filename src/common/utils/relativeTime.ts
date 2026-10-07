/**
 * Converts a timestamp to relative time (e.g. 5 menit lalu, 2 hours ago).
 */
export function relativeTime(dateString: string, locale: 'id' | 'en' = 'id'): string {
  const now = new Date();
  const past = new Date(dateString);
  const elapsedSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (elapsedSeconds < 60) {
    return locale === 'id' ? 'Baru saja' : 'Just now';
  }

  const minutes = Math.floor(elapsedSeconds / 60);
  if (minutes < 60) {
    return locale === 'id' ? `${minutes} menit lalu` : `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return locale === 'id' ? `${hours} jam lalu` : `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  return locale === 'id' ? `${days} hari lalu` : `${days}d ago`;
}
