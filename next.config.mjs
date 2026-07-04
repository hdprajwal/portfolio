import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
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
};

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

// Compiles .mdx files placed under app/ into routes. Content in content/
// goes through next-mdx-remote instead (components/mdx/custom-mdx.tsx).
// Plugins use the string form: Turbopack requires the MDX options to be
// serializable, so imported plugin functions can't be passed here.
export default withMDX(nextConfig);
