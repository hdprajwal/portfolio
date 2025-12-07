'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

export default function SidebarActions({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const x = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const itemBase =
    'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]';

  const chipClass = "flex items-center justify-center w-9 h-9 rounded-full bg-[var(--chip)] text-[var(--chip-fg)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] transition-colors ring-1 ring-inset ring-[var(--border)]";

  return (
    <div className="flex flex-col gap-2">
      <a
        className={chipClass}
        href={x}
        target="_blank"
        rel="noreferrer noopener"
        title="Share on X"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        className={chipClass}
        href={li}
        target="_blank"
        rel="noreferrer noopener"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button
        className={chipClass}
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        aria-label="Copy link"
        title={copied ? 'Copied!' : 'Copy link'}
      >
        {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}

