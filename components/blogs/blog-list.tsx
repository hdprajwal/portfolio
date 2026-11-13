import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { WritingItem } from '@/lib/writing';
import { readingMinutes } from '@/lib/reading-time';
import { ViewTransition } from '@/components/view-transition';

function BlogRow({ item }: { item: WritingItem }) {
  const dateStr = new Date(item.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
  const readTime = readingMinutes(item.content);

  return (
    <div className="group hover:bg-accent/60 relative rounded-md px-3 transition-colors duration-150">
      <Link
        href={item.href}
        className="absolute inset-0"
        aria-label={item.title}
      />
      <div className="py-4">
        <span className="flex items-start gap-1.5">
          <ViewTransition name={`${item.kind}-title-${item.slug}`}>
            <span className="text-foreground-strong text-title text-pretty">
              {item.title}
            </span>
          </ViewTransition>
          <ArrowRight className="text-muted-foreground mt-[5px] size-3.5 shrink-0 -translate-x-1 opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0" />
        </span>
        <span className="text-muted-foreground text-meta mt-1 block">
          {item.kind === 'til' && 'TIL · '}
          <time dateTime={item.date} className="tabular-nums">
            {dateStr}
          </time>
          {' · '}
          {readTime} min read
        </span>
      </div>
    </div>
  );
}

export default function BlogList({ items }: { items: WritingItem[] }) {
  return (
    <div className="-mx-3 space-y-2">
      {items.map((item) => (
        <BlogRow key={`${item.kind}-${item.slug}`} item={item} />
      ))}
    </div>
  );
}
