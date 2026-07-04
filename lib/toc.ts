import { slugify } from '@/lib/slugify';

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
  preview: string | null;
};

const HEADING_RE = /^(#{2,3})\s+(.+?)(?:\s+#+)?\s*$/;
const FENCE_RE = /^(```|~~~)/;
const TABLE_LINE_RE = /^\s*\|/;
const LIST_OR_QUOTE_MARKER_RE = /^\s*(?:[-*+]|\d+[.)])\s+|^\s*>\s?/;
const PREVIEW_MAX_LENGTH = 160;

// Strips inline markdown emphasis so heading text and anchors stay plain.
function stripInlineMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/`([^`]*)`/g, '$1')
    .trim();
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split('\n');
  const items: TocItem[] = [];
  let inFence = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? '';

    if (FENCE_RE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = HEADING_RE.exec(line);
    if (!match) continue;

    const level = match[1]?.length === 2 ? 2 : 3;
    const text = stripInlineMarkdown(match[2] ?? '');
    if (!text) continue;

    items.push({
      id: slugify(text),
      text,
      level,
      preview: findPreview(lines, index + 1),
    });
  }

  return items;
}

// Scans forward from just after a heading for the first paragraph line, stopping at the next heading and skipping over fenced code blocks.
function findPreview(lines: string[], startIndex: number): string | null {
  let inFence = false;

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index] ?? '';

    if (FENCE_RE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (HEADING_RE.test(line)) break;
    if (TABLE_LINE_RE.test(line)) continue;

    const withoutMarker = line.replace(LIST_OR_QUOTE_MARKER_RE, '');
    const collapsed = collapseWhitespace(stripInlineMarkdown(withoutMarker));
    if (collapsed.length === 0) continue;

    return collapsed.slice(0, PREVIEW_MAX_LENGTH);
  }

  return null;
}
