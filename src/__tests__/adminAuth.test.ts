import { describe, it, expect, beforeEach } from 'vitest';
import {
  isValidPasscode,
  getExpectedSessionToken,
  safeCompare,
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from '../services/auth/adminAuth';

describe('adminAuth helper module', () => {
  beforeEach(() => {
    resetRateLimit('192.168.1.100');
  });

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

  it('should safely compare strings using timing-safe comparison', () => {
    expect(safeCompare('secret_key_123', 'secret_key_123')).toBe(true);
    expect(safeCompare('secret_key_123', 'secret_key_456')).toBe(false);
    expect(safeCompare('secret_key_123', '')).toBe(false);
  });

  it('should track and throttle failed attempts with rate limiting', () => {
    const testIp = '192.168.1.100';

    // Initial check: allowed
    expect(checkRateLimit(testIp).allowed).toBe(true);
    expect(checkRateLimit(testIp).remainingAttempts).toBe(5);

    // Record 4 failed attempts
    for (let i = 1; i <= 4; i++) {
      const res = recordFailedAttempt(testIp);
      expect(res.blocked).toBe(false);
      expect(res.remainingAttempts).toBe(5 - i);
    }

    // 5th failed attempt: triggers lockout
    const finalAttempt = recordFailedAttempt(testIp);
    expect(finalAttempt.blocked).toBe(true);
    expect(finalAttempt.remainingAttempts).toBe(0);
    expect(finalAttempt.retryAfterSeconds).toBeGreaterThan(0);

    // Subsequent check is blocked
    const status = checkRateLimit(testIp);
    expect(status.allowed).toBe(false);
    expect(status.remainingAttempts).toBe(0);

    // Reset unlocks IP
    resetRateLimit(testIp);
    expect(checkRateLimit(testIp).allowed).toBe(true);
  });
});
