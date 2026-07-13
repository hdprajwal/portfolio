import type { Metadata } from 'next';
import { bookmarks } from '@/content/bookmarks';
import BookmarksList from '@/components/bookmarks/bookmarks-list';

export default function BookmarksPage() {
  return (
    <div className="flex-1">
      <div className="px-4 pt-14 pb-8">
        <h1 className="text-foreground text-heading-24 sm:text-heading-32">
          Bookmarks
        </h1>
        <p className="text-muted-foreground text-copy-16 mt-3 max-w-3xl">
          Links I keep coming back to. Tools, design resources, talks, and
          sites I like.
        </p>
      </div>

      <section className="px-4 pb-14">
        <BookmarksList bookmarks={bookmarks} />
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Bookmarks',
  description:
    'A collection of links I keep coming back to. Tools, design resources, talks, portfolios, and other sites worth sharing.',
  alternates: {
    canonical: '/bookmarks',
  },
};
