import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pre from '@/components/PreBlock';

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
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mt-8 first:mt-0"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="scroll-m-20 text-xl font-semibold tracking-tight mt-4"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="scroll-m-20 text-lg font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />
  ),
  ul: (props: any) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  li: (props: any) => <li {...props} />,
  a: (props: any) => (
    <a
      className="font-medium text-primary underline underline-offset-4"
      {...props}
    />
  ),
  strong: (props: any) => <strong className="font-semibold" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
  hr: (props: any) => <hr className="my-4" {...props} />,

  code: (props: any) => {
    if (!props.className?.includes('language-')) {
      return (
        <code
          className="relative rounded-b px-[0.3rem] py-[0.2rem] text-sm bg-muted"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props:any) => (      
      <Pre {...props} >
        {props.children}
      </Pre>
  ),
  blockquote: (props: any) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
  ),
};
