import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { viewTransition: true },
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
  async rewrites() {
    return [
      { source: '/blog/:slug.md', destination: '/md/blog/:slug' },
      { source: '/projects/:slug.md', destination: '/md/projects/:slug' },
      { source: '/tils/:slug.md', destination: '/md/tils/:slug' },
    ];
  },
};

// Compiles .mdx files placed under app/ into routes. Content in content/
// goes through next-mdx-remote instead (components/mdx/custom-mdx.tsx).
// Plugins use the string form: Turbopack requires the MDX options to be
// serializable, so imported plugin functions can't be passed here.
const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-gfm']],
    rehypePlugins: [
      [
        '@shikijs/rehype',
        {
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          defaultColor: false,
          cssVariablePrefix: '--shiki-',
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
