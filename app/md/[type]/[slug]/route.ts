import { getPost, listPosts } from '@/lib/posts';
import { getProject, listProjects, hasProjectPage } from '@/lib/projects';
import { getTIL, listTILs } from '@/lib/tils';
import {
  postToMarkdown,
  projectToMarkdown,
  tilToMarkdown,
} from '@/lib/markdown';

export const dynamic = 'force-static';

type ContentEntry<T extends { slug: string }> = {
  list: () => Promise<T[]>;
  get: (slug: string) => Promise<T | null>;
  toMarkdown: (item: T) => string;
  isPublished: (item: T) => boolean;
};

// Widens a strongly-typed entry so it can live alongside the other content types in the registry.
function defineEntry<T extends { slug: string }>(
  entry: ContentEntry<T>
): ContentEntry<{ slug: string }> {
  return entry as unknown as ContentEntry<{ slug: string }>;
}

// Local registry mapping URL type segments to their content loaders and formatters.
const registry: Record<string, ContentEntry<{ slug: string }>> = {
  blog: defineEntry({
    list: listPosts,
    get: getPost,
    toMarkdown: postToMarkdown,
    isPublished: () => true,
  }),
  projects: defineEntry({
    list: listProjects,
    get: getProject,
    toMarkdown: projectToMarkdown,
    isPublished: hasProjectPage,
  }),
  tils: defineEntry({
    list: listTILs,
    get: getTIL,
    toMarkdown: tilToMarkdown,
    isPublished: () => true,
  }),
};

export async function generateStaticParams() {
  const paramsByType = await Promise.all(
    Object.entries(registry).map(async ([type, entry]) => {
      const items = await entry.list();
      return items
        .filter(entry.isPublished)
        .map((item) => ({ type, slug: item.slug }));
    })
  );
  return paramsByType.flat();
}

async function toMarkdown(type: string, slug: string): Promise<string | null> {
  const entry = registry[type];
  if (!entry) return null;
  const item = await entry.get(slug);
  if (!item || !entry.isPublished(item)) return null;
  return entry.toMarkdown(item);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  const { type, slug } = await params;
  const markdown = await toMarkdown(type, slug);

  if (markdown === null) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
