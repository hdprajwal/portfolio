import { cache } from 'react';
import { listPosts } from '@/lib/posts';
import { listTILs } from '@/lib/tils';

export type WritingItem = {
  kind: 'post' | 'til';
  slug: string;
  title: string;
  date: string;
  content?: string;
  href: string;
};

// Blog posts and TILs merged into one newest-first feed for /blog and the home page.
export const listWriting = cache(async (): Promise<WritingItem[]> => {
  const [posts, tils] = await Promise.all([listPosts(), listTILs()]);
  const items: WritingItem[] = [
    ...posts.map((p) => ({
      kind: 'post' as const,
      slug: p.slug,
      title: p.title,
      date: p.date,
      content: p.content,
      href: `/blog/${p.slug}`,
    })),
    ...tils.map((t) => ({
      kind: 'til' as const,
      slug: t.slug,
      title: t.title,
      date: t.date,
      content: t.content,
      href: `/tils/${t.slug}`,
    })),
  ];
  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});
