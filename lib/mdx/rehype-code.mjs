import rehypeShiki from '@shikijs/rehype';

// Plain .mjs so next.config.mjs can reference it by path: Turbopack only accepts serializable MDX options.
export const shikiOptions = {
  themes: {
    light: 'github-light-default',
    dark: 'github-dark-default',
  },
  defaultColor: false,
  cssVariablePrefix: '--shiki-',
  transformers: [
    {
      name: 'theme-aware',
      code(node) {
        node.properties['data-theme'] = 'light dark';
      },
      // Forwards fence meta (title="...", showLineNumbers) to the pre element for the Pre wrapper to read.
      pre(node) {
        node.properties['data-language'] = this.options.lang;
        const meta = this.options.meta?.__raw ?? '';
        const title = meta.match(/title="([^"]+)"/)?.[1];
        if (title) node.properties['data-title'] = title;
        if (/\bshowLineNumbers\b/.test(meta)) {
          node.properties['data-line-numbers'] = 'true';
        }
      },
    },
  ],
};

export default function rehypeCode() {
  return rehypeShiki.call(this, shikiOptions);
}
