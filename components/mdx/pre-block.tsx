'use client';

import { useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';

type PreProps = HTMLAttributes<HTMLPreElement> & { children: ReactNode };

export default function Pre({ children, className, ...rest }: PreProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!preRef.current) return;
    const codeEl = preRef.current.querySelector('code');
    const text = (
      codeEl?.textContent ??
      preRef.current.textContent ??
      ''
    ).trimEnd();

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback
      const range = document.createRange();
      range.selectNodeContents(codeEl ?? preRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      document.execCommand('copy');
      sel?.removeAllRanges();
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="not-prose group relative max-w-full overflow-hidden rounded border">
      <div className="text-muted-foreground flex items-center justify-between border-b px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="bg-muted rounded px-1.5 py-0.5 text-[11px]">
            Code
          </span>
        </div>
        <button
          type="button"
          aria-label="Copy code"
          onClick={handleCopy}
          className="ring-border/50 inline-flex items-center gap-1 rounded-md px-2 py-1 opacity-70 ring-1 transition hover:opacity-100 focus:opacity-100 focus:outline-none"
        >
          {copied ? (
            <>
              <Check className="text-primary h-3.5 w-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre
        ref={preRef}
        className={`m-0 ${className ?? ''} rounded-t-none rounded-b leading-tight`}
        {...rest}
      >
        {children}
      </pre>
    </div>
  );
}
