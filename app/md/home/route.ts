import { listPosts } from '@/lib/posts';
import { listProjects } from '@/lib/projects';
import { listTILs } from '@/lib/tils';
import { baseUrl } from '@/lib/site';
import { buildLlmsIndex } from '@/lib/llms';
import { markdownResponse } from '@/lib/agent-discovery';

export const dynamic = 'force-static';

export async function GET() {
  const [posts, projects, tils] = await Promise.all([
    listPosts(),
    listProjects(),
    listTILs(),
  ]);
  return markdownResponse(buildLlmsIndex({ posts, projects, tils }, baseUrl));
}
