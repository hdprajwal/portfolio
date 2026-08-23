'use client';

import { useEffect, useRef } from 'react';

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      // Compositor-only: the bar is full width and scales from its left edge.
      if (barRef.current)
        barRef.current.style.transform = `scaleX(${pct / 100})`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div aria-hidden className="fixed top-0 right-0 left-0 z-[100]">
      <div
        ref={barRef}
        className="bg-ring h-[2px] w-full origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
