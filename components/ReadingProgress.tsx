'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress({ targetSelector = 'article' }: { targetSelector?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) return;

    const handle = () => {
      const rect = target.getBoundingClientRect();
      const total = target.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(window.scrollY - (target.offsetTop - 0), 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(pct);
    };

    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, [targetSelector]);

  return (
    <div aria-hidden className="fixed left-0 right-0 top-0 z-[100]">
      <div className="h-[2px] w-full bg-transparent" />
      <div
        className="absolute left-0 top-0 h-[2px] bg-[var(--ring)] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

