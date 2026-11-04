import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/mdx/mdx-components';
import remarkGfm from 'remark-gfm';
import rehypeCode from '@/lib/mdx/rehype-code.mjs';

// Renders MDX strings from content/ (projects). Blog posts and TILs are compiled by @next/mdx instead.
export function CustomMDX({ source }: { source: string | undefined }) {
  if (!source) {
    return null;
  }
  return (
    <MDXRemote
      source={source}
      components={MDXComponents}
      options={{
        // First-party MDX only; allows JSX attribute expressions (blockDangerousJS stays true).
        blockJS: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeCode],
        },
      }}
    />
  );
}
