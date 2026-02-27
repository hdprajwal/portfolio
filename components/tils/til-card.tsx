import Link from 'next/link';
import type { TIL } from '@/lib/tils';

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
        <span className="group-hover:text-foreground text-sm font-medium tracking-tight transition-colors">
          {til.title}
        </span>
        <time
          dateTime={til.date}
          className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums opacity-70"
        >
          {dateStr}
        </time>
      </div>

      {til.description && (
        <p className="text-muted-foreground mt-1 line-clamp-1 text-xs leading-relaxed">
          {til.description}
        </p>
      )}

      {til.tags && til.tags.length > 0 && (
        <div className="mt-2 flex items-center gap-3">
          {til.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-muted-foreground font-mono text-xs">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
