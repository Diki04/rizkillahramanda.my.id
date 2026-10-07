import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '../common/utils/sanitizeHtml';

describe('sanitizeHtml helper', () => {
  it('should escape HTML tags and quotes to prevent XSS', () => {
    const dirty = '<script>alert("xss")</script>Hello <b>World</b>';
    const clean = sanitizeHtml(dirty);
    expect(clean).toContain('&lt;script&gt;');
    expect(clean).toContain('&quot;xss&quot;');
  });
});
