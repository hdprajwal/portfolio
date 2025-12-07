'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Additional classes applied to the wrapper */
  className?: string;
  /** Delay in ms before animating in once visible */
  delay?: number;
};

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay) {
              const id = setTimeout(() => setVisible(true), delay);
              // Clean timeout if unmounted early
              return () => clearTimeout(id);
            }
            setVisible(true);
          }
        });
      },
      { rootMargin: '0px 0px 100px 0px', threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

