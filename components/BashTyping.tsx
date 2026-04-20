'use client';
import { useEffect, useRef, useState } from 'react';

export default function BashTyping({
  onDone,
  prompt,
}: {
  onDone: () => void;
  prompt: string;
}) {
  const base = `$ ${prompt}`;
  const [out, setOut] = useState('');
  const [stopped, setStopped] = useState(false);
  const iRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      setOut(base);
      onDone();
      return;
    }
    const id = setInterval(() => {
      iRef.current += 1;
      setOut(base.slice(0, iRef.current));
      if (iRef.current >= base.length) {
        clearInterval(id);
        onDone();
      }
    }, 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'c') {
        setStopped(true);
        clearInterval(id);
        setOut((s) => (s.endsWith('^C') ? s : s + '^C'));
        onDone();
      }
    };
    window.addEventListener('keydown', onKey as unknown as EventListener);
    return () => {
      clearInterval(id);
      window.removeEventListener('keydown', onKey as unknown as EventListener);
    };
  }, []);

  const hasPrompt = out.length > 0;
  const dollarSign = hasPrompt ? out.slice(0, 1) : '$';
  const rest = hasPrompt ? out.slice(1) : '';

  return (
    <div className="text-muted-foreground font-mono text-sm">
      <span className="text-primary">{dollarSign}</span>
      {rest}
      {!stopped && (
        <span className="bg-primary ml-0.5 inline-block h-[13px] w-[7px] -translate-y-[1px] animate-pulse align-middle opacity-70" />
      )}
    </div>
  );
}
