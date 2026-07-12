'use client';

import { useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type PreProps = HTMLAttributes<HTMLPreElement> & {
  children: ReactNode;
  // Set from fence meta title="..." by the shiki transformer in custom-mdx.tsx; shows a header bar with the file name when present.
  'data-title'?: string;
  // Set from fence meta showLineNumbers; turns on the CSS counter gutter.
  'data-line-numbers'?: string | boolean;
};

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

  const fileName =
    typeof rest['data-title'] === 'string' ? rest['data-title'] : undefined;
  const lineNumbers =
    rest['data-line-numbers'] === true ||
    rest['data-line-numbers'] === 'true' ||
    rest['data-line-numbers'] === '';

  const copyButton = (overlay: boolean) => (
    <button
      type="button"
      aria-label={copied ? 'Copied' : 'Copy code'}
      onClick={handleCopy}
      className={cn(
        // Hidden until the code block is hovered; stays reachable via keyboard focus and always visible on touch devices, which have no hover.
        'text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center rounded-md p-1.5 opacity-0 transition-[color,opacity] group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 focus-visible:outline-none [@media(hover:none)]:opacity-100',
        overlay && 'border-border bg-background/70 border backdrop-blur-sm'
      )}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  );

  return (
    <div
      className={cn(
        'not-typeset group border-border my-7 max-w-full overflow-hidden rounded-lg border',
        lineNumbers && 'code-line-numbers'
      )}
    >
      {fileName ? (
        <div className="border-border bg-muted/40 flex items-center justify-between border-b py-0.5 pr-2 pl-4">
          <span className="text-muted-foreground font-mono text-3xs tracking-wider select-none">
            {fileName}
          </span>
          {copyButton(false)}
        </div>
      ) : null}
      <div className="relative">
        {!fileName ? (
          <div className="absolute top-2 right-2 z-10">{copyButton(true)}</div>
        ) : null}
        <pre ref={preRef} className={`m-0 ${className ?? ''}`} {...rest}>
          {children}
        </pre>
      </div>
    </div>
  );
}
