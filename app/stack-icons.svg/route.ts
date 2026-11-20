import { buildStackSprite } from '@/components/icons/stack-icons';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildStackSprite(), {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
