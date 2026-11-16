import { describe, expect, it } from 'vitest';
import { ACCENTS, resolveAccent } from '@/lib/project-accent';

describe('resolveAccent', () => {
  it('uses the frontmatter accent when it is known', () => {
    expect(resolveAccent({ slug: 'emberd', accent: 'amber' })).toBe(
      ACCENTS.amber
    );
  });

  it('falls back to a stable pick for unknown or missing accents', () => {
    const a = resolveAccent({ slug: 'gitwise', accent: 'plaid' });
    expect(resolveAccent({ slug: 'gitwise' })).toBe(a);
    expect(Object.values(ACCENTS)).toContain(a);
  });

  it('ignores inherited object keys like constructor', () => {
    const fallback = resolveAccent({ slug: 'gitwise' });
    expect(resolveAccent({ slug: 'gitwise', accent: 'constructor' })).toBe(
      fallback
    );
    expect(resolveAccent({ slug: 'gitwise', accent: 'toString' })).toBe(
      fallback
    );
  });
});
