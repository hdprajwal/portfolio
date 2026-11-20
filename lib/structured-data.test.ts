import { describe, expect, it } from 'vitest';
import { buildSiteGraph } from '@/lib/structured-data';

describe('buildSiteGraph', () => {
  const graph = buildSiteGraph('https://example.com')['@graph'];
  const person = graph.find((node) => node['@type'] === 'Person') as Record<
    string,
    unknown
  >;

  it('gives the Person a description, address, and contact point', () => {
    expect(person.description).toMatch(/AI engineer/);
    expect(person.address).toMatchObject({
      '@type': 'PostalAddress',
      addressRegion: 'CA',
      addressCountry: 'US',
    });
    expect(person.contactPoint).toMatchObject({
      '@type': 'ContactPoint',
      contactType: 'professional inquiries',
      email: expect.stringContaining('@'),
      url: expect.stringContaining('linkedin.com'),
    });
  });

  it('keeps ids anchored to the site URL', () => {
    expect(graph.map((node) => node['@id'])).toEqual([
      'https://example.com/#website',
      'https://example.com/#person',
    ]);
  });
});
