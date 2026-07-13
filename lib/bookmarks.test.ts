import { describe, expect, it } from 'vitest';
import { domainOf, groupByCategory } from '@/lib/bookmarks';
import type { Bookmark } from '@/content/bookmarks';

describe('domainOf', () => {
  it('extracts the hostname', () => {
    expect(domainOf('https://ray.so/')).toBe('ray.so');
  });

  it('strips a leading www.', () => {
    expect(domainOf('https://www.cta.gallery/')).toBe('cta.gallery');
  });

  it('ignores paths and query params', () => {
    expect(domainOf('https://ui.shadcn.com/docs?theme=dark')).toBe('ui.shadcn.com');
  });

  it('returns the input unchanged when it is not a valid URL', () => {
    expect(domainOf('not a url')).toBe('not a url');
  });
});

describe('groupByCategory', () => {
  const sample: Bookmark[] = [
    { title: 'svgl', url: 'https://svgl.app/', category: 'Design' },
    { title: 'OBS Studio', url: 'https://obsproject.com/', category: 'Tools' },
    { title: 'Lucide', url: 'https://lucide.dev/', category: 'Design' },
  ];

  it('groups bookmarks in canonical category order', () => {
    const groups = groupByCategory(sample);
    expect(groups.map((g) => g.category)).toEqual(['Tools', 'Design']);
    expect(groups[1].bookmarks.map((b) => b.title)).toEqual(['svgl', 'Lucide']);
  });

  it('skips categories with no bookmarks', () => {
    const groups = groupByCategory(sample);
    expect(groups.map((g) => g.category)).not.toContain('Talks');
  });

  it('returns an empty array for no bookmarks', () => {
    expect(groupByCategory([])).toEqual([]);
  });
});
