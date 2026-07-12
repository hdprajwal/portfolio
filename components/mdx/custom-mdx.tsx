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
                  light: 'github-light-default',
                  dark: 'github-dark-default',
                },
                defaultColor: false,
                cssVariablePrefix: '--shiki-',
                transformers: [
                  {
                    name: 'theme-aware',
                    code(node: any) {
                      node.properties['data-theme'] = 'light dark';
                    },
                    // Forwards fence meta (title="...", showLineNumbers) to the pre element for the Pre wrapper to read.
                    pre(this: any, node: any) {
                      node.properties['data-language'] = this.options.lang;
                      const meta: string = this.options.meta?.__raw ?? '';
                      const title = meta.match(/title="([^"]+)"/)?.[1];
                      if (title) node.properties['data-title'] = title;
                      if (/\bshowLineNumbers\b/.test(meta)) {
                        node.properties['data-line-numbers'] = 'true';
                      }
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
