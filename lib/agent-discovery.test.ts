import { createHash } from 'node:crypto';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  buildNotFoundMarkdown,
  buildRobotsTxt,
  buildSkillMarkdown,
  buildSkillsIndex,
  estimateTokens,
  HOME_LINK_HEADER,
  markdownPathFor,
  markdownResponse,
  resolveMarkdownTarget,
  wantsMarkdown,
} from '@/lib/agent-discovery';

describe('wantsMarkdown', () => {
  it('matches text/markdown with or without q', () => {
    expect(wantsMarkdown('text/markdown')).toBe(true);
    expect(wantsMarkdown('text/markdown;q=0.9')).toBe(true);
  });

  it('ignores browsers, missing headers, and q=0', () => {
    expect(wantsMarkdown(null)).toBe(false);
    expect(wantsMarkdown('text/html,application/xhtml+xml,*/*;q=0.8')).toBe(
      false
    );
    expect(wantsMarkdown('text/markdown;q=0')).toBe(false);
    expect(wantsMarkdown('*/*')).toBe(false);
  });

  it('follows q values when both html and markdown are listed', () => {
    expect(wantsMarkdown('text/markdown, text/html;q=0.8')).toBe(true);
    expect(wantsMarkdown('text/html, text/markdown;q=0.5')).toBe(false);
  });
});

describe('markdownPathFor', () => {
  it('maps pages that have a markdown version', () => {
    expect(markdownPathFor('/')).toBe('/md/home');
    expect(markdownPathFor('/resume/')).toBe('/md/resume');
    expect(markdownPathFor('/blog/r2-mailbox')).toBe('/md/blog/r2-mailbox');
    expect(markdownPathFor('/projects/emberd')).toBe('/md/projects/emberd');
    expect(markdownPathFor('/tils/a-til')).toBe('/md/tils/a-til');
  });

  it('returns null for everything else', () => {
    expect(markdownPathFor('/blog')).toBeNull();
    expect(markdownPathFor('/colophon')).toBeNull();
    expect(markdownPathFor('/blog/a/b')).toBeNull();
    expect(markdownPathFor('/blog/post.md')).toBeNull();
  });
});

describe('robots.txt', () => {
  it('declares content signals and keeps the disallows', () => {
    const txt = buildRobotsTxt('https://example.com');
    expect(txt).toContain(
      'Content-Signal: search=yes, ai-input=yes, ai-train=no'
    );
    expect(txt).toContain('Disallow: /r/');
    expect(txt).toContain('Disallow: /hi/');
    expect(txt).toContain('Sitemap: https://example.com/sitemap.xml');
  });
});

describe('agent skills index', () => {
  it('lists the skill with a digest of its SKILL.md', async () => {
    const index = await buildSkillsIndex('https://example.com');
    const expected = createHash('sha256')
      .update(buildSkillMarkdown('https://example.com'))
      .digest('hex');
    expect(index.$schema).toMatch(/discovery\/0\.2\.0/);
    expect(index.skills[0]).toMatchObject({
      name: 'read-hdprajwal-dev',
      type: 'skill-md',
      url: 'https://example.com/.well-known/agent-skills/read-hdprajwal-dev/SKILL.md',
      digest: `sha256:${expected}`,
    });
  });
});

it('Link header uses a registered relation', () => {
  expect(HOME_LINK_HEADER).toContain('rel="describedby"');
});

it('estimates tokens at about four characters each', () => {
  expect(estimateTokens('abcdefgh')).toBe(2);
});

describe('resolveMarkdownTarget', () => {
  it('rewrites pages that have markdown', () => {
    expect(resolveMarkdownTarget('/')).toEqual({
      kind: 'markdown',
      path: '/md/home',
    });
  });

  it('passes HTML-only pages through', () => {
    for (const p of [
      '/blog',
      '/projects/',
      '/colophon',
      '/hi/acme',
      '/r/acme',
      '/opengraph-image',
      '/blog/x/opengraph-image-abc',
    ]) {
      expect(resolveMarkdownTarget(p)).toEqual({ kind: 'html' });
    }
  });

  it('reports unknown paths as not found', () => {
    expect(resolveMarkdownTarget('/__ora-404-probe')).toEqual({
      kind: 'not-found',
    });
    expect(resolveMarkdownTarget('/about')).toEqual({ kind: 'not-found' });
  });

  // Guards against adding a page under app/(pages) and having markdown requests to it 404.
  it('knows every page route in app/(pages)', () => {
    const root = path.join(process.cwd(), 'app/(pages)');
    const routes: string[] = [];
    const walk = (dir: string, segments: string[]) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isFile() && entry.name === 'page.tsx') {
          routes.push('/' + segments.join('/'));
        } else if (entry.isDirectory() && !entry.name.startsWith('_')) {
          const segment = entry.name.startsWith('[')
            ? 'sample-slug'
            : entry.name;
          walk(path.join(dir, entry.name), [...segments, segment]);
        }
      }
    };
    walk(root, []);
    expect(routes.length).toBeGreaterThan(5);
    for (const route of routes) {
      expect(resolveMarkdownTarget(route).kind, route).not.toBe('not-found');
    }
  });
});

describe('markdown 404', () => {
  it('explains the error and links the site index', () => {
    const md = buildNotFoundMarkdown('/nope`x', 'https://example.com');
    expect(md.startsWith('# Page not found')).toBe(true);
    expect(md).toContain('`/nopex`');
    expect(md).toContain('https://example.com/llms.txt');
    expect(md).toContain('https://example.com/sitemap.xml');
  });

  it('sends status, markdown type, and Vary: Accept', async () => {
    const res = markdownResponse('# Hi', 404);
    expect(res.status).toBe(404);
    expect(res.headers.get('content-type')).toBe(
      'text/markdown; charset=utf-8'
    );
    expect(res.headers.get('vary')).toBe('Accept');
    expect(res.headers.get('x-markdown-tokens')).toBe('1');
    expect(await res.text()).toBe('# Hi');
  });
});
