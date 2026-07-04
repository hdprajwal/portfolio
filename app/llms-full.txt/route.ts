import { listPosts } from '@/lib/posts';
import { listProjects } from '@/lib/projects';
import { listTILs } from '@/lib/tils';
import { baseUrl } from '@/lib/site';
import { buildLlmsFull } from '@/lib/llms';

export const dynamic = 'force-static';

export async function GET() {
  const [posts, projects, tils] = await Promise.all([
    listPosts(),
    listProjects(),
    listTILs(),
  ]);

  return new Response(buildLlmsFull({ posts, projects, tils }, baseUrl), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
