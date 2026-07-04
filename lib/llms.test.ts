import { describe, expect, it } from 'vitest';
import { buildLlmsIndex, buildLlmsFull } from '@/lib/llms';

const input = {
  posts: [
    {
      slug: 'post-a',
      title: 'Post A',
      date: '2026-01-01',
      summary: 'About A',
      tags: [],
      content: 'Post body',
    },
  ],
  projects: [
    {
      slug: 'proj',
      name: 'Proj',
      tagline: 'Does proj things',
      description: 'Desc',
      tags: [],
      content: 'Project body',
    },
  ],
  tils: [
    {
      slug: 'til-a',
      title: 'TIL A',
      date: '2026-02-01',
      description: 'Learned A',
      tags: [],
    },
  ],
};

describe('buildLlmsIndex', () => {
  it('starts with the site header and lists every item with absolute links', () => {
    const txt = buildLlmsIndex(input, 'https://hdprajwal.dev');
    expect(txt.startsWith('# Prajwal HD')).toBe(true);
    expect(txt).toContain('## Projects');
    expect(txt).toContain(
      '[Proj](https://hdprajwal.dev/projects/proj.md): Does proj things'
    );
    expect(txt).toContain('[Post A](https://hdprajwal.dev/blog/post-a.md)');
    expect(txt).toContain('[TIL A](https://hdprajwal.dev/tils/til-a.md)');
    expect(txt).toContain('https://hdprajwal.dev/resume');
  });
});

describe('buildLlmsFull', () => {
  it('contains resume and full bodies', () => {
    const txt = buildLlmsFull(input, 'https://hdprajwal.dev');
    expect(txt).toContain('## Experience');
    expect(txt).toContain('Post body');
    expect(txt).toContain('Project body');
  });
});
