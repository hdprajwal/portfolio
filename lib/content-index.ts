import type { Post } from '@/lib/posts';
import { type Project } from '@/lib/projects';
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
    href: `/projects/${p.slug}`,
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

// Ranks items for the WebMCP search tool: title hits beat tag hits beat summary hits.
export function searchContent(
  items: ContentIndexItem[],
  query: string,
  type?: ContentIndexItem['type'],
  limit = 10
): ContentIndexItem[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const pool = type ? items.filter((item) => item.type === type) : items;
  if (terms.length === 0) return pool.slice(0, limit);
  return pool
    .map((item) => {
      const title = item.title.toLowerCase();
      const tags = item.tags.join(' ').toLowerCase();
      const summary = item.summary.toLowerCase();
      const score = terms.reduce(
        (sum, term) =>
          sum +
          (title.includes(term) ? 3 : 0) +
          (tags.includes(term) ? 2 : 0) +
          (summary.includes(term) ? 1 : 0),
        0
      );
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}
