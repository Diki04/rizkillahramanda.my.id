import { NextResponse } from 'next/server';
import { dataProvider } from '@/services/supabase/dataProvider';
import { verifyRequestAuth, isValidPasscode } from '@/services/auth/adminAuth';

export async function GET() {
  try {
    const projects = await dataProvider.getProjects();
    return NextResponse.json({ success: true, data: projects });
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

    const { project } = body;
    if (!project || !project.id || !project.title) {
      return NextResponse.json(
        { success: false, error: 'Invalid project payload' },
        { status: 400 }
      );
    }

    const result = await dataProvider.saveProject(project);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: project });
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
        { success: false, error: 'Missing project ID' },
        { status: 400 }
      );
    }

    const result = await dataProvider.deleteProject(id);
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
