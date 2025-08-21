import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hdprajwal.dev';
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/blog` },
    { url: `${base}/projects` },
    { url: `${base}/now` },
    { url: `${base}/colophon` },
  ];
}
