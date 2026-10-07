import { NextResponse } from 'next/server';
import { dataProvider } from '@/services/supabase/dataProvider';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'admin123';

export async function GET() {
  try {
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
    const { achievement, secretKey } = body;

    if (secretKey !== ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin Secret Key' },
        { status: 401 }
      );
    }

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
    const { id, secretKey } = body;

    if (secretKey !== ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin Secret Key' },
        { status: 401 }
      );
    }

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
