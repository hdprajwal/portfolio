import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { TIL } from '@/lib/tils';
import { ViewTransition } from '@/components/view-transition';

export default function TilCard({ til }: { til: TIL }) {
  const dateStr = new Date(til.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
  const tags = til.tags?.slice(0, 2) ?? [];

  return (
    <Link
      href={`/tils/${til.slug}`}
      className="group hover:bg-accent/60 block rounded-md px-3 py-4 transition-colors duration-150"
    >
      <span className="flex items-start gap-1.5">
        <ViewTransition name={`til-title-${til.slug}`}>
          <span className="text-foreground text-title text-pretty">
            {til.title}
          </span>
        </ViewTransition>
        <ArrowRight className="text-muted-foreground mt-[5px] size-3.5 shrink-0 -translate-x-1 opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0" />
      </span>
      {til.description && (
        <span className="text-foreground-soft text-subtitle mt-0.5 line-clamp-2 text-pretty">
          {til.description}
        </span>
      )}
      <span className="text-muted-foreground text-meta mt-2 block">
        <time dateTime={til.date} className="tabular-nums">
          {dateStr}
        </time>
        {tags.length > 0 && ` · ${tags.join(', ')}`}
      </span>
    </Link>
  );
}
