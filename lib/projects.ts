import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { isHiddenDraft } from '@/lib/content';

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  codeHref?: string;
  liveHref?: string;
  image?: string;
  video?: string;
  poster?: string;
  duration?: string;
  accent?: string;
  content?: string;
  featured?: boolean;
  date?: string;
  draft?: boolean;
  archived?: boolean;
};

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

export { baseUrl } from '@/lib/site';

function parseProject(slug: string, raw: string): Project {
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
    video: data.video,
    poster: data.poster,
    duration: data.duration,
    accent: data.accent,
    content,
    featured: data.featured || false,
    date: data.date,
    draft: data.draft === true,
    archived: data.archived === true,
  };
}

export const listProjects = cache(async (): Promise<Project[]> => {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) =>
      parseProject(
        file.replace('.mdx', ''),
        fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8')
      )
    )
    .filter((project) => !project.archived && !isHiddenDraft(project.draft))
    .sort((a, b) => {
      // Featured projects first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then by date (newest first), undated projects last
      if (a.date && b.date)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
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

  const project = parseProject(slug, fs.readFileSync(filePath, 'utf8'));
  if (project.archived || isHiddenDraft(project.draft)) {
    return null;
  }
  return project;
}
