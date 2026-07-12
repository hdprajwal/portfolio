import type { Metadata } from 'next';
import { listRegistryComponents } from '@/lib/registry';
import ComponentCard from '@/components/registry/component-card';

export default async function ComponentsPage() {
  const components = await listRegistryComponents();

  return (
    <div className="flex-1">
      <div className="px-4 pt-14 pb-8">
        <h1 className="text-foreground text-heading-24 sm:text-heading-32">
          Components
        </h1>
        <p className="text-muted-foreground text-copy-16 mt-3 max-w-3xl">
          UI components I built for this site and published to a shadcn
          registry. Each one has a live demo, docs, and a one line install.
        </p>
      </div>

      <div className="px-4 pb-16">
        {components.length === 0 ? (
          <p className="text-muted-foreground text-copy-16">
            No components yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {components.map((c) => (
              <ComponentCard key={c.slug} component={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Components',
  description:
    'UI components built for this site and published to a shadcn registry, each with a live demo, docs, and install instructions.',
  alternates: {
    canonical: '/components',
  },
};
