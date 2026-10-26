import { NextResponse } from 'next/server';
import { baseUrl } from '@/lib/site';
import { campaignRedirectPath } from '@/lib/tracking';

// Tracked application links: /r/<company> 302s home with UTM params so each
// application shows up in PostHog as its own campaign.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const path = campaignRedirectPath(code);
  return NextResponse.redirect(new URL(path ?? '/', baseUrl), 302);
}
