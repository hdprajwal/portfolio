'use client';
import { useEffect } from 'react';

// Top-level page order used to derive slide direction between route changes.
const PAGE_ORDER: Record<string, number> = {
  '/': 0,
  '/about': 1,
  '/projects': 2,
  '/blog': 3,
  '/tils': 4,
};

function isModifiedClick(e: MouseEvent) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
}

// Renders nothing; only wires up listeners that stamp the direction of the upcoming navigation onto <html> before Next starts the view transition.
export default function NavDirection() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (isModifiedClick(e)) return;
      const target = e.target as Element | null;
      const anchor = target?.closest('a');
      if (!anchor) return;
      if (anchor.target === '_blank') return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const fromIndex = PAGE_ORDER[window.location.pathname];
      const toIndex = PAGE_ORDER[url.pathname];
      if (
        fromIndex === undefined ||
        toIndex === undefined ||
        fromIndex === toIndex
      ) {
        document.documentElement.dataset.pageNav = 'fade';
        return;
      }
      document.documentElement.dataset.pageNav =
        toIndex > fromIndex ? 'forward' : 'backward';
    };

    const onPopState = () => {
      document.documentElement.dataset.pageNav = 'fade';
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return null;
}
