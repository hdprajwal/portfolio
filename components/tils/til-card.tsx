import Link from 'next/link';
import type { TIL } from '@/lib/tils';

export default function TilCard({ til }: { til: TIL }) {
  const dateStr = new Date(til.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <Link
      href={`/tils/${til.slug}`}
      className="group border-border hover:border-muted-foreground block border-b border-dotted py-3 transition-[padding-left,border-color] duration-200 ease-out hover:pl-2"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="group-hover:text-foreground text-[1.05rem] font-semibold transition-colors">
          {til.title}
        </h3>
        <time
          dateTime={til.date}
          className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums"
        >
          {dateStr}
        </time>
      </div>

      {til.description && (
        <p className="text-muted-foreground mt-1 line-clamp-2 text-[0.9rem] leading-relaxed">
          {til.description}
        </p>
      )}

      {til.tags && til.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {til.tags.map((tag) => (
            <span
              key={tag}
              className="text-muted-foreground bg-muted group-hover:text-foreground rounded-sm px-2 py-0.5 text-xs transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
