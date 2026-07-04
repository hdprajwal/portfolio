import { listTILs } from '@/lib/tils';
import TilCard from '@/components/tils/til-card';
import type { Metadata } from 'next';

export default async function TilsPage() {
  const tils = await listTILs();
  return (
    <div className="flex-1">
      <div className="px-4 pt-14 pb-8">
        <h1 className="text-foreground text-heading-24 sm:text-heading-32">
          TILs
        </h1>
        <p className="text-muted-foreground text-copy-16 mt-3 max-w-3xl">
          Today I Learned. Quick notes on tools, bugs, and small discoveries
          picked up while building.
        </p>
      </div>

      <div className="px-4 pb-16">
        {tils.length === 0 ? (
          <p className="text-muted-foreground text-copy-16">
            No TILs yet. Check back soon.
          </p>
        ) : (
          tils.map((til) => <TilCard key={til.slug} til={til} />)
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'TILs',
  description:
    'Today I Learned notes on tools, bugs, and implementation details picked up while building software and debugging systems.',
  alternates: {
    canonical: '/tils',
  },
};
