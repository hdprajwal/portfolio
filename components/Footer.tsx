'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState(2025);
  const [now, setNow] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    setCurrentYear(new Date().getFullYear());
    
    const fmt = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Indiana/Indianapolis',
    });
    const update = () => setNow(fmt.format(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="grid-row p-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          © {mounted ? currentYear : 2025} Prajwal HD
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link href="/colophon" className="underline hover:text-[var(--accent)] transition-colors">
            colophon
          </Link>
          <span className="text-muted-foreground">
            Local time: {mounted ? now : '--:--'}
          </span>
        </div>
      </div>
    </footer>
  );
}
