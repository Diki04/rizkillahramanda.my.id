import { NextResponse } from 'next/server';
import { dataProvider } from '@/services/supabase/dataProvider';

export async function GET() {
  try {
    const messages = await dataProvider.getMessages();
    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 3 characters' },
        { status: 400 }
      );
    }

    const result = await dataProvider.postMessage({
      name: name.trim(),
      message: message.trim(),
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to post message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const result = await dataProvider.deleteMessage(id);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to delete message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
