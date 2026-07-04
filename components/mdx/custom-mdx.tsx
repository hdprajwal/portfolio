import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/mdx/mdx-components';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';

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
          rehypePlugins: [
            [
              rehypeShiki,
              {
                themes: {
                  light: 'github-light',
                  dark: 'github-dark',
                },
                defaultColor: false,
                cssVariablePrefix: '--shiki-',
                transformers: [
                  {
                    name: 'theme-aware',
                    code(node: any) {
                      node.properties['data-theme'] = 'light dark';
                    },
                    pre(this: any, node: any) {
                      node.properties['data-language'] = this.options.lang;
                    },
                  },
                ],
              },
            ],
          ],
        },
      }}
    />
  );
}
