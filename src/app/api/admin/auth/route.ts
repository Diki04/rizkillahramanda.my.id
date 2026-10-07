import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  isValidPasscode,
  getExpectedSessionToken,
  verifyRequestAuth,
  SESSION_COOKIE_NAME,
} from '@/services/auth/adminAuth';

export async function GET(request: Request) {
  const isAuth = verifyRequestAuth(request);
  return NextResponse.json({ authenticated: isAuth });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    if (!passcode || !isValidPasscode(passcode)) {
      return NextResponse.json(
        { success: false, error: 'Kunci rahasia admin salah.' },
        { status: 401 }
      );
    }

    const sessionToken = getExpectedSessionToken();
    const cookieStore = cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
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
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ success: true, message: 'Sesi admin telah ditutup.' });
}
