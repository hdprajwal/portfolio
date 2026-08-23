'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      // Stays mounted so the fade can run; inert keeps the hidden state out of the tab order and the accessibility tree.
      inert={!visible}
      className={cn(
        'bg-muted text-muted-foreground hover:text-foreground fixed right-8 bottom-12 z-50 flex size-10 cursor-pointer items-center justify-center rounded transition-[opacity,translate,scale] duration-200 ease-out motion-reduce:translate-y-0 motion-reduce:scale-100 md:bottom-4',
        visible
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-2 scale-95 opacity-0'
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
