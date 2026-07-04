import { describe, expect, it } from 'vitest';
import { baseUrl } from '@/lib/site';

describe('baseUrl', () => {
  it('resolves to a http(s) URL', () => {
    expect(baseUrl).toMatch(/^https?:\/\//);
  });
});
