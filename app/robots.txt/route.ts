import { baseUrl } from '@/lib/site';
import { buildRobotsTxt } from '@/lib/agent-discovery';

export const dynamic = 'force-static';

// Hand-written instead of app/robots.ts because MetadataRoute.Robots can't emit Content-Signal lines.
export function GET() {
  return new Response(buildRobotsTxt(baseUrl), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
