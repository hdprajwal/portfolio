import { baseUrl } from '@/lib/site';
import { buildSkillMarkdown } from '@/lib/agent-discovery';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildSkillMarkdown(baseUrl), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
