'use client';

import { useEffect, useMemo, useState } from 'react';

type TocItem = { id: string; text: string; level: number };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function extractHeadingText(el: HTMLElement): string {
  // Clone and remove inline TOC anchors so the text doesn't include '#'
  const clone = el.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('a.toc-anchor').forEach((a) => a.remove());
  return (clone.textContent || '').trim();
}

export default function ArticleToc({
  targetSelector = 'article',
  headings = 'h2, h3',
}: {
  targetSelector?: string;
  headings?: string;
}) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(targetSelector);
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>(headings));
    const ids = new Set<string>();
    const collected: TocItem[] = [];
    nodes.forEach((el) => {
      if (!el.id) {
        const base = slugify(el.textContent || 'section');
        let candidate = base;
        let i = 1;
        while (ids.has(candidate)) candidate = `${base}-${i++}`;
        el.id = candidate;
        ids.add(candidate);
      } else {
        ids.add(el.id);
      }

      // Capture text excluding any existing inline anchor
      const text = extractHeadingText(el);
      collected.push({ id: el.id, text, level: el.tagName === 'H3' ? 3 : 2 });

      // Add an anchor link for convenience (hidden from a11y)
      if (!el.querySelector('a.toc-anchor')) {
        const a = document.createElement('a');
        a.href = `#${el.id}`;
        a.className = 'toc-anchor ml-2 text-sm text-muted-foreground opacity-0 group-hover:opacity-100';
        a.textContent = '#';
        a.setAttribute('aria-hidden', 'true');
        a.tabIndex = -1;
        el.classList.add('group');
        el.appendChild(a);
      }
    });

    setItems(collected);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [targetSelector, headings]);

  const grouped = useMemo(() => items, [items]);

  if (grouped.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className="w-full">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">On this page</div>
      <ul className="space-y-1">
        {grouped.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={`block truncate text-xs transition-colors hover:text-foreground ${
                active === it.id ? 'text-foreground' : 'text-muted-foreground'
              } ${it.level === 3 ? 'pl-3' : ''}`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
