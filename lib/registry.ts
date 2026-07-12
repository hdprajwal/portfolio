import { tocMinimapMeta } from '@/app/(pages)/components/(docs)/toc-minimap/meta';

export type RegistryComponentMeta = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  // Link to the component source on GitHub, shown on the card when set.
  codeHref?: string;
  // Card screenshot; the typography banner renders when missing.
  image?: string;
  featured?: boolean;
  date?: string;
};

export { baseUrl } from '@/lib/site';

// Each component doc page under app/(pages)/components/(docs)/<slug>/ owns its meta; register it here to list it on the cards, landing page, and sitemap.
const REGISTRY_COMPONENTS: RegistryComponentMeta[] = [tocMinimapMeta].sort(
  (a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.date && b.date)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  }
);

export async function listRegistryComponents(): Promise<
  RegistryComponentMeta[]
> {
  return REGISTRY_COMPONENTS;
}
