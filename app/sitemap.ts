import type { MetadataRoute } from 'next';
import { listPosts } from '@/lib/posts';
import { listProjects } from '@/lib/projects';
import { listTILs } from '@/lib/tils';
import { baseUrl as BASE_URL } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tils, projects] = await Promise.all([
    listPosts(),
    listTILs(),
    listProjects(),
  ]);
  const projectSlugs = projects
    .filter((p) => p.content?.trim())
    .map((p) => p.slug);

  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: now, priority: 0.9 },
    { url: `${BASE_URL}/resume`, lastModified: now, priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/tils`, lastModified: now, priority: 0.7 },
    { url: `${BASE_URL}/bucket-list`, lastModified: now, priority: 0.5 },
    { url: `${BASE_URL}/colophon`, lastModified: now, priority: 0.4 },
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
