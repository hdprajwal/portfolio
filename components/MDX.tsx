import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';
import { transformerCopyButton } from '@rehype-pretty/transformers';

export function CustomMDX({ source }: { source: string | undefined }) {
  if (!source) {
    return null;
  }
  return (
    <MDXRemote
      source={source}
      components={MDXComponents}
      options={{
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
