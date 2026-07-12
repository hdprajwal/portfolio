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
          <div
            className={cn(
              '[&_.not-typeset]:my-0 [&_.not-typeset]:rounded-none [&_.not-typeset]:border-0',
              codeExpanded
                ? '[&_pre]:max-h-[24rem] [&_pre]:overflow-auto'
                : 'max-h-32 overflow-hidden'
            )}
          >
            {code}
          </div>
          {codeExpanded ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
              <button
                className="border-border bg-background text-foreground text-label-14 pointer-events-auto cursor-pointer rounded-lg border px-3 py-1.5 shadow-sm transition-colors hover:shadow"
                onClick={() => setCodeExpanded(false)}
                type="button"
              >
                Collapse
              </button>
            </div>
          ) : (
            <div className="to-background/90 via-background/40 pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent">
              <button
                className="border-border bg-background text-foreground text-label-14 pointer-events-auto cursor-pointer rounded-lg border px-3 py-1.5 shadow-sm transition-colors hover:shadow"
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
        <p className="text-muted-foreground text-copy-16 mt-4">{caption}</p>
      ) : null}
    </div>
  );
}
