import type { Post } from '@/lib/posts';
import { hasProjectPage, type Project } from '@/lib/projects';
import type { TIL } from '@/lib/tils';
import { resume } from '@/lib/resume';
import {
  postToMarkdown,
  projectToMarkdown,
  tilToMarkdown,
  resumeToMarkdown,
} from '@/lib/markdown';

export type LlmsInput = {
  posts: Post[];
  projects: Project[];
  tils: TIL[];
};

const HEADER = `# Prajwal HD

> AI engineer based in California building AI agents and the developer tools around them, with three years of backend and full-stack engineering at Opslyft and peer-reviewed Android malware detection research at Purdue. Open to AI engineer, backend, and full-stack roles.`;

export function buildLlmsIndex(input: LlmsInput, siteUrl: string): string {
  const lines: string[] = [HEADER, ''];

  lines.push('## Projects', '');
  for (const p of input.projects) {
    const href = hasProjectPage(p)
      ? `${siteUrl}/projects/${p.slug}.md`
      : `${siteUrl}/projects`;
    lines.push(`- [${p.name}](${href}): ${p.tagline || p.description}`);
  }

  lines.push('', '## Writing', '');
  for (const post of input.posts) {
    lines.push(
      `- [${post.title}](${siteUrl}/blog/${post.slug}.md): ${post.summary ?? ''}`
    );
  }

  lines.push('', '## Today I Learned', '');
  for (const til of input.tils) {
    lines.push(
      `- [${til.title}](${siteUrl}/tils/${til.slug}.md): ${til.description}`
    );
  }

  lines.push(
    '',
    '## Resume and contact',
    '',
    `- [Resume](${siteUrl}/resume): experience, education, publications`,
    `- [Resume PDF](${resume.pdfUrl})`,
    `- [Full site content in one file](${siteUrl}/llms-full.txt)`,
    `- Email: ${resume.email}`,
    `- GitHub: ${resume.github}`
  );

  return lines.join('\n') + '\n';
}

export function buildLlmsFull(input: LlmsInput, siteUrl: string): string {
  const divider = '\n\n---\n\n';
  const sections = [
    HEADER,
    resumeToMarkdown(resume),
    ...input.projects.filter(hasProjectPage).map((p) => projectToMarkdown(p)),
    ...input.posts.map((p) => postToMarkdown(p)),
    ...input.tils.map((t) => tilToMarkdown(t)),
    `Canonical site: ${siteUrl}`,
  ];
  return sections.join(divider) + '\n';
}
