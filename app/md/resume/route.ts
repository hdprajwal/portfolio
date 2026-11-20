import { resume } from '@/lib/resume';
import { resumeToMarkdown } from '@/lib/markdown';
import { markdownResponse } from '@/lib/agent-discovery';

export const dynamic = 'force-static';

export function GET() {
  return markdownResponse(resumeToMarkdown(resume));
}
