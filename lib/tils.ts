import path from 'path';
import { cache } from 'react';
import {
  isHiddenDraft,
  readMdxEntries,
  readMdxEntry,
  type MdxEntry,
} from '@/lib/content';

export type TIL = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  content?: string;
  draft?: boolean;
};

const TIL_DIR = path.join(process.cwd(), 'app/(pages)/tils/_content');

export { baseUrl } from '@/lib/site';

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function toTIL({ slug, data, content }: MdxEntry): TIL {
  return {
    slug,
    title: data.title || slug,
    date: data.date || '1970-01-01',
    description: data.description || '',
    tags: data.tags || [],
    content,
    draft: data.draft === true,
  };
}

export const listTILs = cache(async (): Promise<TIL[]> => {
  return readMdxEntries(TIL_DIR)
    .map(toTIL)
    .filter((til) => !isHiddenDraft(til.draft))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export async function getTIL(slug: string): Promise<TIL | null> {
  const entry = readMdxEntry(TIL_DIR, slug);
  if (!entry) return null;
  const til = toTIL(entry);
  return isHiddenDraft(til.draft) ? null : til;
}
