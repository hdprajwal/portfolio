import { describe, expect, it } from 'vitest';
import { buildContentIndex } from '@/lib/content-index';

const post = {
  slug: 'my-post',
  title: 'My Post',
  date: '2026-01-01',
  summary: 'A post about things',
  tags: ['ai'],
};
const projectWithBody = {
  slug: 'emberd',
  name: 'emberd',
  tagline: 'MicroVM sandbox runtime',
  description: 'Long description',
  tags: ['Go'],
  content: 'Body text here',
};
const stubProject = {
  slug: 'stub',
  name: 'Stub',
  tagline: 'A stub',
  description: '',
  tags: [],
  content: '   ',
};
const til = {
  slug: 'a-til',
  title: 'A TIL',
  date: '2026-01-02',
  description: 'Learned a thing',
  tags: ['next'],
};

describe('buildContentIndex', () => {
  it('maps posts, projects, and tils with hrefs', () => {
    const index = buildContentIndex([post], [projectWithBody], [til]);
    expect(index).toHaveLength(3);
    expect(index.find((i) => i.type === 'blog')?.href).toBe('/blog/my-post');
    expect(index.find((i) => i.type === 'project')?.href).toBe(
      '/projects/emberd'
    );
    expect(index.find((i) => i.type === 'til')?.href).toBe('/tils/a-til');
  });

  it('links every project to its own page, with or without a writeup', () => {
    const index = buildContentIndex([], [stubProject], []);
    expect(index[0].href).toBe(`/projects/${stubProject.slug}`);
  });

  it('uses tagline as the project summary', () => {
    const index = buildContentIndex([], [projectWithBody], []);
    expect(index[0].summary).toBe('MicroVM sandbox runtime');
  });
});
