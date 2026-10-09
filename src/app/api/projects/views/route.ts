import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from '@/services/supabase/client';

const VIEWS_FILE = path.join(
  process.cwd(),
  'src',
  'services',
  'data',
  'project-views.json'
);

function readLocalViews(): Record<string, number> {
  try {
    if (!fs.existsSync(VIEWS_FILE)) {
      return {};
    }
    const data = fs.readFileSync(VIEWS_FILE, 'utf-8');
    return JSON.parse(data || '{}');
  } catch {
    return {};
  }
}

function writeLocalViews(viewsMap: Record<string, number>): void {
  try {
    fs.writeFileSync(VIEWS_FILE, JSON.stringify(viewsMap, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write views to file:', error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // If Supabase is configured, attempt to read from Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        if (slug) {
          const { data } = await supabase
            .from('project_views')
            .select('views')
            .eq('slug', slug)
            .single();

          const count = data?.views ?? 0;
          return NextResponse.json({ success: true, slug, views: count });
        } else {
          const { data } = await supabase
            .from('project_views')
            .select('slug, views');

          const map: Record<string, number> = {};
          data?.forEach((row: { slug: string; views: number }) => {
            map[row.slug] = row.views;
          });
          return NextResponse.json({ success: true, views: map });
        }
      } catch {
        // Fallback to local file store
      }
    }

    const viewsMap = readLocalViews();
    if (slug) {
      return NextResponse.json({
        success: true,
        slug,
        views: viewsMap[slug] || 0,
      });
    }

    return NextResponse.json({ success: true, views: viewsMap });
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
    const slug = body.slug || body.projectId;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Missing slug' },
        { status: 400 }
      );
    }

    // 1. Update local persistence
    const viewsMap = readLocalViews();
    const current = viewsMap[slug] || 0;
    const updated = current + 1;
    viewsMap[slug] = updated;
    writeLocalViews(viewsMap);

    // 2. If Supabase is configured, upsert into Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('project_views').upsert(
          { slug, views: updated },
          { onConflict: 'slug' }
        );
      } catch (err) {
        console.warn('Supabase view update failed, local fallback kept:', err);
      }
    }

    return NextResponse.json({
      success: true,
      slug,
      views: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
