import { describe, expect, it } from 'vitest';
import {
  postToMarkdown,
  projectToMarkdown,
  tilToMarkdown,
} from '@/lib/markdown';

describe('postToMarkdown', () => {
  it('renders title, metadata line, and body', () => {
    const md = postToMarkdown({
      slug: 'p',
      title: 'Hello',
      date: '2026-01-05',
      summary: 'A summary',
      tags: ['ai', 'next'],
      content: 'Body paragraph.',
    });
    expect(md).toContain('# Hello');
    expect(md).toContain('Published: 2026-01-05');
    expect(md).toContain('Tags: ai, next');
    expect(md).toContain('A summary');
    expect(md.trimEnd().endsWith('Body paragraph.')).toBe(true);
  });

  it('normalizes Date-object dates to ISO', () => {
    const md = postToMarkdown({
      slug: 'p',
      title: 'Hello',
      date: new Date('2026-05-04') as unknown as string,
      tags: [],
      content: 'Body.',
    });
    expect(md).toContain('Published: 2026-05-04');
  });
});

describe('projectToMarkdown', () => {
  it('includes tagline, links, and body', () => {
    const md = projectToMarkdown({
      slug: 'x',
      name: 'X',
      tagline: 'Does X',
      description: 'Longer text',
      tags: ['Go'],
      codeHref: 'https://github.com/example/x',
      content: 'How it works.',
    });
    expect(md).toContain('# X');
    expect(md).toContain('Does X');
    expect(md).toContain('Code: https://github.com/example/x');
    expect(md).toContain('How it works.');
  });

  it('omits absent links', () => {
    const md = projectToMarkdown({
      slug: 'x',
      name: 'X',
      tagline: '',
      description: '',
      tags: [],
    });
    expect(md).not.toContain('Code:');
    expect(md).not.toContain('Live:');
  });
});

describe('tilToMarkdown', () => {
  it('renders a TIL document', () => {
    const md = tilToMarkdown({
      slug: 't',
      title: 'T',
      date: '2026-02-01',
      description: 'Learned',
      tags: [],
      content: 'Details.',
    });
    expect(md).toContain('# T');
    expect(md).toContain('Details.');
  });
});
