import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { frontmatterFor } from './new-content.mjs';

describe('frontmatterFor', () => {
  it('builds post frontmatter with draft flag', () => {
    const fm = frontmatterFor('post', 'My Post', '2026-07-03');
    expect(fm).toContain("title: 'My Post'");
    expect(fm).toContain("date: '2026-07-03'");
    expect(fm).toContain('draft: true');
    expect(fm.startsWith('---\n')).toBe(true);
  });

  it('builds project frontmatter with name and tagline fields', () => {
    const fm = frontmatterFor('project', 'Thing', '2026-07-03');
    expect(fm).toContain("name: 'Thing'");
    expect(fm).toContain('tagline:');
    expect(fm).toContain('draft: true');
  });

  it('throws on unknown type', () => {
    expect(() => frontmatterFor('nope', 'x', '2026-07-03')).toThrow();
  });

  it('escapes embedded single quotes so gray-matter parses the title back correctly', () => {
    const fm = frontmatterFor('post', "It's a Big Day", '2026-07-03');
    const parsed = matter(fm + 'body\n');
    expect(parsed.data.title).toBe("It's a Big Day");
  });

  it('escapes embedded single quotes in til titles', () => {
    const fm = frontmatterFor('til', "It's a Big Day", '2026-07-03');
    const parsed = matter(fm + 'body\n');
    expect(parsed.data.title).toBe("It's a Big Day");
  });

  it('escapes embedded single quotes in project names', () => {
    const fm = frontmatterFor('project', "It's a Big Day", '2026-07-03');
    const parsed = matter(fm + 'body\n');
    expect(parsed.data.name).toBe("It's a Big Day");
  });
});

describe('CLI', () => {
  const repoRoot = path.resolve(__dirname, '..');
  const scriptPath = path.join('scripts', 'new-content.mjs');
  const createdFile = path.join(
    repoRoot,
    'content/til/cli-test-title-12345.mdx'
  );

  it('creates a draft TIL file and refuses to overwrite it on a second run', () => {
    try {
      execFileSync(
        'node',
        [scriptPath, 'til', 'CLI Test Title 12345'],
        { cwd: repoRoot }
      );

      expect(fs.existsSync(createdFile)).toBe(true);
      const content = fs.readFileSync(createdFile, 'utf-8');
      expect(content).toContain('draft: true');

      expect(() =>
        execFileSync('node', [scriptPath, 'til', 'CLI Test Title 12345'], {
          cwd: repoRoot,
        })
      ).toThrow();
    } finally {
      if (fs.existsSync(createdFile)) {
        fs.unlinkSync(createdFile);
      }
    }
  });
});
