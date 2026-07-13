'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';
import type { Bookmark, Category } from '@/content/bookmarks';
import { domainOf, groupByCategory } from '@/lib/bookmarks';
import { slugify } from '@/lib/slugify';

type Filter = 'All' | Category;

function BookmarkRow({
  bookmark,
  transitionName,
}: {
  bookmark: Bookmark;
  transitionName: string;
}) {
  return (
    <li style={{ viewTransitionName: transitionName }}>
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group hover:bg-muted -mx-3 block rounded-md px-3 py-1 transition-colors duration-150"
      >
        <span className="flex items-baseline gap-3">
          <span className="text-foreground text-copy-16 group-hover:underline">
            {bookmark.title}
          </span>
          <span className="text-muted-foreground text-label-14-mono">
            {domainOf(bookmark.url)}
          </span>
        </span>
        {bookmark.note ? (
          <p className="text-muted-foreground text-copy-14 mt-1">
            {bookmark.note}
          </p>
        ) : null}
      </a>
    </li>
  );
}

export default function BookmarksList({
  bookmarks,
}: {
  bookmarks: Bookmark[];
}) {
  const [active, setActive] = useState<Filter>('All');
  const groups = groupByCategory(bookmarks);
  const filters: Filter[] = ['All', ...groups.map((g) => g.category)];
  const visibleGroups =
    active === 'All' ? groups : groups.filter((g) => g.category === active);

  const applyFilter = (filter: Filter) => {
    if (filter === active) return;
    if (!document.startViewTransition) {
      setActive(filter);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => setActive(filter));
    });
  };

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        style={{ viewTransitionName: 'bm-filters' }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => applyFilter(filter)}
            aria-pressed={active === filter}
            className={`text-label-16 px-3 py-1 transition-colors ${
              active === filter
                ? 'border-foreground border-b'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-10">
        {visibleGroups.map((group) => (
          <section
            key={group.category}
            style={{ viewTransitionName: `bm-cat-${slugify(group.category)}` }}
          >
            <h2 className="text-muted-foreground text-label-14-mono uppercase">
              {group.category}
            </h2>
            <ul className="mt-2">
              {group.bookmarks.map((bookmark) => (
                <BookmarkRow
                  key={`${group.category}-${bookmark.url}`}
                  bookmark={bookmark}
                  transitionName={`bm-${slugify(`${group.category}-${bookmark.url}`)}`}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
