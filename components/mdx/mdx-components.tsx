import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pre from '@/components/mdx/pre-block';

export const MDXComponents = {
  img: (props: any) => (
    <Image
      {...props}
      width={props.width || 800}
      height={props.height || 600}
      className={`rounded-lg ${props.className || ''}`}
      style={{ width: '100%', height: 'auto' }}
    />
  ),
  table: (props: any) => <Table {...props} />,
  thead: (props: any) => <TableHeader {...props} />,
  tbody: (props: any) => <TableBody {...props} />,
  tr: (props: any) => <TableRow {...props} />,
  th: (props: any) => <TableHead {...props} />,
  td: (props: any) => <TableCell {...props} />,
  // Typography elements - using shadcn typography styles
  h1: (props: any) => (
    <h1
      className="mt-10 scroll-m-20 text-xl font-bold tracking-tight first:mt-0 md:text-2xl"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="border-border mt-8 scroll-m-20 border-b pb-2 text-lg font-semibold tracking-tight first:mt-0 md:text-xl"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mt-6 scroll-m-20 text-base font-semibold tracking-tight md:text-lg"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="mt-4 scroll-m-20 text-sm font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="text-foreground/80 text-sm leading-relaxed md:text-base [&:not(:first-child)]:mt-4"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="text-foreground/80 my-6 ml-2 list-disc" {...props} />
  ),
  ol: (props: any) => (
    <ol className="text-foreground/80 my-6 ml-2 list-decimal" {...props} />
  ),
  li: (props: any) => <li className="text-foreground/80" {...props} />,
  a: (props: any) => (
    <a
      className="text-primary decoration-primary/30 hover:decoration-primary underline decoration-2 underline-offset-2 transition-colors"
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong className="text-foreground font-extrabold" {...props} />
  ),
  em: (props: any) => <em className="text-foreground/80 italic" {...props} />,
  hr: (props: any) => <hr className="border-border my-6" {...props} />,

  code: (props: any) => {
    if (!props.className?.includes('language-')) {
      return (
        <code
          className="bg-muted text-foreground relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: any) => <Pre {...props}>{props.children}</Pre>,
  blockquote: (props: any) => (
    <blockquote
      className="border-border text-md mt-4 border-l-2 pl-4 italic"
      {...props}
    />
  ),
};
