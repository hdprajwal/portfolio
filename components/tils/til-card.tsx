import Link from 'next/link';
import type { TIL } from '@/lib/tils';
import TagChips from '@/components/projects/tag-chips';
import { ViewTransition } from '@/components/view-transition';

export default function TilCard({ til }: { til: TIL }) {
  const dateStr = new Date(til.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link
      href={`/tils/${til.slug}`}
      className="group border-border block border-b py-3 transition-all duration-200 first:pt-0 last:border-b-0 hover:pl-2"
    >
      <div className="flex items-baseline justify-between gap-4">
        <ViewTransition name={`til-title-${til.slug}`}>
          <span className="text-foreground text-title-14 group-hover:underline group-hover:underline-offset-3">
            {til.title}
          </span>
        </ViewTransition>
        <time
          dateTime={til.date}
          className="text-muted-foreground text-label-11-mono shrink-0 tabular-nums"
        >
          {dateStr}
        </time>
      </div>

      {til.description && (
        <p className="text-muted-foreground text-read-13 mt-1 line-clamp-1">
          {til.description}
        </p>
      )}

      {til.tags && til.tags.length > 0 && (
        <TagChips
          tags={til.tags}
          max={2}
          className="mt-2.5 flex flex-wrap gap-1.5"
        />
      )}
    </Link>
  );
}
