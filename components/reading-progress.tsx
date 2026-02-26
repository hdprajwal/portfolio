'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress({
  targetSelector = 'article',
}: {
  targetSelector?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) return;

    let cachedTop = target.offsetTop;
    let cachedTotal = target.scrollHeight - window.innerHeight;

    const recache = () => {
      cachedTop = target.offsetTop;
      cachedTotal = target.scrollHeight - window.innerHeight;
      onScroll();
    };

    const onScroll = () => {
      const scrolled = Math.min(
        Math.max(window.scrollY - cachedTop, 0),
        cachedTotal
      );
      setProgress(cachedTotal > 0 ? (scrolled / cachedTotal) * 100 : 0);
    };

    recache();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recache, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recache);
    };
  }, [targetSelector]);

  return (
    <div aria-hidden className="fixed top-0 right-0 left-0 z-[100]">
      <div className="h-[2px] w-full bg-transparent" />
      <div
        className="bg-ring absolute top-0 left-0 h-[2px] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
