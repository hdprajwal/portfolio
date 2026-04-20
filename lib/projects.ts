import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  codeHref?: string;
  liveHref?: string;
  image?: string;
  content?: string;
  featured?: boolean;
  date?: string;
};

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

export { baseUrl } from '@/lib/site';

export const listProjects = cache(async (): Promise<Project[]> => {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(PROJECTS_DIR);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(PROJECTS_DIR, file);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);

      return {
        slug,
        name: data.name || slug,
        tagline: data.tagline || '',
        description: data.description || '',
        tags: data.tags || [],
        codeHref: data.codeHref,
        liveHref: data.liveHref,
        image: data.image,
        content,
        featured: data.featured || false,
        date: data.date,
      };
    })
    .sort((a, b) => {
      // Featured projects first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then by date (newest first), undated projects last
      if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (a.date) return -1;
      if (b.date) return 1;
      return 0;
    });
});

export async function getProject(slug: string): Promise<Project | null> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    name: data.name || slug,
    tagline: data.tagline || '',
    description: data.description || '',
    tags: data.tags || [],
    codeHref: data.codeHref,
    liveHref: data.liveHref,
    image: data.image,
    content,
  };
}
