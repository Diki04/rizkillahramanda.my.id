import { describe, it, expect } from 'vitest';
import { isValidPasscode, getExpectedSessionToken } from '../services/auth/adminAuth';

describe('adminAuth helper module', () => {
  it('should generate deterministic HMAC token', () => {
    const token1 = getExpectedSessionToken();
    const token2 = getExpectedSessionToken();
    expect(token1).toBeDefined();
    expect(token1).toBe(token2);
    expect(token1.length).toBe(64); // SHA-256 hex string
  });

  it('should reject empty or invalid passcode', () => {
    expect(isValidPasscode('')).toBe(false);
    expect(isValidPasscode('wrong_random_passcode_999')).toBe(false);
  });
});
