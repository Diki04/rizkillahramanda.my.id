import crypto from 'crypto';
import { cookies } from 'next/headers';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'portfolio_admin_default_passcode';
const SESSION_COOKIE_NAME = 'admin_session';

export function getExpectedSessionToken(): string {
  return crypto.createHmac('sha256', ADMIN_SECRET).update('portfolio_admin_session_payload').digest('hex');
}

export function isValidPasscode(passcode: string): boolean {
  if (!passcode) return false;
  return passcode.trim() === ADMIN_SECRET;
}

export function verifyRequestAuth(request: Request): boolean {
  // 1. Check HTTP-Only Session Cookie
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (sessionCookie && sessionCookie === getExpectedSessionToken()) {
    return true;
  }

  // 2. Check x-admin-key header
  const adminHeader = request.headers.get('x-admin-key');
  if (adminHeader && adminHeader === ADMIN_SECRET) {
    return true;
  }

  return false;
}

export { SESSION_COOKIE_NAME };
