import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  isValidPasscode,
  getExpectedSessionToken,
  verifyRequestAuth,
  SESSION_COOKIE_NAME,
  getClientIp,
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from '@/services/auth/adminAuth';

export async function GET(request: Request) {
  const isAuth = verifyRequestAuth(request);
  return NextResponse.json({ authenticated: isAuth });
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      const minutes = Math.ceil((rateLimit.retryAfterSeconds || 900) / 60);
      return NextResponse.json(
        {
          success: false,
          error: `Terlalu banyak percobaan gagal. Akses diblokir selama ${minutes} menit untuk alasan keamanan.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds || 900),
          },
        }
      );
    }

    const body = await request.json();
    const { passcode } = body;

    // Artificial delay to thwart automated high-speed brute force attacks
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!passcode || !isValidPasscode(passcode)) {
      const failure = recordFailedAttempt(ip);
      if (failure.blocked) {
        return NextResponse.json(
          {
            success: false,
            error: 'Batas percobaan terlampaui. Akses Anda sementara diblokir selama 15 menit.',
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `Kunci rahasia admin salah. Sisa percobaan: ${failure.remainingAttempts}`,
        },
        { status: 401 }
      );
    }

    // Reset rate limiter on successful authentication
    resetRateLimit(ip);

    const sessionToken = getExpectedSessionToken();
    const cookieStore = cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours session lifetime
    });

    return NextResponse.json({ success: true, message: 'Autentikasi berhasil.' });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ success: true, message: 'Sesi admin telah ditutup.' });
}
