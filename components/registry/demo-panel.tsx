'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Framed demo shared by all component docs: preview on top, source stacked below, collapsed to a teaser with a View Code button. Demo controls belong inside the preview markup, not here.
export default function DemoPanel({
  children,
  code,
  caption,
}: {
  children: ReactNode;
  code: ReactNode;
  caption?: ReactNode;
}) {
  const [codeExpanded, setCodeExpanded] = useState(false);

  return (
    <div>
      <div className="border-border overflow-hidden rounded-xl border">
        {children}
        <div className="border-border relative border-t">
          {/* Height is a layout property, but a disclosure needs the bridge; interpolate-size in globals.css is what lets it reach auto. */}
          <div
            className={cn(
              'min-h-32 overflow-hidden transition-[height] duration-250 ease-out motion-reduce:transition-none [&_.not-typeset]:my-0 [&_.not-typeset]:rounded-none [&_.not-typeset]:border-0',
              codeExpanded && '[&_pre]:max-h-[24rem] [&_pre]:overflow-auto'
            )}
            style={{ height: codeExpanded ? 'auto' : '8rem' }}
          >
            {code}
          </div>
          {/* Scrim stays mounted so it can fade on the same beat as the height. */}
          <div
            className={cn(
              'to-background/90 via-background/40 pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent transition-opacity duration-150 ease-out motion-reduce:transition-none',
              codeExpanded ? 'opacity-0' : 'opacity-100'
            )}
          />
          {codeExpanded ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
              <button
                className="border-border bg-background text-foreground text-meta pointer-events-auto cursor-pointer rounded-lg border px-3 py-1.5 shadow-sm transition-[background-color,border-color,color,box-shadow,scale] duration-160 ease-out hover:shadow active:scale-[0.97]"
                onClick={() => setCodeExpanded(false)}
                type="button"
              >
                Collapse
              </button>
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <button
                className="border-border bg-background text-foreground text-meta pointer-events-auto cursor-pointer rounded-lg border px-3 py-1.5 shadow-sm transition-[background-color,border-color,color,box-shadow,scale] duration-160 ease-out hover:shadow active:scale-[0.97]"
                onClick={() => setCodeExpanded(true)}
                type="button"
              >
                View Code
              </button>
            </div>
          )}
        </div>
      </div>
      {caption ? (
        <p className="text-muted-foreground text-subtitle mt-4">{caption}</p>
      ) : null}
    </div>
  );
}
