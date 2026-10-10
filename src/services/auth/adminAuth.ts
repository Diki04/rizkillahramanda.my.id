import crypto from 'crypto';
import { cookies } from 'next/headers';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'portfolio_admin_default_passcode';
const SESSION_COOKIE_NAME = 'admin_session';

interface RateLimitEntry {
  attempts: number;
  blockedUntil: number | null;
  lastAttempt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const WINDOW_DURATION_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Timing-safe string comparison to protect against side-channel timing attacks.
 */
export function safeCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Get client IP address from request headers with fallback.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

/**
 * Check if the given IP address is currently rate-limited.
 */
export function checkRateLimit(ip: string): {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // Check if blocked
  if (entry.blockedUntil && entry.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((entry.blockedUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  // Reset window if expired
  if (now - entry.lastAttempt > WINDOW_DURATION_MS) {
    rateLimitMap.delete(ip);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  return {
    allowed: entry.attempts < MAX_ATTEMPTS,
    remainingAttempts: Math.max(0, MAX_ATTEMPTS - entry.attempts),
  };
}

/**
 * Record a failed attempt for an IP. Lock out if threshold exceeded.
 */
export function recordFailedAttempt(ip: string): {
  blocked: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || {
    attempts: 0,
    blockedUntil: null,
    lastAttempt: now,
  };

  entry.attempts += 1;
  entry.lastAttempt = now;

  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.blockedUntil = now + LOCKOUT_DURATION_MS;
    rateLimitMap.set(ip, entry);
    return {
      blocked: true,
      remainingAttempts: 0,
      retryAfterSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
    };
  }

  rateLimitMap.set(ip, entry);
  return {
    blocked: false,
    remainingAttempts: Math.max(0, MAX_ATTEMPTS - entry.attempts),
  };
}

/**
 * Reset rate limit entries for a successfully authenticated IP.
 */
export function resetRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}

/**
 * Deterministic HMAC session token for verification.
 */
export function getExpectedSessionToken(): string {
  return crypto.createHmac('sha256', ADMIN_SECRET).update('portfolio_admin_session_payload').digest('hex');
}

/**
 * Validates the admin passcode using timing-safe comparison.
 */
export function isValidPasscode(passcode: string): boolean {
  if (!passcode) return false;
  return safeCompare(passcode.trim(), ADMIN_SECRET);
}

/**
 * Verifies request authorization via HTTP-only cookie or x-admin-key header.
 */
export function verifyRequestAuth(request: Request): boolean {
  try {
    // 1. Check HTTP-Only Session Cookie
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (sessionCookie && safeCompare(sessionCookie, getExpectedSessionToken())) {
      return true;
    }

    // 2. Check x-admin-key header
    const adminHeader = request.headers.get('x-admin-key');
    if (adminHeader && safeCompare(adminHeader, ADMIN_SECRET)) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

export { SESSION_COOKIE_NAME };
