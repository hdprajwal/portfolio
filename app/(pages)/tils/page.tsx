import { listTILs } from '@/lib/tils';
import TilCard from '@/components/tils/til-card';
import type { Metadata } from 'next';

export default async function TilsPage() {
  const tils = await listTILs();
  return (
    <div className="flex-1">
      <div className="px-4 py-14">
        <h1 className="text-xl font-medium tracking-tight text-balance sm:text-2xl">
          TILs
        </h1>
        <p className="text-muted-foreground pt-2 text-sm">
          Today I Learned - quick notes and learnings.
        </p>
      </div>

      <div className="px-4">
        {tils.map((til) => (
          <TilCard key={til.slug} til={til} />
        ))}

        {tils.length === 0 && (
          <p className="text-muted-foreground">No TILs yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'TILs',
  description:
    'Today I Learned - short notes on things discovered along the way.',
};
