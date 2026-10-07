import { NextResponse } from 'next/server';
import { dataProvider } from '@/services/supabase/dataProvider';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'admin123';

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
    const { project, secretKey } = body;

    if (secretKey !== ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin Secret Key' },
        { status: 401 }
      );
    }

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
    const { id, secretKey } = body;

    if (secretKey !== ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin Secret Key' },
        { status: 401 }
      );
    }

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
