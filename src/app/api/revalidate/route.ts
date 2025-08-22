import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Get the secret from query params or headers for security
    const secret = request.nextUrl.searchParams.get('secret');
    
    // Optional: Add a secret check for security
    // if (secret !== process.env.REVALIDATION_SECRET) {
    //   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    // }
    
    // Revalidate the thoughts page
    revalidatePath('/thoughts');
    
    console.log('✅ Manual revalidation triggered for /thoughts');
    
    return NextResponse.json({
      success: true,
      message: 'Revalidation triggered',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Manual revalidation failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
