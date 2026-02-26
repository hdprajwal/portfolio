import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

export type TIL = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
};

const TIL_DIR = path.join(process.cwd(), 'content/til');

export { baseUrl } from '@/lib/site';

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const listTILs = cache(async (): Promise<TIL[]> => {
  if (!fs.existsSync(TIL_DIR)) {
    return [];
  }

  const files = fs.readdirSync(TIL_DIR);
  const tils = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(TIL_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: mdxContent } = matter(content);

      return {
        slug,
        title: data.title || slug,
        date: data.date || '1970-01-01',
        description: data.description || '',
        tags: data.tags || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return tils;
});

export async function getTIL(slug: string) {
  const filePath = path.join(TIL_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: mdxContent } = matter(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || '1970-01-01',
    description: data.description || '',
    content: mdxContent,
    tags: data.tags || [],
  };
}
