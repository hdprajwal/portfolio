import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';
import { listPosts } from '@/lib/posts';
import { listTILs } from '@/lib/tils';
import { baseUrl as BASE_URL } from '@/lib/site';

function listProjectSlugs(): string[] {
  const dir = path.join(process.cwd(), 'content/projects');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tils] = await Promise.all([listPosts(), listTILs()]);
  const projectSlugs = listProjectSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/about`, priority: 0.9 },
    { url: `${BASE_URL}/now`, priority: 0.8 },
    { url: `${BASE_URL}/resume`, priority: 0.7 },
    { url: `${BASE_URL}/blog`, priority: 0.8 },
    { url: `${BASE_URL}/projects`, priority: 0.8 },
    { url: `${BASE_URL}/tils`, priority: 0.7 },
    { url: `${BASE_URL}/bucket-list`, priority: 0.5 },
    { url: `${BASE_URL}/colophon`, priority: 0.4 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    priority: 0.6,
  }));

  const tilRoutes: MetadataRoute.Sitemap = tils.map((til) => ({
    url: `${BASE_URL}/tils/${til.slug}`,
    lastModified: new Date(til.date),
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes, ...tilRoutes];
}
