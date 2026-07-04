import { describe, expect, it } from 'vitest';
import { extractToc } from '@/lib/toc';

describe('extractToc', () => {
  it('extracts h2 and h3 headings with ids and levels', () => {
    const markdown = `## First Section

Some intro text.

### A Subsection

More text.

## Second Section

Final text.`;

    const items = extractToc(markdown);

    expect(items).toEqual([
      {
        id: 'first-section',
        text: 'First Section',
        level: 2,
        preview: 'Some intro text.',
      },
      {
        id: 'a-subsection',
        text: 'A Subsection',
        level: 3,
        preview: 'More text.',
      },
      {
        id: 'second-section',
        text: 'Second Section',
        level: 2,
        preview: 'Final text.',
      },
    ]);
  });

  it('ignores headings inside fenced code blocks', () => {
    const markdown = `## Real Heading

\`\`\`bash
## Not a heading
### Also not a heading
\`\`\`

Body text.`;

    const items = extractToc(markdown);

    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ id: 'real-heading', text: 'Real Heading' });
  });

  it('strips inline markdown from heading text', () => {
    const markdown = `## \`GuardScribe\` **is** a _realtime_ [pipeline](https://example.com)`;

    const items = extractToc(markdown);

    expect(items[0]?.text).toBe('GuardScribe is a realtime pipeline');
    expect(items[0]?.id).toBe('guardscribe-is-a-realtime-pipeline');
  });

  it('extracts the first paragraph line as preview, collapsing whitespace and truncating to 160 chars', () => {
    const longLine = 'word '.repeat(50).trim();
    const markdown = `## Heading

${longLine}

Second paragraph, ignored.`;

    const items = extractToc(markdown);

    expect(items[0]?.preview).toHaveLength(160);
    expect(items[0]?.preview).toBe(longLine.slice(0, 160));
  });

  it('sets preview to null when there is no following paragraph text', () => {
    const markdown = `## Heading

### Next Heading

Some text.`;

    const items = extractToc(markdown);

    expect(items[0]?.preview).toBeNull();
  });

  it('returns an empty array for an empty document', () => {
    expect(extractToc('')).toEqual([]);
  });

  it('returns an empty array when there are no headings', () => {
    expect(extractToc('Just a paragraph with no headings at all.')).toEqual([]);
  });

  it('skips blank lines before finding the preview', () => {
    const markdown = `## Heading




Actual preview line.`;

    const items = extractToc(markdown);

    expect(items[0]?.preview).toBe('Actual preview line.');
  });

  it('strips list markers and inline markdown from the preview line', () => {
    const markdown = `## Heading

* **Silence skipping (VAD).** More text`;

    const items = extractToc(markdown);

    expect(items[0]?.preview).toBe('Silence skipping (VAD). More text');
  });

  it('skips table lines entirely when looking for a preview', () => {
    const markdown = `## Heading

| Col A | Col B |
| --- | --- |
| 1 | 2 |

Prose after the table.`;

    const items = extractToc(markdown);

    expect(items[0]?.preview).toBe('Prose after the table.');
  });

  it('sets preview to null when only a table follows the heading', () => {
    const markdown = `## Heading

| Col A | Col B |
| --- | --- |
| 1 | 2 |

## Next Heading

Some text.`;

    const items = extractToc(markdown);

    expect(items[0]?.preview).toBeNull();
  });

  it('keeps a trailing unspaced hash as part of the heading text', () => {
    const markdown = `## Learning C#

Body text.`;

    const items = extractToc(markdown);

    expect(items[0]?.text).toBe('Learning C#');
  });

  it('still strips a spaced closing hash sequence from the heading text', () => {
    const markdown = `## Closed heading ##

Body text.`;

    const items = extractToc(markdown);

    expect(items[0]?.text).toBe('Closed heading');
  });

  it('ignores headings inside tilde-fenced code blocks', () => {
    const markdown = `## Real Heading

~~~bash
## Not a heading
### Also not a heading
~~~

Body text.`;

    const items = extractToc(markdown);

    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ id: 'real-heading', text: 'Real Heading' });
  });

  it('documents that duplicate heading text produces duplicate ids (known limitation)', () => {
    const markdown = `## Setup

Some text.

## Setup

Other text.`;

    const items = extractToc(markdown);

    expect(items).toHaveLength(2);
    expect(items[0]?.id).toBe('setup');
    expect(items[1]?.id).toBe('setup');
    expect(items[0]?.id).toBe(items[1]?.id);
  });
});
