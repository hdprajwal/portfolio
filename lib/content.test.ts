import { describe, expect, it } from 'vitest';
import { isHiddenDraft } from '@/lib/content';

describe('isHiddenDraft', () => {
  it('hides drafts in production', () => {
    expect(isHiddenDraft(true, 'production')).toBe(true);
  });

  it('shows drafts in development', () => {
    expect(isHiddenDraft(true, 'development')).toBe(false);
  });

  it('never hides published content', () => {
    expect(isHiddenDraft(false, 'production')).toBe(false);
    expect(isHiddenDraft(undefined, 'production')).toBe(false);
  });
});
