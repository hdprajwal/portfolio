'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="bg-muted text-muted-foreground hover:text-foreground fixed right-8 bottom-4 z-50 flex size-10 cursor-pointer items-center justify-center rounded transition-[opacity,transform] duration-200"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
