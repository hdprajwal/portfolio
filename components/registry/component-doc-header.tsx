import TagChips from '@/components/projects/tag-chips';
import { ViewTransition } from '@/components/view-transition';
import type { RegistryComponentMeta } from '@/lib/registry';

export default function ComponentDocHeader({
  meta,
}: {
  meta: RegistryComponentMeta;
}) {
  return (
    <header className="mt-10 md:mt-12">
      <ViewTransition name={`component-title-${meta.slug}`}>
        <h1 className="text-display text-balance">{meta.name}</h1>
      </ViewTransition>
      <p className="text-muted-foreground text-body mt-2">{meta.tagline}</p>
    </header>
  );
}
