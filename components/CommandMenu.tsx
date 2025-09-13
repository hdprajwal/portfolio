'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

type Item = {
  id: string;
  label: string;
  hint?: string;
  onSelect?: () => void;
  href?: string;
};

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const items = useMemo<Item[]>(
    () => [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'about', label: 'About', href: '/about' },
      { id: 'projects', label: 'Projects', href: '/projects' },
      { id: 'blog', label: 'Blog', href: '/blog' },
      {
        id: 'toggle-theme',
        label: theme === 'dark' ? 'Switch to Light' : 'Switch to Dark',
        hint: 'Theme',
        onSelect: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      },
    ],
    [theme, setTheme]
  );

  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b px-3 py-2">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Esc
          </kbd>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-1">
          {filtered.map((i) => (
            <li key={i.id} className="">
              {i.href ? (
                <Link
                  href={i.href}
                  className="flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
                  onClick={() => setOpen(false)}
                >
                  <span>{i.label}</span>
                  {i.hint && (
                    <span className="text-xs text-muted-foreground">{i.hint}</span>
                  )}
                </Link>
              ) : (
                <button
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
                  onClick={() => {
                    setOpen(false);
                    i.onSelect?.();
                  }}
                >
                  <span>{i.label}</span>
                  {i.hint && (
                    <span className="text-xs text-muted-foreground">{i.hint}</span>
                  )}
                </button>
              )}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-2 py-4 text-center text-sm text-muted-foreground">
              No results
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

