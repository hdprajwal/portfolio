import type { Post } from '@/lib/posts';
import type { Project } from '@/lib/projects';
import type { Resume } from '@/lib/resume';
import type { TIL } from '@/lib/tils';

function toIsoDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString().slice(0, 10);
}

function metaLine(parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join('\n');
}

export function postToMarkdown(post: Post): string {
  return [
    `# ${post.title}`,
    metaLine([
      `Published: ${toIsoDate(post.date)}`,
      post.tags && post.tags.length > 0 && `Tags: ${post.tags.join(', ')}`,
      `Author: Prajwal HD`,
    ]),
    post.summary ?? '',
    post.content ?? '',
  ]
    .filter(Boolean)
    .join('\n\n');
}

export function projectToMarkdown(project: Project): string {
  return [
    `# ${project.name}`,
    project.tagline,
    metaLine([
      project.tags.length > 0 && `Tags: ${project.tags.join(', ')}`,
      project.codeHref && `Code: ${project.codeHref}`,
      project.liveHref && `Live: ${project.liveHref}`,
    ]),
    project.description,
    project.content ?? '',
  ]
    .filter(Boolean)
    .join('\n\n');
}

export function tilToMarkdown(til: TIL): string {
  return [
    `# ${til.title}`,
    metaLine([
      `Published: ${toIsoDate(til.date)}`,
      til.tags && til.tags.length > 0 && `Tags: ${til.tags.join(', ')}`,
    ]),
    til.description,
    til.content ?? '',
  ]
    .filter(Boolean)
    .join('\n\n');
}

export function resumeToMarkdown(resume: Resume): string {
  const lines: string[] = [
    `# ${resume.name}`,
    '',
    `${resume.headline} | ${resume.location}`,
    `Email: ${resume.email} | GitHub: ${resume.github} | LinkedIn: ${resume.linkedin}`,
    `Last updated: ${resume.updated}`,
    '',
    resume.summary,
    '',
    '## Experience',
  ];

  for (const company of resume.experience) {
    lines.push('', `### ${company.name} (${company.location})`);
    for (const role of company.roles) {
      lines.push('', `${role.title}, ${role.type}, ${role.from} to ${role.to}`);
      for (const bullet of role.bullets) {
        lines.push(`- ${bullet}`);
      }
    }
  }

  lines.push('', '## Publications');
  for (const pub of resume.publications) {
    lines.push(
      '',
      `### ${pub.title}`,
      `${pub.venue}, ${pub.year}. ${pub.citation}`,
      pub.summary,
      pub.href
    );
  }

  lines.push('', '## Speaking');
  for (const talk of resume.talks) {
    lines.push('', `### ${talk.title} (${talk.venue})`, talk.summary);
    if (talk.href) lines.push(talk.href);
  }

  lines.push('', '## Education');
  for (const edu of resume.education) {
    lines.push(
      '',
      `### ${edu.school}`,
      `${edu.degree}, ${edu.major}, ${edu.from} to ${edu.to}`
    );
    if (edu.thesis) lines.push(`Thesis: ${edu.thesis.title} (${edu.thesis.href})`);
    if (edu.coursework) lines.push(`Coursework: ${edu.coursework}`);
  }

  return lines.join('\n');
}
