import type { ReactNode } from 'react';
import ZoomImage from '@/components/mdx/zoom-image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pre from '@/components/mdx/pre-block';
import Mermaid from '@/components/mdx/mermaid';
import { slugify } from '@/lib/slugify';

// Typography is owned by typeset (app/typeset.css); components here only add behavior CSS can't.

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return '';
}

function createHeading(level: 1 | 2 | 3 | 4) {
  const Tag = `h${level}` as const;
  return function Heading({ children, ...props }: { children?: ReactNode }) {
    const slug = slugify(textOf(children));
    return (
      <Tag id={slug} {...props}>
        {children}
        <a
          href={`#${slug}`}
          className="heading-anchor"
          aria-label="Link to this section"
        >
          #
        </a>
      </Tag>
    );
  };
}

export const MDXComponents = {
  img: (props: any) => <ZoomImage {...props} />,
  table: (props: any) => (
    <div className="my-7">
      <Table {...props} />
    </div>
  ),
  thead: (props: any) => <TableHeader {...props} />,
  tbody: (props: any) => <TableBody {...props} />,
  tr: (props: any) => <TableRow {...props} />,
  th: (props: any) => <TableHead {...props} />,
  td: (props: any) => <TableCell {...props} />,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  a: (props: any) => {
    const isExternal =
      typeof props.href === 'string' && /^https?:\/\//.test(props.href);
    return (
      <a
        {...props}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      />
    );
  },
  pre: (props: any) => <Pre {...props}>{props.children}</Pre>,
  Mermaid,
};
