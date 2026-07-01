import Link from 'next/link';
import type { TIL } from '@/lib/tils';
import TagChips from '@/components/projects/tag-chips';

export default function TilCard({ til }: { til: TIL }) {
  const dateStr = new Date(til.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link
      href={`/tils/${til.slug}`}
      className="group border-border block border-b py-4 transition-all duration-200 first:pt-0 last:border-b-0 hover:pl-2"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-foreground group-hover:text-primary text-base font-medium tracking-tight transition-colors">
          {til.title}
        </span>
        <time
          dateTime={til.date}
          className="text-muted-foreground/60 shrink-0 font-mono text-2xs tabular-nums"
        >
          {dateStr}
        </time>
      </div>

      {til.description && (
        <p className="text-muted-foreground mt-1 line-clamp-1 text-sm leading-relaxed">
          {til.description}
        </p>
      )}

      {til.tags && til.tags.length > 0 && (
        <TagChips tags={til.tags} max={2} className="mt-2 flex flex-wrap gap-1.5" />
      )}
    </Link>
  );
}
