import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// POST with `Authorization: Bearer <REVALIDATION_SECRET>`. The secret lives in
// a header (query strings persist in logs and shell history), and an unset
// env var rejects everything — `undefined === undefined` must never authorize.
// Revalidates the full publish bundle: /writing alone would leave edited
// posts, the feed, and the sitemap stale until their own windows lapse.
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATION_SECRET;
  const auth = request.headers.get('authorization');

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = await request.json();
    if (typeof body?.slug === 'string' && /^[a-zA-Z0-9-_]+$/.test(body.slug)) {
      slug = body.slug;
    }
  } catch {
    // no body — revalidate the bundle
  }

  try {
    revalidatePath('/writing');
    revalidatePath('/writing/[slug]', 'page');
    if (slug) revalidatePath(`/writing/${slug}`);
    revalidatePath('/feed.xml');
    revalidatePath('/sitemap.xml');
    revalidatePath('/thoughts');

    return NextResponse.json({
      success: true,
      revalidated: ['/writing', '/writing/[slug]', slug ? `/writing/${slug}` : null, '/feed.xml', '/sitemap.xml', '/thoughts'].filter(Boolean),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation failed:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
