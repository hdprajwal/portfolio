'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer({ now }: { now: string }) {
  const [mounted, setMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setMounted(true);
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="container mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center">
        <p className="text-sm text-[var(--muted-fg)]">
          © {mounted ? currentYear : 2025} Prajwal HD
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link href="/colophon" className="underline">
            colophon
          </Link>
          <span className="text-[var(--muted-fg)]">
            Local time: {now || '--:--'}
          </span>
        </div>
      </div>
    </footer>
  );
}
