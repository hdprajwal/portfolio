import type { Post } from '@/lib/posts';
import { hasProjectPage, type Project } from '@/lib/projects';
import type { TIL } from '@/lib/tils';

export type ContentIndexItem = {
  type: 'blog' | 'project' | 'til';
  title: string;
  href: string;
  summary: string;
  tags: string[];
};

export function buildContentIndex(
  posts: Post[],
  projects: Project[],
  tils: TIL[]
): ContentIndexItem[] {
  const postItems: ContentIndexItem[] = posts.map((p) => ({
    type: 'blog',
    title: p.title,
    href: `/blog/${p.slug}`,
    summary: p.summary ?? '',
    tags: p.tags ?? [],
  }));

  const projectItems: ContentIndexItem[] = projects.map((p) => ({
    type: 'project',
    // Detail pages only exist for projects with a body; see app/sitemap.ts.
    href: hasProjectPage(p) ? `/projects/${p.slug}` : '/projects',
    title: p.name,
    summary: p.tagline || p.description,
    tags: p.tags,
  }));

  const tilItems: ContentIndexItem[] = tils.map((t) => ({
    type: 'til',
    title: t.title,
    href: `/tils/${t.slug}`,
    summary: t.description,
    tags: t.tags ?? [],
  }));

  return [...postItems, ...projectItems, ...tilItems];
}
