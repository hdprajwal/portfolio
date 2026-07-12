import { describe, expect, it } from 'vitest';
import {
  resolveTocMinimapIndexFromPointerPos,
  resolveTocMinimapNaturalSizeStyle,
  resolveTocMinimapTopPercent,
} from './toc-minimap';

describe('resolveTocMinimapTopPercent', () => {
  it('returns 0 for a single item', () => {
    expect(resolveTocMinimapTopPercent(0, 1)).toBe(0);
  });

  it('spreads items evenly from 0 to 100', () => {
    expect(resolveTocMinimapTopPercent(0, 3)).toBe(0);
    expect(resolveTocMinimapTopPercent(1, 3)).toBe(50);
    expect(resolveTocMinimapTopPercent(2, 3)).toBe(100);
  });

  it('clamps out-of-range indexes to the ends', () => {
    expect(resolveTocMinimapTopPercent(-1, 3)).toBe(0);
    expect(resolveTocMinimapTopPercent(9, 3)).toBe(100);
  });
});

describe('resolveTocMinimapIndexFromPointerPos', () => {
  const rail = { itemCount: 5, railStart: 100, railSize: 200 };

  it('returns null when there are no items or the rail has no size', () => {
    expect(
      resolveTocMinimapIndexFromPointerPos({ ...rail, itemCount: 0, pointerPos: 150 })
    ).toBeNull();
    expect(
      resolveTocMinimapIndexFromPointerPos({ ...rail, railSize: 0, pointerPos: 150 })
    ).toBeNull();
  });

  it('returns 0 for a single item regardless of position', () => {
    expect(
      resolveTocMinimapIndexFromPointerPos({ ...rail, itemCount: 1, pointerPos: 9999 })
    ).toBe(0);
  });

  it('maps the rail ends to the first and last index', () => {
    expect(resolveTocMinimapIndexFromPointerPos({ ...rail, pointerPos: 100 })).toBe(0);
    expect(resolveTocMinimapIndexFromPointerPos({ ...rail, pointerPos: 300 })).toBe(4);
  });

  it('rounds to the nearest item between the ends', () => {
    expect(resolveTocMinimapIndexFromPointerPos({ ...rail, pointerPos: 150 })).toBe(1);
    expect(resolveTocMinimapIndexFromPointerPos({ ...rail, pointerPos: 200 })).toBe(2);
  });

  it('clamps pointer positions outside the rail', () => {
    expect(resolveTocMinimapIndexFromPointerPos({ ...rail, pointerPos: -50 })).toBe(0);
    expect(resolveTocMinimapIndexFromPointerPos({ ...rail, pointerPos: 999 })).toBe(4);
  });
});

describe('resolveTocMinimapNaturalSizeStyle', () => {
  it('grows with item count and keeps the viewport cap', () => {
    expect(resolveTocMinimapNaturalSizeStyle(11, 8, 'calc(100vh - 18rem)')).toBe(
      'min(80px, calc(100vh - 18rem))'
    );
  });

  it('never collapses below 1px for a single item', () => {
    expect(resolveTocMinimapNaturalSizeStyle(1, 8, '10rem')).toBe('min(1px, 10rem)');
  });
});
