import { NextResponse } from 'next/server';
import { getThoughtsPage } from '@/lib/notion';

export async function GET() {
  try {
    console.log('🔍 API Test: Testing Notion connection...');
    
    const result = await getThoughtsPage();
    
    return NextResponse.json({
      success: true,
      thoughtsCount: result.blocks.length,
      timestamp: new Date().toISOString(),
      environment: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_THOUGHTS_PAGE_ID,
        pageId: process.env.NOTION_THOUGHTS_PAGE_ID?.substring(0, 8) + '...' // Only show first 8 chars for security
      }
    });
  } catch (error) {
    console.error('❌ API Test: Failed to fetch thoughts:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      environment: {
        hasApiKey: !!process.env.NOTION_API_KEY,
        hasPageId: !!process.env.NOTION_THOUGHTS_PAGE_ID,
        pageId: process.env.NOTION_THOUGHTS_PAGE_ID?.substring(0, 8) + '...'
      }
    }, { status: 500 });
  }
}
