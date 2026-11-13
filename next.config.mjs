import path from 'node:path';
import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { viewTransition: true },
  // Lets phones on the LAN load dev assets and HMR.
  allowedDevOrigins: ['10.0.0.95'],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.hdprajwal.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [{ source: '/tils', destination: '/blog', permanent: false }];
  },
  async rewrites() {
    return [
      { source: '/blog/:slug.md', destination: '/md/blog/:slug' },
      { source: '/projects/:slug.md', destination: '/md/projects/:slug' },
      { source: '/tils/:slug.md', destination: '/md/tils/:slug' },
    ];
  },
};

// Compiles app/ MDX (incl. blog/TIL posts); plugins are strings because Turbopack needs serializable options.
const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-gfm'], ['remark-frontmatter']],
    rehypePlugins: [[path.join(import.meta.dirname, 'lib/mdx/rehype-code.mjs')]],
  },
});

export default withMDX(nextConfig);
