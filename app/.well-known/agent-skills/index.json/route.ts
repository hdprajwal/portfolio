import { baseUrl } from '@/lib/site';
import { buildSkillsIndex } from '@/lib/agent-discovery';

export const dynamic = 'force-static';

export async function GET() {
  return Response.json(await buildSkillsIndex(baseUrl), {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
}
