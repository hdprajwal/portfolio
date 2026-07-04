'use client';

import { useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';

type PreProps = HTMLAttributes<HTMLPreElement> & {
  children: ReactNode;
  'data-language'?: string;
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

  const language =
    typeof rest['data-language'] === 'string' ? rest['data-language'] : 'text';

  return (
    <div className="not-prose group border-border my-7 max-w-full overflow-hidden rounded-lg border">
      <div className="border-border bg-muted/40 flex items-center justify-between border-b px-4 py-1.5">
        <span className="text-muted-foreground font-mono text-3xs tracking-wider lowercase select-none">
          {language}
        </span>
        <button
          type="button"
          aria-label="Copy code"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-sm px-1 py-0.5 font-mono text-3xs transition-colors focus-visible:ring-1 focus-visible:outline-none"
        >
          {copied ? (
            <>
              <Check className="size-3" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre ref={preRef} className={`m-0 ${className ?? ''}`} {...rest}>
        {children}
      </pre>
    </div>
  );
}
