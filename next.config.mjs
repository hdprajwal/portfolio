import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeShiki, {
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
        defaultColor: false,
        cssVariablePrefix: '--shiki-',
      }]
    ],
  },
  experimental:{
    mdxRs: {
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      mdxType: 'gfm',
    },
  }
});

export default withMDX(nextConfig);


