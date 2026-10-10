import { NextResponse } from 'next/server';
import { dataProvider } from '@/services/supabase/dataProvider';
import { verifyRequestAuth, isValidPasscode } from '@/services/auth/adminAuth';

export async function GET(request: Request) {
  try {
    if (!verifyRequestAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Sesi admin tidak valid.' },
        { status: 401 }
      );
    }
    const achievements = await dataProvider.getAchievements();
    return NextResponse.json({ success: true, data: achievements });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const isAuthorized = verifyRequestAuth(request) || (body.secretKey && isValidPasscode(body.secretKey));

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Sesi admin tidak valid atau telah berakhir.' },
        { status: 401 }
      );
    }

    const { achievement } = body;
    if (!achievement || !achievement.id || !achievement.title) {
      return NextResponse.json(
        { success: false, error: 'Invalid achievement payload' },
        { status: 400 }
      );
    }

    const result = await dataProvider.saveAchievement(achievement);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: achievement });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const isAuthorized = verifyRequestAuth(request) || (body.secretKey && isValidPasscode(body.secretKey));

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Sesi admin tidak valid atau telah berakhir.' },
        { status: 401 }
      );
    }

    const { id } = body;
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing achievement ID' },
        { status: 400 }
      );
    }

    const result = await dataProvider.deleteAchievement(id);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
