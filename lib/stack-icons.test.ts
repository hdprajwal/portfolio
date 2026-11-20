import { describe, expect, it } from 'vitest';
import { buildStackSprite, stackIcons } from '@/components/icons/stack-icons';
import { stack } from '@/lib/stack';

describe('stack icon sprite', () => {
  const sprite = buildStackSprite();

  it('is a standalone SVG with one symbol per icon', () => {
    expect(sprite.startsWith('<svg xmlns="http://www.w3.org/2000/svg">')).toBe(
      true
    );
    expect(sprite.match(/<symbol /g)).toHaveLength(
      Object.keys(stackIcons).length
    );
  });

  it('has a symbol for every icon the stack list uses', () => {
    for (const item of stack.flatMap((c) => c.items)) {
      if (item.icon)
        expect(sprite).toContain(
          `<symbol id="${item.icon}" viewBox="${stackIcons[item.icon].viewBox}">`
        );
    }
  });
});
