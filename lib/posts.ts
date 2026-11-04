import path from 'path';
import { cache } from 'react';
import {
  isHiddenDraft,
  readMdxEntries,
  readMdxEntry,
  type MdxEntry,
} from '@/lib/content';

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  content?: string;
  image?: string;
  draft?: boolean;
};

const BLOG_DIR = path.join(process.cwd(), 'app/(pages)/blog/_content');

export { baseUrl } from '@/lib/site';

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function toPost({ slug, data, content }: MdxEntry): Post {
  return {
    slug,
    title: data.title || slug,
    date: data.date || '1970-01-01',
    summary: data.summary,
    tags: data.tags || [],
    content,
    image: data.image || data.cover || data.banner || undefined,
    draft: data.draft === true,
  };
}

export const listPosts = cache(async (): Promise<Post[]> => {
  return readMdxEntries(BLOG_DIR)
    .map(toPost)
    .filter((post) => !isHiddenDraft(post.draft))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export const getBlogPosts = listPosts;

export async function getPost(slug: string): Promise<Post | null> {
  const entry = readMdxEntry(BLOG_DIR, slug);
  if (!entry) return null;
  const post = toPost(entry);
  return isHiddenDraft(post.draft) ? null : post;
}
