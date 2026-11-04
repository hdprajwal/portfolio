import { describe, expect, it } from 'vitest';
import { isHiddenDraft, stripMdxEsm } from '@/lib/content';

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

describe('stripMdxEsm', () => {
  it('removes single and multi-line imports and exports', () => {
    const source = [
      "import { A, B } from './diagrams';",
      'import {',
      '  C,',
      "} from '@/components/c';",
      'export const meta = { a: 1 };',
      '',
      'Intro paragraph.',
      '',
      '<A />',
    ].join('\n');
    expect(stripMdxEsm(source)).toBe('Intro paragraph.\n\n<A />');
  });

  it('leaves the word import inside prose alone', () => {
    const source = 'You can import files here.';
    expect(stripMdxEsm(source)).toBe(source);
  });
});
