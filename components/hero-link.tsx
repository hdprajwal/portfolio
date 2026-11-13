import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

const underline =
  'text-foreground-strong decoration-accent-link group-hover/hl:decoration-foreground-strong underline underline-offset-4 transition-colors';

type Preview = {
  title: string;
  meta: string;
  body: string;
  image?: string;
};

// Hero bio link: a colored icon tile glued to the first word, plus a hover preview card on md+ screens (motion lives in .hero-preview, globals.css).
export default function HeroLink({
  href,
  icon,
  tile,
  children,
  preview,
}: {
  href: string;
  icon: ReactNode;
  tile: string;
  children: string;
  preview: Preview;
}) {
  const external = href.startsWith('http');
  const [first, ...rest] = children.split(' ');

  return (
    <span className="group/hl hero-link relative">
      <Link
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="whitespace-nowrap">
          <span
            aria-hidden
            className={`mr-1.5 inline-flex size-[18px] items-center justify-center overflow-hidden rounded-md align-[-3px] text-white transition-transform duration-200 ease-out group-hover/hl:scale-110 group-hover/hl:-rotate-6 motion-reduce:transform-none ${tile}`}
          >
            {icon}
          </span>
          <span className={underline}>{first}</span>
        </span>
        {rest.length > 0 && (
          <span className={underline}> {rest.join(' ')}</span>
        )}
      </Link>
      <span
        role="tooltip"
        className="hero-preview border-border bg-card absolute top-full left-0 z-20 mt-2 w-64 origin-top-left rounded-md border p-2 shadow-xl"
      >
        {preview.image && (
          <span className="bg-muted relative mb-2 block aspect-video overflow-hidden rounded-md">
            <Image
              src={preview.image}
              alt=""
              fill
              sizes="256px"
              className="object-cover"
            />
          </span>
        )}
        <span className="flex items-baseline gap-2 px-1">
          <span className="text-foreground-strong text-meta font-medium">
            {preview.title}
          </span>
          <span className="text-muted-foreground text-meta ml-auto shrink-0">
            {preview.meta}
          </span>
        </span>
        <span className="text-foreground-soft text-meta mt-0.5 block px-1 pb-1">
          {preview.body}
        </span>
      </span>
    </span>
  );
}
