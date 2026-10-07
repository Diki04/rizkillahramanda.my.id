/**
 * Formats an ISO date string into a localized human-readable string.
 */
export function formatDate(dateString: string, locale: 'id' | 'en' = 'id'): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}
